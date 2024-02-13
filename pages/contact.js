import Wrapper from '@/components/Wrapper';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
const contact = () => {
  return (
    <Wrapper className='mt-5  align-middle justify-center h-[400px] flex'>
      <a href='https://github.com/shinotaur' target='_blank'>
        <h1 className='font-bold text-3xl mt-5'>Contact Us</h1>
        <FaGithub size={50} className='ms-[50px] mt-4 ' />
      </a>
    </Wrapper>
  );
};

export default contact;
