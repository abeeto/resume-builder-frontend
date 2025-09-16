import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const personalInfoSchema = z.object({
  full_name: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().optional(),
});

export function PersonalInfoForm() {
  const { state, dispatch } = useResume();
  const { personalInfo } = state;
  const { resumeId } = useParams({ from: '/resume/$resumeId' });
  const personalInfoRef = useRef(personalInfo);

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
  });

  personalInfoRef.current = personalInfo;

  useEffect(() => {
    if (personalInfo.id) {
      form.reset(personalInfoRef.current);
    }
  }, [personalInfo.id, form]);

  useAutoSave(
    form.control,
    resumeId,
    `${import.meta.env.VITE_API_BASE_URL}/api/resume/${resumeId}/personal-info/`,
    (data) => {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: data,
      });
    },
  );

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
