import { z } from 'zod';

/**
 * Zod სქემა კონკრეტული კითხვისთვის:
 * პასუხი სავალდებულოა და უნდა იყოს ერთ-ერთი არსებული ვარიანტი.
 */
export function createAnswerSchema(question) {
  const validIds = question.options.map((o) => o.id);
  return z.object({
    answer: z
      .string({ required_error: 'აირჩიეთ პასუხი გასაგრძელებლად' })
      .min(1, 'აირჩიეთ პასუხი გასაგრძელებლად')
      .refine((v) => validIds.includes(v), 'არასწორი პასუხის ვარიანტი'),
  });
}

/** Zod -> Formik validate ადაპტერი */
export function zodToFormikValidate(schema) {
  return (values) => {
    const result = schema.safeParse(values);
    if (result.success) return {};
    const errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return errors;
  };
}
