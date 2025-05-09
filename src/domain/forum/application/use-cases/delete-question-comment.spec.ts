import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

let inMemoryQuestionsCommentRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(
      inMemoryQuestionsCommentRepository
    )
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionsCommentRepository.create(questionComment)

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString()
    })

    expect(inMemoryQuestionsCommentRepository.items).toHaveLength(0)
  })

    it('should not be able to delete a question comment from another user', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1')
    })

    await inMemoryQuestionsCommentRepository.create(questionComment)

    expect(async () => await sut.execute({
      authorId: new UniqueEntityID('author-2').toString(),
      questionCommentId: questionComment.id.toString()
    })).rejects.toBeInstanceOf(Error)
  })

})