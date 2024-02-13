import ProductDetailsCarousel from '@/components/ProductDetailsCarousel';
import RelatedProducts from '@/components/RelatedProducts';
import Wrapper from '@/components/Wrapper';
import React, { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { fetchDataFromAPI } from '@/utils/api';
import { getDiscountPricePercentage } from '@/utils/helper';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import remarkGfm from 'remark-gfm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { addToCart } from '@/store/cartSlice';

const ProductDetails = ({ product, products }) => {
  const p = product?.data?.[0]?.attributes;
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const notify = () => {
    toast.success('Success! Added to cart.', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  return (
    <div className='w-full md:py-20'>
      <ToastContainer />
      <Wrapper>
        <div className=' flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]'>
          {/* left column */}
          <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0 '>
            <ProductDetailsCarousel images={p?.image?.data} />
          </div>

          {/* right column */}
          <div className=' flex-[1] py-3 '>
            {/* Product Title */}
            <div className='text-[34px] font-semibold mb-2 leading-tight'>
              {p?.name}
            </div>

            {/* Product Subtitle */}
            <div className='text-lg font-semibold mb-5'>{p?.subtitle}</div>

            {/* Product price */}
            <div className='flex items-center'>
              <p className='mr-2 text-lg font-semibold'>
                MRP : &#8377;{p.price}
              </p>
              {p.original_price && (
                <>
                  <p className='text-base  font-medium line-through'>
                    &#8377;{p.original_price}
                  </p>
                  <p className='ml-auto text-base font-medium text-green-500'>
                    {getDiscountPricePercentage(p.original_price, p.price)}% off
                  </p>
                </>
              )}
            </div>
            <div className='tex-md font-medium text-black/[0.5]'>
              incl. taxes
            </div>
            <div className='text-md font-medium text-black/[0.5] mb-20'>
              {`(Also includes all applicable duties)`}
            </div>

            {/* product size range start */}
            <div className='mb-10'>
              {/* heading start */}
              <div className='flex justify-between mb-2'>
                <div className='text-md font-semibold'>Select size</div>
                <div className='text-md font-medium text-black/[0.5] cursor-pointer'>
                  Select Guide
                </div>
              </div>
              {/* heading end */}

              {/* size start */}
              <div className='grid grid-cols-2 gap-2' id='sizesGrid'>
                {p?.size?.data?.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md cursor-not-allowed text-center py-3 font-medium ${
                      item?.enabled
                        ? 'hover:border-black cursor-pointer'
                        : 'cursor-not-allowed bg-black/[0.1] opacity-[50%]'
                    } ${selectedSize === item?.size ? 'border-black' : ''} `}
                    onClick={() => {
                      setSelectedSize(item?.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>
              {/* size end */}

              {/* show error start */}
              {showError && (
                <div className='text-red-600 mt-1'>Size selection required</div>
              )}
              {/* show error start */}
            </div>
            {/* product size range end */}

            {/* add to cart button */}
            <button
              className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75'
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document
                    .getElementById('sizesGrid')
                    .scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
                dispatch(
                  addToCart({
                    ...product?.data?.[0],
                    selectedSize,
                    oneQuantityPrice: p?.price,
                  })
                );
                notify();
              }}
            >
              Add to cart
            </button>
            {/* add to cart button end */}

            {/* wishlist button end*/}
            <button className='w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10'>
              Wishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* wishlist button end*/}

            <div>
              <div className='text-lg font-bold mb-5'>Product Details</div>
              <div className='markdown rich-text text-md mb-5'>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {/* {p?.description?.children?.text} */}
                </ReactMarkdown>
                "You can't help but look cool in low tops that meld high-end
                craft with high-tech features. Airy Ripstop and soft, synthetic
                suede pair with a smooth interior. The result? Classic low-top
                looks and the premium comfort you expect from Jordan Brand."
                <br />
                <strong>Colour Shown:</strong> Sesame/Chambray
                <br />
                <strong>Style:</strong> DN2647-200
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>

        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromAPI('/api/products?populate=*');

  const paths = products?.data?.map((p) => ({
    params: {
      slug: p?.attributes?.slug,
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const products = await fetchDataFromAPI(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );
  const product = await fetchDataFromAPI(
    `/api/products?populate=*&filters[slug][$eq]=${slug} `
  );
  return {
    props: { product, products },
  };
}
