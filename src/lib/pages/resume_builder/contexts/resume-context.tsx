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
}

export type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'SET_PERSONAL_INFO'; payload: PersonalInfo }
  | { type: 'RESET_RESUME' };

const initialState: ResumeData = {
  personalInfo: {
    id: '',
    full_name: '',
    phone_number: '',
    email: '',
  },
};

const resumeReducer = (state: ResumeData, action: ResumeAction): ResumeData => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    case 'SET_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: action.payload,
      };

    case 'RESET_RESUME':
      return initialState;

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
