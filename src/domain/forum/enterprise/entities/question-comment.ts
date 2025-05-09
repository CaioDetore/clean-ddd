import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Optional } from "src/core/types/optional"
import { Comment, CommentProps } from "./comment"

export interface QuestionCommentProps extends CommentProps {
  questionCommentId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionCommentId
  }
  
  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questioncomment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questioncomment
  }
}
