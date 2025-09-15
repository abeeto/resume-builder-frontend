import { useResume } from '@/lib/pages/resume_builder/contexts/resume-context';

export const PersonalInfoSection = () => {
  const { state } = useResume();
  const { full_name, email, phone_number } = state.personalInfo;

  return (
    <div className="w-full py-7 px-6 text-sky-50 bg-sky-950">
      <h1 className="text-center">{full_name}</h1>
      <div className="flex flex-row justify-center space-between mx-auto mt-4 ">
        {email && (
          <div className="flex flex-row">
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              aria-label="Email"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            <span className="mx-2">{email}</span>
          </div>
        )}

        {phone_number && (
          <div className="flex flex-row">
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              aria-label="Phone"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mx-2">{phone_number}</span>
          </div>
        )}
      </div>
    </div>
  );
};
