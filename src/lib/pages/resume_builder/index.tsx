import { useParams } from '@tanstack/react-router';

import { ResumeComponent } from '@/lib/pages/resume_builder/components/resume-component';
import { ResumeEditor } from '@/lib/pages/resume_builder/components/resume-editor';
import { ResumeProvider } from '@/lib/pages/resume_builder/contexts/resume-context';
import { useFetchPersonalInfo } from '@/lib/pages/resume_builder/hooks/use-resume-data';

const ResumeBuilderContent = () => {
  const { resumeId } = useParams({ from: '/resume/$resumeId' });

  useFetchPersonalInfo(resumeId);

  return (
    <div className="flex max-w-7xl md:justify-between md:flex-row flex-col align-center gap-3 mx-auto min-h-screen overflow-x-auto">
      <ResumeEditor></ResumeEditor>
      <ResumeComponent></ResumeComponent>
    </div>
  );
};

const ResumeBuilder = () => {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
};

export default ResumeBuilder;
