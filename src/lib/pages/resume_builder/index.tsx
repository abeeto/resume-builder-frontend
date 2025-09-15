import { ResumeComponent } from '@/lib/pages/resume_builder/components/resume-component';
import { ResumeEditor } from '@/lib/pages/resume_builder/components/resume-editor';
import { ResumeProvider } from '@/lib/pages/resume_builder/contexts/resume-context';

const ResumeBuilder = () => {
  return (
    <ResumeProvider>
      <div className="flex max-w-7xl md:justify-between md:flex-row flex-col align-center gap-3 mx-auto min-h-screen overflow-x-auto">
        <ResumeEditor></ResumeEditor>
        <ResumeComponent></ResumeComponent>
      </div>
    </ResumeProvider>
  );
};

export default ResumeBuilder;
