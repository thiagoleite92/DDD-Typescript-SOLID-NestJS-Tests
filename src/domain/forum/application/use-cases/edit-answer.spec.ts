import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Use Case -> Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer by id', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('123') })
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      content: 'Conteúdo editado',
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
    expect(inMemoryAnswersRepository.items[0].content).toEqual(
      'Conteúdo editado',
    )
    // or

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo editado',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    })
    await inMemoryAnswersRepository.create(newAnswer)

    expect(
      async () =>
        await sut.execute({
          answerId: newAnswer.id.toString(),
          authorId: 'author-2',
          content: 'new content',
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})