import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";

export interface QuestionAttachmentProps {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    const answer = new QuestionAttachment(props, id)

    return answer
  }
}