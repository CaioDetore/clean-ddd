import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "src/core/either";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

interface CreateQuestionUseCaseRequest {
  authorId: string
  content: string
  title: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    authorId,
    content,
    title,
    attachmentsIds
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title
    })


    const questionAttachment = attachmentsIds.map(attachmentsId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsId),
        questionId: question.id
      })
    })


    question.attachments = questionAttachment

    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}
