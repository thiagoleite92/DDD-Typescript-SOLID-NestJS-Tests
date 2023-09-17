import { Question } from '../../enterprise/entities/questions'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecenteQuestionsUseCaseRequest {
  page: number
}

interface FetchRecenteQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecenteQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecenteQuestionsUseCaseRequest): Promise<FetchRecenteQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.fetchManyRecent({ page })

    return { questions }
  }
}
