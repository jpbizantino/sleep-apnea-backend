export interface ScoreResult {
  questionId: string;
  isValid: boolean;
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
