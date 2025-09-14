import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

function CreateResumeButton() {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsCreating(true);
      const response = await fetch('/api/resume/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const { id: resumeId } = await response.json();
      if (response.ok) {
        navigate({ to: '/resume/$resumeId', params: { resumeId } });
      }
    } catch (error) {
      console.error('Failed to create resume', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      className="rounded-lg bg-linear-to-br from-gray-100 to-green-200 p-3 px-6 font-semibold text-green-700 hover:from-gray-200 hover:to-green-200 hover:text-green-800 transition-all"
      type="button"
      onClick={handleSubmit}
    >
      {isCreating ? 'Loading...' : 'Start Building Resume'}
    </button>
  );
}

export const CTASection = () => {
  return (
    <div className="grid justify-items-center gap-2.5">
      <div className="flex items-center gap-2">
        <CreateResumeButton />
        <button
          className="rounded-lg border border-gray-300 p-3 px-6 text-sm font-semibold hover:bg-gray-50 transition-all"
          type="button"
        >
          Access past resumes
        </button>
      </div>
    </div>
  );
};
