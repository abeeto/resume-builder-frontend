import type React from 'react';
import { createContext, useContext, useReducer } from 'react';

export interface PersonalInfo {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
}

export interface Education {
  id: string;
  degree: string;
  start_date: string;
  end_date: string;
  location: string;
  resume_id: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  educations: Array<Education>;
  isSaving: boolean;
}

export type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'SET_EDUCATIONS'; payload: Array<Education> }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'RESET_RESUME' }
  | { type: 'SET_IS_SAVING_TRUE' }
  | { type: 'SET_IS_SAVING_FALSE' };

const initialState: ResumeData = {
  personalInfo: {
    id: '',
    full_name: '',
    phone_number: '',
    email: '',
  },
  educations: [],
  isSaving: false,
};

const resumeReducer = (state: ResumeData, action: ResumeAction): ResumeData => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    case 'SET_EDUCATIONS':
      return {
        ...state,
        educations: action.payload,
      };

    case 'ADD_EDUCATION':
      return {
        ...state,
        educations: [...state.educations, action.payload],
      };

    case 'DELETE_EDUCATION':
      return {
        ...state,
        educations: state.educations.filter((edu) => edu.id !== action.payload),
      };

    case 'RESET_RESUME':
      return initialState;
    case 'SET_IS_SAVING_TRUE':
      return { ...state, isSaving: true };
    case 'SET_IS_SAVING_FALSE':
      return { ...state, isSaving: false };
    default:
      return state;
  }
};

interface ResumeContextType {
  state: ResumeData;
  dispatch: React.Dispatch<ResumeAction>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

interface ResumeProviderProps {
  children: React.ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};
