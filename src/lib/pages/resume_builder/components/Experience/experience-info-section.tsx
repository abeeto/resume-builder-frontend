import {
  type Experience,
  useResume,
} from '@/lib/pages/resume_builder/contexts/resume-context';

const ExperienceItem = ({ experience }: { experience: Experience }) => {
  return (
    <div className="px-10 mx-auto flex justify-between">
      <div className="basis-1/3 flex-col font-light text-md">
        <div>
          {experience.start_date} -{' '}
          {experience.end_date ? experience.end_date : 'Present'}
        </div>
        <div className="font-light text-md">{experience.location}</div>
      </div>

      <div className="flex-grow basis-auto shrink-1">
        <div className="font-semibold text-lg">{experience.position}</div>
        <div className="font-light text-sm">{experience.company}</div>
        {experience.description && (
          <div className="font-light text-md mt-2">
            {experience.description}
          </div>
        )}
      </div>
    </div>
  );
};

export const ExperienceInfoSection = () => {
  const { state } = useResume();
  const experiences = state.experiences;

  return (
    <div className="px-10 my-10 space-y-5">
      {experiences.length > 0 && (
        <div className="text-center bg-gray-200 py-1 w-full font-bold text-xl">
          Experience
        </div>
      )}
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  );
};
