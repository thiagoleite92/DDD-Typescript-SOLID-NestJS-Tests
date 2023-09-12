import { Answer } from "@/domain/entities/answer";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "@/domain/repositories/anwswer-repository";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

it("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    content: "nova resposta",
    instructorId: "1",
    questionId: "2",
  });

  expect(answer.content).toEqual("nova resposta");
});
