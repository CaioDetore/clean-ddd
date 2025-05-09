import { QuestionCommentsRepository } from "src/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "src/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async findById(id: string): Promise<QuestionComment | null> {
    const questioncomment = this.items.find((item) => item.id.toString() === id)

    if (!questioncomment) {
      return null
    }

    return questioncomment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === questionComment.id)

    this.items.splice(itemIndex, 1)
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}