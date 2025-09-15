import { SomeText } from '@/lib/pages/home/components/some-text';

import { CreateResumeBtn } from './components/create-resume-btn';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <SomeText />
      <CreateResumeBtn resumeId="1234" />
    </div>
  );
};

export default Home;
