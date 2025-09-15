import { useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export const CreateResumeBtn = () => {
  const navigate = useNavigate();

  const handleCreateResume = async () => {
    const response = await fetch('/api/resume/create/', {
      method: 'POST',
    });

    const { id: resumeId } = await response.json();
    navigate({ to: `/resume/${resumeId}` });
  };

  return (
    <div className="mt-2">
      <Button className="w-full bg-sky-600" onClick={handleCreateResume}>
        Create New Resume
      </Button>
    </div>
  );
};
