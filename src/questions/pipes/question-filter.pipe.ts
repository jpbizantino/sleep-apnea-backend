import { Injectable, PipeTransform } from '@nestjs/common';
import { QuestionFilterDto } from '../dto/question-filter.dto';

@Injectable()
export class QuestionFilterPipe
  implements PipeTransform<QuestionFilterDto, QuestionFilterDto>
{
  transform(value: QuestionFilterDto): QuestionFilterDto {
    return {
      ...value,
      question:
        (value.question && value.question.trim().toUpperCase()) || undefined,
      description:
        (value.description && value.description.trim().toUpperCase()) ||
        undefined,
    };
  }
}
