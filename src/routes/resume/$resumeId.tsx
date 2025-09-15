import { createFileRoute } from '@tanstack/react-router';

import ResumeBuilder from '@/lib/pages/resume_builder';

export const Route = createFileRoute('/resume/$resumeId')({
  component: ResumeBuilder,
});
