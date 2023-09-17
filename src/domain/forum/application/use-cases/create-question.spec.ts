import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { Question } from '../../enterprise/entities/questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Use Case -> Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova Pergunta',
      content: 'Conteudo da pergunta',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question).toBeInstanceOf(Question)
    expect(result.value?.question?.title).toEqual('Nova Pergunta')
  })
})
