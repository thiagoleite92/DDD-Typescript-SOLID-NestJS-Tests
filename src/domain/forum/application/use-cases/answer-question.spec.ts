import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../../enterprise/entities/answers'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Use Case -> Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('create an answer', async () => {
    const result = await sut.execute({
      content: 'nova resposta',
      instructorId: '1',
      questionId: '2',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer).toBeInstanceOf(Answer)
    expect(result.value?.answer.content).toEqual('nova resposta')
  })
})
