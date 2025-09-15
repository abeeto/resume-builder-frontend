import { useEffect, useRef } from 'react';
import { type Control, useWatch } from 'react-hook-form';

export const useAutoSave = <T extends Record<string, unknown>>(
  control: Control<T>,
  resumeId: string | undefined,
  endpoint: string,
  onSuccess?: (data: T) => void,
  delay = 1000,
) => {
  const watchedFields = useWatch({ control });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialRender = useRef(true);
  const previousDataRef = useRef<string>('');

  useEffect(() => {
    if (!resumeId) {
      return;
    }
    if (isInitialRender.current) {
      isInitialRender.current = false;
      previousDataRef.current = JSON.stringify(watchedFields);
      return;
    }

    // Check if data actually changed
    const currentData = JSON.stringify(watchedFields);
    if (currentData === previousDataRef.current) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(watchedFields),
        });

        if (response.ok && onSuccess) {
          onSuccess(watchedFields as T);
          previousDataRef.current = currentData;
        }
      } catch (error) {
        console.error('Auto-save failed', error);
        // user notification
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watchedFields, resumeId, endpoint, onSuccess, delay]);
};
