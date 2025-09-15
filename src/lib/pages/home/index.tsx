import { GetResumeForm } from '@/lib/pages/home/components/get-resume-form';
import { SomeText } from '@/lib/pages/home/components/some-text';

import { CreateResumeBtn } from './components/create-resume-btn';

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-35 text-center">
      <SomeText />
      <div className="flex w-[26rem] flex-col gap-4 min-h-[70vh] justify-center">
        <GetResumeForm />
        <CreateResumeBtn />
      </div>
    </div>
  );
};

export default Home;
