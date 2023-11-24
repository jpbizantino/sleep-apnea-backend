export interface ScoreResult {
  questionId: string;
  isValid: boolean;
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
