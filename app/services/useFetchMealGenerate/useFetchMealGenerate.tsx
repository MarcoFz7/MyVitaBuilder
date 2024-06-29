import { useFetch } from "@/app/hooks/useFetch";

export const useFetchMealGenerate = () => {
  return useFetch({
    path: "meals/generate",
  });
};
