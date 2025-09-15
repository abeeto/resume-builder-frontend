import { createFileRoute, notFound } from '@tanstack/react-router';

import ResumeBuilder from '@/lib/pages/resume_builder';

export const Route = createFileRoute('/resume/$resumeId')({
  component: ResumeBuilder,
  loader: async ({ params }) => {
    const { resumeId } = params;

    try {
      const response = await fetch(`/api/resume/${resumeId}/`);

      if (!response.ok) {
        if (response.status === 404) {
          throw notFound();
        }
        throw new Error(`Failed to fetch resume: ${response.status}`);
      }
      if (!response.ok) {
        if (response.status === 404) {
          throw notFound();
        }
        throw new Error(`Failed to fetch resume: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Response && error.status === 404) {
        throw notFound();
      }
      throw error;
    }
  },
});
