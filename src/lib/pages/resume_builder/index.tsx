import { useParams } from '@tanstack/react-router';

import { ResumeComponent } from '@/lib/pages/resume_builder/components/resume-component';
import { ResumeEditor } from '@/lib/pages/resume_builder/components/resume-editor';
import { ResumeInfo } from '@/lib/pages/resume_builder/components/resume-info';
import { ResumeProvider } from '@/lib/pages/resume_builder/contexts/resume-context';
import {
  useAutoFetchEducations,
  useAutoFetchPersonalInfo,
} from '@/lib/pages/resume_builder/hooks/use-resume-data';

const ResumeBuilderContent = () => {
  const { resumeId } = useParams({ from: '/resume/$resumeId' });

  useAutoFetchPersonalInfo(resumeId);
  useAutoFetchEducations(resumeId);

  return (
    <div className="flex-col max-w-7xl mx-auto">
      <ResumeInfo />
      <div className="flex md:justify-between md:flex-row flex-col align-center mx-auto min-h-screen overflow-x-auto">
        <ResumeEditor></ResumeEditor>
        <ResumeComponent></ResumeComponent>
      </div>
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
