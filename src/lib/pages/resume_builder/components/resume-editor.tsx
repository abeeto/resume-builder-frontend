import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { EducationInfoView } from '@/lib/pages/resume_builder/components/Education/education-info-view';
import { PersonalInfoForm } from '@/lib/pages/resume_builder/components/PersonalInfo/personal-info-form';
export function ResumeEditor() {
  return (
    <div className="flex-col flex-grow mx-7">
      <Card className="px-3 h-fit mb-5">
        <CardTitle className="px-6">
          <h3>Personal Information</h3>
        </CardTitle>
        <CardContent>
          <PersonalInfoForm />
        </CardContent>
      </Card>
      <EducationInfoView />
    </div>
  );
}
