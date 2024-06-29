export type TMealItem = {
  value: string;
  unit: string;
};

export type TMealGenerateInputDto = {
  personalInformation: {
    goal: string;
    allergiesOrIntolerances: string[];
  };
  mealInformation: {
    objectives: string[];
    dietary: string[];
    caloricIntake: string;
  };
  ingredients: string[];
};

export type TMealOutputDTO = {
  description: string;
  energy: TMealItem;
  protein: TMealItem;
  totalFat: TMealItem;
  satFat: TMealItem;
  transFat: TMealItem;
  totalCarbs: TMealItem;
  sugars: TMealItem;
  fiber: TMealItem;
  sodium: TMealItem;
  cholesterol: TMealItem;
  vitamins: {
    value: string;
  };
};
