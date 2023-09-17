import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Use Case -> Create QuestionComment Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to create a questioncomment', async () => {
    const question = makeQuestion()

    inMemoryQuestionsRepository.create(question)

    const { questionComment } = await sut.execute({
      authorId: 'author-1',
      content: 'Exemplo content',
      questionId: question.id.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items[0].id).toEqual(
      questionComment.id,
    )
  })
})
