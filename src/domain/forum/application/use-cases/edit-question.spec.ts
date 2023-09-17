import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { Question } from '../../enterprise/entities/questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Use Case -> Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question by id', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('123') })
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      content: 'Conteúdo editado',
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    expect(inMemoryQuestionsRepository.items[0].content).toEqual(
      'Conteúdo editado',
    )
    // or

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: 'Conteúdo editado',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question).toBeInstanceOf(Question)
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-2',
      content: 'new content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
