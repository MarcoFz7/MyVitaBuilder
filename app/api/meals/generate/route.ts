import { LoggerHelper } from "@/app/helpers";
import { openai } from "@/app/libs";
import { TMealGenerateInputDto } from "@/app/types";
import { z } from "zod";

const prepareInputMessageForAI = ({
  ingredients,
  language = "português",
  mealInformation,
  personalInformation,
}: TMealGenerateInputDto) => {
  const messages = [
    {
      role: "user",
      content: `Considera-te um especialista em Nutrição.`,
    },
    {
      role: "user",
      content: `O objetivo é gerares uma sugestão de refeição considerando o seguinte:`,
    },
    {
      role: "user",
      content: `Objetivo: ${personalInformation.goal}`,
    },
    {
      role: "user",
      content: `Alergias ou intolerâncias: ${personalInformation.allergiesOrIntolerances.join(
        ", "
      )}`,
    },
    {
      role: "user",
      content: `Objetivo da refeição: ${mealInformation.objectives.join(", ")}`,
    },
    {
      role: "user",
      content: `Tipo de refeição: ${mealInformation.dietary.join(", ")}`,
    },
    {
      role: "user",
      content: `Número de calorias da refeição: ${mealInformation.caloricIntake}`,
    },
    {
      role: "user",
      content: `Ingredientes: ${ingredients}`,
    },
    {
      role: "user",
      content: `A resposta deve seguir uma estrutura json no seguinte template: { meals: [{description: string; energy: { value: string; unit: string }; protein: { value: string; unit: string }; totalFat: { value: string; unit: string }; satFat: { value: string; unit: string }; transFat: { value: string; unit: string }; totalCarbs: { value: string; unit: string }; sugars: { value: string; unit: string }; fiber: { value: string; unit: string }; sodium: { value: string; unit: string }; cholesterol: { value: string; unit: string }; vitamins: { value: string; }; ] }`,
    },
    {
      role: "user",
      content: `A linguagem utilizada deve ser ${language}`,
    },
    {
      role: "user",
      content: `Gera-me apenas uma refeição em json considerando os critérios acima.`,
    },
  ] as any;

  return messages;
};

const inputSchema = z.object({
  personalInformation: z.object({
    goal: z.string(),
    allergiesOrIntolerances: z.array(z.string()),
  }),
  mealInformation: z.object({
    objectives: z.array(z.string()),
    dietary: z.array(z.string()),
    caloricIntake: z.string(),
  }),
  ingredients: z.string(),
  language: z.string().optional(),
});

const outputSchema = z.object({
  meals: z.array(
    z.object({
      description: z.string(),
      energy: z.object({ value: z.string(), unit: z.string() }),
      protein: z.object({ value: z.string(), unit: z.string() }),
      totalFat: z.object({ value: z.string(), unit: z.string() }),
      satFat: z.object({ value: z.string(), unit: z.string() }),
      transFat: z.object({ value: z.string(), unit: z.string() }),
      totalCarbs: z.object({ value: z.string(), unit: z.string() }),
      sugars: z.object({ value: z.string(), unit: z.string() }),
      fiber: z.object({ value: z.string(), unit: z.string() }),
      sodium: z.object({ value: z.string(), unit: z.string() }),
      cholesterol: z.object({ value: z.string(), unit: z.string() }),
      vitamins: z.object({ value: z.string() }),
    })
  ),
});

export async function POST(request: Request) {
  const input = await request.json();
  const logger = new LoggerHelper("POST meals/generate");

  logger.log("request", JSON.stringify(input));

  try {
    const messages = prepareInputMessageForAI(inputSchema.parse(input));

    const aiRes = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      // temperature: 1.5,
    });

    logger.log("response", JSON.stringify(aiRes));

    const response = aiRes.choices[0].message.content;

    const data = response ? JSON.parse(response) : undefined;

    outputSchema.parse(data);

    return new Response(JSON.stringify({ status: "success", data }));
  } catch (error) {
    return new Response(JSON.stringify({ status: "failed", error: error }));
  }
}
