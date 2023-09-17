import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type DeleteAnswerUseCaseResponse = Either<string, object>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (answer?.authorId.toString() !== authorId) {
      return left('Not allowed')
    }

    if (!answer) {
      return left('Answer not found')
    }

    await this.answersRepository.delete(answer)

    return right({})
  }
}
