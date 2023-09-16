import { Answer } from '../../enterprise/entities/answers'

export interface AnswersRepository {
  findById(answerId: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
