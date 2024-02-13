import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ProductDetailsCarousel = ({ images }) => {
  return (
    <div className=' text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]'>
      <Carousel
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        thumbWidth={60}
        className='productCarousel'
      >
        {images?.map((img) => (
          <img
            src={img.attributes?.url}
            key={img.id}
            alt={img.attributes?.name}
          />
        ))}
        {/* <img src='/p1.png' alt='' />
        <img src='/p2.png' alt='' />
        <img src='/p3.png' alt='' />
        <img src='/p4.png' alt='' />
        <img src='/p5.png' alt='' />
        <img src='/p6.png' alt='' />
        <img src='/p7.png' alt='' /> */}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
