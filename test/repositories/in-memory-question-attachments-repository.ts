import { QuestionAttachmentsRepository } from "src/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "src/domain/forum/enterprise/entities/question-attachment";

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items
      .filter((item) => item.questionId.toString() === questionId)

    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachments = this.items
      .filter((item) => item.questionId.toString() !== questionId)

    this.items = questionAttachments
  }
}