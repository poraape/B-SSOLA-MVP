import { z } from 'zod';

const RiskGroupSchema = z.enum([
  'violence',
  'psychosocial',
  'medical',
  'social',
  'rights',
  'structural',
  'emergency',
]);

const FlowTypeSchema = z.enum(['standard', 'medical_emergency', 'security_emergency']);

const FlowResultLevelSchema = z.enum(['low', 'moderate', 'high', 'critical', 'P0', 'P1', 'P2', 'P3']);

const ServiceRefSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

const TriageResultSchema = z.object({
  level: z.string().optional(),
  severity: z.string().min(1),
  priority: FlowResultLevelSchema.optional(),
  notifyManagement: z.boolean().optional(),
  primaryService: ServiceRefSchema.nullable(),
  secondaryService: ServiceRefSchema.nullable(),
  schoolActions: z.array(z.string()),
  explanationPoints: z.array(z.string()).optional(),
  institutionalScript: z.array(z.string()).optional(),
  appliedRules: z.array(z.string()).optional(),
  riskScore: z.number().optional(),
  riskScoreFactors: z.array(z.string()).optional(),
  summaryTag: z.string().optional(),
  uiFlags: z
    .object({
      confidential: z.boolean().optional(),
      showGuardrail: z.boolean().optional(),
      avoidRetraumatization: z.boolean().optional(),
    })
    .optional(),
});

const FlowSchema = z.object({
  meta: z.object({
    id: z.string().min(1),
    categoryId: z.string().min(1),
    subcategory: z.string().min(1),
    subcategoryId: z.string().optional(),
    type: FlowTypeSchema,
    title: z.string().min(1),
    keywords: z.array(z.string()),
  }),
  riskModel: z.object({
    usedLevels: z.array(z.string()),
    defaultLevel: z.string(),
  }),
  triage: z.object({
    maxQuestions: z.number().int().min(1),
    questions: z.array(
      z.object({
        id: z.string().min(1),
        text: z.string().min(1),
        options: z.array(
          z.object({
            label: z.string().min(1),
            next: z.string().optional(),
            level: z.string().optional(),
            nextFlow: z.string().optional(),
            redirectToCategories: z.boolean().optional(),
          }),
        ),
      }),
    ),
  }),
  results: z.record(z.string(), TriageResultSchema),
});

export const ProtocolModelSchema = z.object({
  version: z.string().min(1),
  meta: z.object({
    appName: z.string().min(1),
    version: z.string().min(1),
    scope: z.string().min(1),
    guardrailEnabled: z.boolean(),
  }),
  categories: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      riskGroup: RiskGroupSchema,
      icon: z.string().min(1),
      subcategories: z.array(
        z.object({
          id: z.string().min(1),
          label: z.string().min(1),
        }),
      ),
    }),
  ),
  flows: z.array(FlowSchema),
  services: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      category: z.string().min(1),
      type: z.string().min(1),
      contact: z.object({
        phone: z.string().nullable(),
      }).passthrough(),
      location: z.object({
        address: z.string().min(1),
        lat: z.number().nullable(),
        lng: z.number().nullable(),
      }),
    }),
  ),
}).passthrough();

export type ProtocolModelZod = z.infer<typeof ProtocolModelSchema>;

export function validateProtocolModelSchema(data: unknown): ProtocolModelZod {
  const parsed = ProtocolModelSchema.safeParse(data);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map(issue => `- ${issue.path.join('.') || '<root>'}: ${issue.message}`)
      .join('\n');

    throw new Error(`model validation failed:\n${details}`);
  }

  return parsed.data;
}
