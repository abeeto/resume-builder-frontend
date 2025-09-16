import { useParams } from '@tanstack/react-router';

import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/ui/shadcn-io/copy-button';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useResume } from '@/lib/pages/resume_builder/contexts/resume-context';

const SaveStatusDisplay = () => {
  const { state } = useResume();
  return (
    <div className="">
      <Badge
        variant={'outline'}
        className="flex flex-row text-sm font-light px-4 py-1"
      >
        {state.isSaving ? (
          <>
            <Spinner variant="bars" />
            <div>Saving...</div>
          </>
        ) : (
          <>
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              aria-label="cloud-image"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
              />
            </svg>
            <div className="mx-1">Saved</div>
          </>
        )}
      </Badge>
    </div>
  );
};

const ResumeIdDisplay = () => {
  const { resumeId } = useParams({ from: '/resume/$resumeId' });

  return (
    <div className="flex items-center gap-2">
      <input
        value={resumeId || ''}
        readOnly
        className="flex-1 px-3 py-1 border rounded-md bg-gray-50 text-gray-600"
        placeholder="Resume ID"
      />
      <CopyButton variant={'outline'} content={resumeId || ''} />
    </div>
  );
};

export const ResumeInfo = () => {
  return (
    <div className="flex justify-between mx-6 px-2 py-3">
      <div className="flex items-center gap-4">
        <SaveStatusDisplay />
        <ResumeIdDisplay />
      </div>
      <div></div>
    </div>
  );
};
