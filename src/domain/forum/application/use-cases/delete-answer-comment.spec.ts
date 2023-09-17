import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments.-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Use Case -> Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment by another author', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    expect(
      async () =>
        await sut.execute({
          authorId: 'author-2',
          answerCommentId: answerComment.id.toString(),
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
