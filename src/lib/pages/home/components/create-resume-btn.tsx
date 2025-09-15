import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export const CreateResumeBtn = ({ resumeId }: { resumeId: string }) => {
  return (
    <div className="grid justify-items-center gap-2.5">
      <Link
        to="/resume/$resumeId"
        className="flex items-center gap-2"
        params={{ resumeId }}
      >
        <Button>Create Resume</Button>
      </Link>
    </div>
  );
};
