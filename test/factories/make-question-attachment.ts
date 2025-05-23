import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from 'src/domain/forum/enterprise/entities/question-attachment';

export function makeQuestionAttachment(
  override?: Partial<QuestionAttachmentProps>,
  id?: UniqueEntityID
) {
  const question = QuestionAttachment.create({
    questionId: new UniqueEntityID(),
    attachmentId: new UniqueEntityID(),
    ...override
  },
    id
  )

  return question
}