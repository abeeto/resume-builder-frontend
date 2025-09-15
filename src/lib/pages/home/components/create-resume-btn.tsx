import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export const CreateResumeBtn = ({ resumeId }: { resumeId: string }) => {
  return (
    <div className="grid gap-2.5">
      <Link to="/resume/$resumeId" className="gap-2" params={{ resumeId }}>
        <Button className="w-full bg-sky-600">Create New Resume</Button>
      </Link>
    </div>
  );
};
