import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
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

const getResumeSchema = z.object({
  resume_id: z.string(),
});

export const GetResumeForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof getResumeSchema>>({
    resolver: zodResolver(getResumeSchema),
    defaultValues: { resume_id: '' },
  });
  async function onSubmit(values: z.infer<typeof getResumeSchema>) {
    // send some api log for now i want to console.log the object as json
    const { resume_id: client_input_resume_id } = values;
    const response = await fetch(`api/resume/${client_input_resume_id}/`);
    const { id: resume_id } = await response.json();
    navigate({ to: `/resume/${resume_id}` });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
        <FormField
          control={form.control}
          name="resume_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start where you left off?</FormLabel>
              <FormControl>
                <Input placeholder="paste in a resume id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="self-end bg-sky-600">
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
            aria-label="open resume"
          >
            <path
              fillRule="evenodd"
              d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </form>
    </Form>
  );
};
