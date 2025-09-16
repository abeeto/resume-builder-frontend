import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResume } from '@/lib/pages/resume_builder/contexts/resume-context';
import { useAutoSave } from '@/lib/pages/resume_builder/hooks/use-auto-save';

const educationInfoSchema = z.object({
  degree: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  location: z.string().optional(),
});

interface EducationInfoFormProps {
  educationId: string;
  onBack?: () => void;
}

export function EducationInfoForm({
  educationId,
  onBack,
}: EducationInfoFormProps) {
  const { state, dispatch } = useResume();
  const { resumeId } = useParams({ from: '/resume/$resumeId' });

  const education = state.educations.find((edu) => edu.id === educationId);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/education/${educationId}/delete/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_EDUCATION', payload: educationId });
        onBack?.();
      } else {
        console.error('Failed to delete education');
      }
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };
  const educationRef = useRef(education);

  const form = useForm<z.infer<typeof educationInfoSchema>>({
    resolver: zodResolver(educationInfoSchema),
    defaultValues: education || {
      degree: '',
      start_date: '',
      end_date: '',
      location: '',
    },
  });

  educationRef.current = education;

  useEffect(() => {
    if (education?.id) {
      form.reset(educationRef.current);
    }
  }, [education?.id, form]);

  useAutoSave(
    form.control,
    resumeId,
    `/api/resume/${resumeId}/education/${educationId}/`,
    (data) => {
      // Update the specific education in context
      const updatedEducations = state.educations.map((edu) =>
        edu.id === educationId ? { ...edu, ...data } : edu,
      );
      dispatch({
        type: 'SET_EDUCATIONS',
        payload: updatedEducations,
      });
    },
  );

  return (
    <div>
      {onBack && (
        <button
          type="button"
          tabIndex={0}
          onClick={onBack}
          className="h-auto flex flex-row mb-0 px-0 py-1 font-semibold justify-start items-center font-normal text-slate-500 hover:text-slate-6 00 hover:underline hover:cursor-pointer hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-1"
            role="img"
            aria-label="back arrow"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </button>
      )}
      <Form {...form}>
        <h3 className="mb-2">Education</h3>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your degree" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter institution location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input placeholder="YYYY-MM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input placeholder="YYYY-MM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Button variant="destructive" onClick={handleDelete} className="w-fit">
          Remove
        </Button>
      </div>
    </div>
  );
}
