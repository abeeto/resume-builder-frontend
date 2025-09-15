import { useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export const CreateResumeBtn = () => {
  const navigate = useNavigate();

  const handleCreateResume = async () => {
    const response = await fetch('/api/resume/create/', {
      method: 'POST',
    });

    const { id: resumeId } = await response.json();
    // biome-ignore lint/suspicious/noExplicitAny: Router state typing issue
    navigate({ to: `/resume/${resumeId}`, state: { isNew: true } as any });
  };

  return (
    <div className="mt-2">
      <Button className="w-full bg-sky-600" onClick={handleCreateResume}>
        Create New Resume
      </Button>
    </div>
  );
};
