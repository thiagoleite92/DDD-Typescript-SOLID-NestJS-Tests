import { Question } from '../../enterprise/entities/questions'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
}
