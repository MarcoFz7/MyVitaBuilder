/**
 * 
 * Interface that represents the ai request section answer
 * This format is essencial since it will be used for both data presentation and manipulation
 *  
 */ 
export interface requestAnswerDTO {
    introductionText: string;
    energy: {
        value: string;
        unit: string;
    };
    protein: {
        value: string;
        unit: string;
    };
    totalFat: {
        value: string;
        unit: string;
    };
    satFat: {
        value: string;
        unit: string;
    };
    transFat: {
        value: string;
        unit: string;
    };
    totalCarbs: {
        value: string;
        unit: string;
    };
    sugars: {
        value: string;
        unit: string;
    };
    fiber: {
        value: string;
        unit: string;
    };
    sodium: {
        value: string;
        unit: string;
    };
    cholesterol: {
        value: string;
        unit: string;
    };
    vitamins: {
        value: string;
    };
    conclusionText: string;
}