import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments.-repository'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: CommentOnAnswerUseCase

describe('Use Case -> Create AnswerComment Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerCommentsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to create a answer on comment', async () => {
    const answer = makeAnswer()

    inMemoryAnswersRepository.create(answer)

    const { answerComment } = await sut.execute({
      authorId: 'author-1',
      content: 'Exemplo content',
      answerId: answer.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items[0].id).toEqual(
      answerComment.id,
    )
  })
})
