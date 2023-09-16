import { Answer } from '../../enterprise/entities/answers'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
}
