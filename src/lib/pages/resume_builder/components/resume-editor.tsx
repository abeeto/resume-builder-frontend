import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PersonalInfoForm } from '@/lib/pages/resume_builder/components/PersonalInfo/personal-info-form';
export function ResumeEditor() {
  return (
    <Card className="flex-grow px-3 h-fit">
      <CardTitle className="px-6">Personal Information</CardTitle>
      <CardContent>
        <PersonalInfoForm />
      </CardContent>
    </Card>
  );
}
