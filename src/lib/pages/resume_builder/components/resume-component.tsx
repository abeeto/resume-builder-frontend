import { Card, CardContent } from '@/components/ui/card';
import { PersonalInfoSection } from '@/lib/pages/resume_builder/components/PersonalInfo/personal-info-section';

export const ResumeComponent = () => {
  return (
    <Card className="w-[210mm] h-[297mm] p-0 flex-shrink-0 bg-white shadow-[rgba(50,50,93,0.1)_0px_13px_27px_-5px,rgba(0,0,0,0.25)_0px_8px_16px_-8px]">
      <CardContent className="px-0">
        <PersonalInfoSection />
      </CardContent>
    </Card>
  );
};
