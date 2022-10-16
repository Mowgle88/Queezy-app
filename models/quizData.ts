export type IQuizCategoriesData = {
  [key in ICategoryName]: IDifficultyData;
};

export type ICategoryName = 'art' | 'films' | 'history' | 'music' | 'science' | 'sport' | 'travel';

export interface IDifficultyData {
  easy: IQuizItem[],
  medium: IQuizItem[],
  hard: IQuizItem[]
}

export interface IQuizItem {
  category: string,
  correctAnswer: string,
  difficulty: string,
  id: string,
  incorrectAnswers: string[],
  question: string,
  tags: string[],
  type: string
}