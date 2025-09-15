import { GetResumeForm } from '@/lib/pages/home/components/get-resume-form';
import { SomeText } from '@/lib/pages/home/components/some-text';

import { CreateResumeBtn } from './components/create-resume-btn';

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
      <SomeText />
      <div className="flex flex-col gap-4 min-h-[70vh] justify-center">
        <GetResumeForm />
        <CreateResumeBtn resumeId="1234" />
      </div>
    </div>
  );
};

export default Home;
