export type RadioButtonProps<Type> = {
  key: Type;
  value: string;
}

export type difficultyDataType = 'easy' | 'medium' | 'hard';

export const difficultyData: RadioButtonProps<difficultyDataType>[] = [
  {
    key: 'easy',
    value: 'easy',
  },
  {
    key: 'medium',
    value: 'medium',
  },
  {
    key: 'hard',
    value: 'hard',
  }
]
