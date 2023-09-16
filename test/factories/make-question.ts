import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/questions'
import { Slug } from '@/domain/forum/enterprise/entities/value-object/slug'

export const makeQuestion = (override: Partial<QuestionProps> = {}) =>
  Question.create({
    authorId: new UniqueEntityID(),
    title: 'Example question',
    content: 'Example content',
    slug: Slug.create('example-question'),
    ...override,
  })
