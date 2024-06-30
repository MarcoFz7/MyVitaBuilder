import { useFetch } from "@/app/hooks/useFetch";
import { TMealGenerateInputDto, TMealOutputDTO } from "@/app/types";

export const useFetchMealGenerate = () => {
  return useFetch<TMealGenerateInputDto, { meals: Array<TMealOutputDTO> }>({
    path: "meals/generate",
    method: "POST",
  });
};
