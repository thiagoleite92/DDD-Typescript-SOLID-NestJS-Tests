import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswersCommentsUseCaseRequest {
  page: number
  answerId: string
}

interface FetchAnswersCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswersCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswersCommentsUseCaseRequest): Promise<FetchAnswersCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswer(
      answerId,
      {
        page,
      },
    )

    return { answerComments }
  }
}
