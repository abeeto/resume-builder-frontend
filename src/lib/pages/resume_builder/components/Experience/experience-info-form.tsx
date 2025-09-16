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
import { Textarea } from '@/components/ui/textarea';
import { useResume } from '@/lib/pages/resume_builder/contexts/resume-context';
import { useAutoSave } from '@/lib/pages/resume_builder/hooks/use-auto-save';

const experienceInfoSchema = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  description: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  location: z.string().optional(),
});

interface ExperienceInfoFormProps {
  experienceId: string;
  onBack?: () => void;
}

export function ExperienceInfoForm({
  experienceId,
  onBack,
}: ExperienceInfoFormProps) {
  const { state, dispatch } = useResume();
  const { resumeId } = useParams({ from: '/resume/$resumeId' });

  const experience = state.experiences.find((exp) => exp.id === experienceId);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/experience/${experienceId}/delete/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_EXPERIENCE', payload: experienceId });
        onBack?.();
      } else {
        console.error('Failed to delete experience');
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };
  const experienceRef = useRef(experience);

  const form = useForm<z.infer<typeof experienceInfoSchema>>({
    resolver: zodResolver(experienceInfoSchema),
    defaultValues: experience || {
      company: '',
      position: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
    },
  });

  experienceRef.current = experience;

  useEffect(() => {
    if (experience?.id) {
      form.reset(experienceRef.current);
    }
  }, [experience?.id, form]);

  useAutoSave(
    form.control,
    resumeId,
    `/api/experience/${experienceId}/`,
    (data) => {
      // Update the specific experience in context
      const updatedExperiences = state.experiences.map((exp) =>
        exp.id === experienceId ? { ...exp, ...data } : exp,
      );
      dispatch({
        type: 'SET_EXPERIENCES',
        payload: updatedExperiences,
      });
    },
  );

  if (!experience) {
    return <div>Experience not found</div>;
  }

  return (
    <div>
      {onBack && (
        <button
          type="button"
          tabIndex={0}
          onClick={onBack}
          className="h-auto flex flex-row mb-0 px-0 py-1 font-semibold justify-start items-center font-normal text-slate-500 hover:text-slate-600 hover:underline hover:cursor-pointer hover:bg-transparent"
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
        <h3 className="mb-2">Experience</h3>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your position" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your role and achievements"
                    className="min-h-[100px]"
                    {...field}
                  />
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
                  <Input placeholder="Enter company location" {...field} />
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
