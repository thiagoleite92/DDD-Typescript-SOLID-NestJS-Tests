import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/anwswer-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => console.log(answer),
}

it('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    content: 'nova resposta',
    instructorId: '1',
    questionId: '2',
  })

  expect(answer.content).toEqual('nova resposta')
})
