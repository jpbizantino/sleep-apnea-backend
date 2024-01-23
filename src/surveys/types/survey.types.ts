export interface CombinedScoreResult {
  questionId: string;
  isValid: boolean;
}

export interface GroupedFieldResult {
  groupedFieldId: string;
  isValid: boolean;
}

export interface QuestionResult {
  questionId: string;
  score: number;
}

// For storing algortihm results
export interface SurveyResultSumary {
  columnName: string;
  columnValue: string;
}

export enum OperatorType {
  AND = 'AND',
  OR = 'OR',
}

export interface CalculatedField {
  calculatedFieldId: string;
  questions: string[];
  operator: OperatorType;
  scoreToAdd: number;
}
