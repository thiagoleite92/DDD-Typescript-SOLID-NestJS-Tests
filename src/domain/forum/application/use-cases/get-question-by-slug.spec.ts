import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-object/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Use Case -> Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to find a question by slug ', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({ slug: 'example-question' })

    expect(question?.id).toBeTruthy()
    expect(question?.title).toEqual(newQuestion.title)
  })
})
