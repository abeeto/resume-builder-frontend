import type React from 'react';
import { createContext, useContext, useReducer } from 'react';

export interface PersonalInfo {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  isSaving: boolean;
}

export type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
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
  isSaving: false,
};

const resumeReducer = (state: ResumeData, action: ResumeAction): ResumeData => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
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
