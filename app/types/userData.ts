export type UserDataUnit = {
    macro: string;
    Unit: number;
}

export type UserDataPercentagePoint = {
    x: string;
    y: number;
}
  
export type UserDataPercentage = {
    id: string;
    data: UserDataPercentagePoint[];
}