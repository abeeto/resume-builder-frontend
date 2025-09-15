import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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

const personalInfoSchema = z.object({
  full_name: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().optional(),
});

export function PersonalInfoForm() {
  const { state, dispatch } = useResume();
  const { personalInfo } = state;

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
  });

  useEffect(() => {
    form.reset(personalInfo);
  }, [personalInfo, form]);

  const handleFieldChange = (
    field: keyof typeof personalInfo,
    value: string,
  ) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value },
    });
  };

  function onSubmit(values: z.infer<typeof personalInfoSchema>) {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: values,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('full_name', e.target.value);
                  }}
                />
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
                <Input
                  placeholder="Enter your phone number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('phone_number', e.target.value);
                  }}
                />
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
                <Input
                  placeholder="Enter your email"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('email', e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
