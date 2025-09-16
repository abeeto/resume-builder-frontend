import { useEffect } from 'react';

import {
  type Education,
  type Experience,
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

export const useAutoFetchPersonalInfo = (resumeId: string | undefined) => {
  const { dispatch } = useResume();

  useEffect(() => {
    if (!resumeId) {
      return;
    }
    fetchResumeData<PersonalInfo>({
      url: `${import.meta.env.VITE_API_BASE_URL}/api/resume/${resumeId}/personal-info/`,
      onSuccess: (personalInfo) => {
        dispatch({
          type: 'UPDATE_PERSONAL_INFO',
          payload: personalInfo,
        });
      },
      onError: (error) => {
        console.error('Failed to fetch personal info:', error);
      },
    });
  }, [resumeId, dispatch]);
};

export const useAutoFetchEducations = (resumeId: string | undefined) => {
  const { dispatch } = useResume();

  useEffect(() => {
    if (!resumeId) {
      return;
    }
    fetchResumeData<Array<Education>>({
      url: `${import.meta.env.VITE_API_BASE_URL}/api/resume/${resumeId}/education/`,
      onSuccess: (educations) => {
        dispatch({
          type: 'SET_EDUCATIONS',
          payload: educations,
        });
      },
      onError: (error) => {
        console.error('Failed to fetch educations:', error);
      },
    });
  }, [resumeId, dispatch]);
};

export const useAutoFetchExperiences = (resumeId: string | undefined) => {
  const { dispatch } = useResume();

  useEffect(() => {
    if (!resumeId) {
      return;
    }
    fetchResumeData<Array<Experience>>({
      url: `${import.meta.env.VITE_API_BASE_URL}/api/resume/${resumeId}/experience/`,
      onSuccess: (experiences) => {
        dispatch({
          type: 'SET_EXPERIENCES',
          payload: experiences,
        });
      },
      onError: (error) => {
        console.error('Failed to fetch experiences:', error);
      },
    });
  }, [resumeId, dispatch]);
};
