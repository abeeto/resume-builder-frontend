import { useEffect, useRef } from 'react';
import { type Control, useWatch } from 'react-hook-form';

import { useResume } from '@/lib/pages/resume_builder/contexts/resume-context';

export const useAutoSave = <T extends Record<string, unknown>>(
  control: Control<T>,
  resumeId: string | undefined,
  endpoint: string,
  onLocalUpdate?: (data: T) => void,
  delay = 3500,
) => {
  const watchedFields = useWatch({ control });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialRender = useRef(true);
  const previousDataRef = useRef<string>('');
  const lastLocalUpdateRef = useRef<string>('');
  const hasUserInteracted = useRef(false);
  const { dispatch } = useResume();

  useEffect(() => {
    if (!resumeId) {
      return;
    }

    const currentData = JSON.stringify(watchedFields);

    if (isInitialRender.current) {
      isInitialRender.current = false;
      previousDataRef.current = currentData;
      return;
    }

    // If data is the same as previous, no need to save
    if (currentData === previousDataRef.current) {
      return;
    }

    // Mark that user has interacted if this is the first change after initialization
    if (!hasUserInteracted.current) {
      hasUserInteracted.current = true;
      // Update previous data without triggering save for programmatic changes (like form.reset)
      previousDataRef.current = currentData;
      return;
    }

    if (onLocalUpdate && currentData !== lastLocalUpdateRef.current) {
      // if local state is different to input fields (user must have typed something) => update local state
      lastLocalUpdateRef.current = currentData;
      onLocalUpdate(watchedFields as T);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        dispatch({
          type: 'SET_IS_SAVING_TRUE',
        });

        const [response] = await Promise.all([
          fetch(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(watchedFields),
          }),
          new Promise((resolve) => setTimeout(resolve, 1500)), // Minimum 1500 saving state
        ]);

        if (response.ok) {
          previousDataRef.current = currentData;
        } else {
          console.error('API call failed with status:', response.status);
        }
      } catch (error) {
        console.error('Auto-save failed', error);
      } finally {
        dispatch({
          type: 'SET_IS_SAVING_FALSE',
        });
      }
    }, delay);
  }, [watchedFields, resumeId, endpoint, onLocalUpdate, delay, dispatch]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};
