import {
  type Education,
  useResume,
} from '@/lib/pages/resume_builder/contexts/resume-context';

const EducationItem = ({ education }: { education: Education }) => {
  return (
    <div className="px-10 mx-auto flex justify-between">
      <div className="basis-1/3 flex font-light text-base">
        <div>
          {education.start_date} -{' '}
          {education.end_date ? education.end_date : 'Present'}
        </div>
      </div>

      <div className="flex-grow basis-2/3 shrink-1">
        <div className="font-semibold text-lg">{education.degree}</div>
        <div className="font-light text-sm">{education.location}</div>
      </div>
    </div>
  );
};

export const EducationInfoSection = () => {
  const { state } = useResume();
  const educations = state.educations;

  return (
    <div className="px-10 my-10 space-y-5">
      {educations.length > 0 && (
        <div className="text-center bg-gray-200 py-1 w-full font-bold text-xl">
          Education
        </div>
      )}
      {educations.map((education) => (
        <EducationItem key={education.id} education={education} />
      ))}
    </div>
  );
};
