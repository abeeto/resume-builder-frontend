import { useEffect } from 'react';

import {
  type PersonalInfo,
  useResume,
} from '@/lib/pages/resume_builder/contexts/resume-context';

interface FetchConfig<T> {
  url: string;
  onSuccess: (data: T) => void;
  onError?: (error: Error) => void;
}

export const fetchResumeData = async <T>(
  config: FetchConfig<T>,
): Promise<void> => {
  const { url, onSuccess, onError } = config;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data: T = await response.json();
      onSuccess(data);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    if (onError) {
      onError(errorMessage);
    } else {
      console.error('Failed to fetch resume data:', errorMessage);
    }
  }
};

export const useFetchPersonalInfo = (resumeId: string | undefined) => {
  const { dispatch } = useResume();

  useEffect(() => {
    if (!resumeId) {
      return;
    }

    fetchResumeData<PersonalInfo>({
      url: `/api/resume/${resumeId}/personal-info/`,
      onSuccess: (personalInfo) => {
        dispatch({
          type: 'SET_PERSONAL_INFO',
          payload: personalInfo,
        });
      },
    });
  }, [resumeId, dispatch]);
};
