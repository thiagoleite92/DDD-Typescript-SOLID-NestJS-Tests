import { Question } from '../../enterprise/entities/questions'

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  findById(questionId: string): Promise<Question | null>
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
