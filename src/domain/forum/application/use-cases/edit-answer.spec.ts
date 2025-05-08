import { expect, it, describe, beforeEach } from 'vitest'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)
    
    await sut.execute({
      authorId: 'author-1',
      content: 'Conteudo teste',
      answerId: newAnswer.id.toString()
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteudo teste',
    })
  })

  it('should not be able to delete a answer from another author', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)
    
    expect(async () => await sut.execute({
      authorId: 'author-2',
      content: 'Conteudo teste',
      answerId: newAnswer.id.toString()
    })).rejects.toBeInstanceOf(Error)
  })
})
