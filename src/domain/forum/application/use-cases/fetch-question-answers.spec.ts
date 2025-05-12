import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { FetchQuestionsAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: FetchQuestionsAnswersUseCase

describe('Fetch Answers Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch recent answers', async () => {
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }))
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }))
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }))

    const result  = await sut.execute({
      page: 1,
      questionId: 'question-1'
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it.skip('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
      }))
    }

    const result  = await sut.execute({
      page: 2,
      questionId: 'question-1'
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
