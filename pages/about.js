import Wrapper from '@/components/Wrapper';
import { Image } from 'next/image';
import React from 'react';

const about = () => {
  return (
    <div className='min-h-[450px] flex items-center '>
      <Wrapper>
        <div className='text-4xl font-semibold'>Our Mission</div>
        <div className='text-2xl'>
          Bring inspiration and innovation to every athlete{' '}
          <span className='italic'>in the world</span> If you have a body, you
          are an athlete
        </div>
        <div className='text-4xl  font-semibold mt-3'>Our Mission</div>
        <div className='text-2xl'>
          BRING INSPIRATION AND INNOVATION TO EVERY ATHLETE IN
          <span className='italic'>THE WORLD</span>
        </div>

        <div className='text-2xl mt-3'>
          We champion continual progress for athletes and sport by taking action
          to help athletes reach their potential. Every job at NIKE, Inc. is
          grounded in a team-first mindset, cultivating a culture of innovation
          and a shared purpose to leave an enduring impact.
        </div>
        <img src='placeholder.webp' className='aspect-[16/9] md:aspect-auto' />
      </Wrapper>
    </div>
  );
};

export default about;
