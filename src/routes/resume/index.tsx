import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/')({
  loader: () => {
    throw redirect({ to: '/' });
  },
});
