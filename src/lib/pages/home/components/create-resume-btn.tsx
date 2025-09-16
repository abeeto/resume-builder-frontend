import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export const CreateResumeBtn = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateResume = async () => {
    setIsCreating(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/resume/create/`,
        {
          method: 'POST',
        },
      );

      const { id: resumeId } = await response.json();
      navigate({ to: `/resume/${resumeId}` });
    } catch (error) {
      console.error('Failed to create resume:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="mt-2">
      <Button
        className="w-full bg-sky-600 hover:bg-sky-700"
        onClick={handleCreateResume}
        disabled={isCreating}
      >
        {isCreating ? 'Creating Resume...' : 'Create New Resume'}
      </Button>
    </div>
  );
};
