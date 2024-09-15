import { useFetch } from "@/app/hooks/useFetch";
import { TMealGenerateInputDto, TMealRequestOutputDTO } from "@/app/types";

export const useFetchMealGenerate = () => {
  return useFetch<TMealGenerateInputDto, { meals: Array<TMealRequestOutputDTO> }>({
    path: "meals/generate",
    method: "POST",
  });
};
