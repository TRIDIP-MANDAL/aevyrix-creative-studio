import { describe, expect, it } from 'vitest';
import { contactSchema, inquirySchema } from '@/lib/form-schemas';

const brief = {
  full_name: 'Verification Test', email: 'verification@example.com', phone: '+91 9000000000',
  country: 'India', service_category: 'Video Editing', package: 'custom',
  project_title: 'Verification project', project_description: 'A test brief for checking inquiry validation.',
  privacy_consent: true,
};

describe('Public form validation', () => {
  it('rejects impossible calendar deadlines', () => {
    expect(inquirySchema.safeParse({ ...brief, deadline: '2026-02-31' }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...brief, deadline: '2026-13-01' }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...brief, deadline: '2028-02-29' }).success).toBe(true);
    expect(inquirySchema.safeParse({ ...brief, deadline: '' }).success).toBe(true);
  });
  it('requires privacy consent before accepting an inquiry', () => {
    expect(inquirySchema.safeParse({ ...brief, privacy_consent: false }).success).toBe(false);
    expect(inquirySchema.safeParse(brief).success).toBe(true);
  });
  it('rejects invalid contact emails', () => {
    const message = { name: 'Verification Test', message: 'A test contact message.' };
    expect(contactSchema.safeParse({ ...message, email: 'invalid' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...message, email: 'verification@example.com' }).success).toBe(true);
  });
});