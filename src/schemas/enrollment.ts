import { z } from 'zod';

import { EnrollmentStatusSchema } from '@/schemas/_enums';

export const EnrollmentSchema = z.object({
	studentCode: z.string(),
	semesterId: z.string().uuid(),
	status: EnrollmentStatusSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const EnrollmentCreateSchema = EnrollmentSchema.omit({
	createdAt: true,
	updatedAt: true,
}).extend({
	status: EnrollmentStatusSchema.default('NotYet'),
});

export const EnrollmentUpdateSchema = EnrollmentSchema.pick({
	status: true,
});

// Export inferred types
export type Enrollment = z.infer<typeof EnrollmentSchema>;
export type EnrollmentCreate = z.infer<typeof EnrollmentCreateSchema>;
export type EnrollmentUpdate = z.infer<typeof EnrollmentUpdateSchema>;
