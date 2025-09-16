import { useParams } from '@tanstack/react-router';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  type Education,
  useResume,
} from '@/lib/pages/resume_builder/contexts/resume-context';

import { EducationInfoForm } from './education-info-form';

export const EducationInfoView = () => {
  const { state, dispatch } = useResume();
  const { resumeId } = useParams({ from: '/resume/$resumeId' });
  const [selectedEducationId, setSelectedEducationId] = useState<string | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleAddEducation = async () => {
    if (!resumeId) {
      return;
    }

    try {
      dispatch({ type: 'SET_IS_SAVING_TRUE' });

      const response = await fetch(`/api/resume/${resumeId}/education/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          degree: 'New Degree',
          start_date: '2024-01',
          end_date: '2024-12',
          location: 'New Location',
        }),
      });

      if (response.ok) {
        const newEducation: Education = await response.json();
        dispatch({
          type: 'ADD_EDUCATION',
          payload: newEducation,
        });
      } else {
        console.error('Failed to create education entry:', response.status);
      }
    } catch (error) {
      console.error('Failed to create education entry:', error);
    } finally {
      dispatch({ type: 'SET_IS_SAVING_FALSE' });
    }
  };

  // If an education is selected, show the form view
  if (selectedEducationId) {
    return (
      <Card className="px-8">
        <EducationInfoForm
          educationId={selectedEducationId}
          onBack={() => setSelectedEducationId(null)}
        />
      </Card>
    );
  }

  // Otherwise, show the collapsible list view
  return (
    <Card className="px-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full justify-between p-0 font-semibold text-lg hover:bg-transparent"
            >
              <span>
                Education{' '}
                {state.educations.length > 0
                  ? `(${state.educations.length})`
                  : ''}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                role="img"
                aria-label="toggle arrow"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-4">
          <div className="space-y-3">
            {state.educations.map((education) => (
              <button
                key={education.id}
                type="button"
                tabIndex={0}
                className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedEducationId(education.id)}
              >
                <div className="font-medium">{education.degree}</div>
                <div className="text-sm text-gray-500">
                  {education.location}
                </div>
              </button>
            ))}

            <Button
              className="bg-sky-600 hover:bg-sky-700 cursor-pointer mt-4"
              onClick={handleAddEducation}
              disabled={state.isSaving}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                role="img"
                aria-label="plus icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Education
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
