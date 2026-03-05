import { z } from 'zod';

const FlowTypeSchema = z.enum(['standard', 'medical_emergency', 'security_emergency']);

const FlowOptionSchema = z.object({
  label: z.string().min(1, 'Option label is required'),
  next: z.string().min(1).optional(),
  level: z.string().min(1).optional(),
  nextFlow: z.string().min(1).optional(),
  redirectToCategories: z.boolean().optional(),
});

const FlowQuestionSchema = z.object({
  id: z.string().min(1, 'Question id is required'),
  text: z.string().min(1, 'Question text is required'),
  options: z.array(FlowOptionSchema).min(1, 'Question must have at least one option'),
});

const ServiceRefSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

const FlowResultSchema = z.object({
  severity: z.string().min(1),
  primaryService: ServiceRefSchema.nullable(),
  secondaryService: ServiceRefSchema.nullable(),
  schoolActions: z.array(z.string().min(1)),
});

export const FlowFileSchema = z.object({
  meta: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    type: FlowTypeSchema,
    categoryId: z.string().min(1),
    subcategoryId: z.string().min(1),
    keywords: z.array(z.string()),
  }),
  questions: z.array(FlowQuestionSchema).min(1, 'Flow must have at least one question'),
  results: z.record(z.string(), FlowResultSchema),
});

export type FlowFile = z.infer<typeof FlowFileSchema>;

export function validateFlowFile(data: unknown, source = 'flow'): FlowFile {
  const parsed = FlowFileSchema.safeParse(data);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map(issue => `- ${issue.path.join('.') || '<root>'}: ${issue.message}`)
      .join('\n');

    throw new Error(`${source} validation failed:\n${details}`);
  }

  return parsed.data;
}
