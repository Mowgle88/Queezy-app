export type RadioButtonProps<Type> = {
  key: Type;
  value: string;
};

export type DifficultyData = "easy" | "medium" | "hard";

export const difficultyData: RadioButtonProps<DifficultyData>[] = [
  {
    key: "easy",
    value: "easy",
  },
  {
    key: "medium",
    value: "medium",
  },
  {
    key: "hard",
    value: "hard",
  },
];
