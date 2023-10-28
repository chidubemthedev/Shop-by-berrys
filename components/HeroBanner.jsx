import React from "react";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <>
      {/* <div className="hero-banner-container">
        <div>
          <p className="beats-solo">{heroBanner.smallText}</p>
          <h3>{heroBanner.midText}</h3>
          <h1>{heroBanner.largeText1}</h1>
          <img
            className="hero-banner-image"
            src={urlFor(heroBanner.image)}
            alt="Perfume"
          />
          <div>
            <Link href={`product/${heroBanner.product}`}>
              <button type="button">{heroBanner.buttonText}</button>
            </Link>
            <div className="desc">
              <h5>Description</h5>
              <p>{heroBanner.desc}</p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="for-hero-tw flex flex-col md:flex-row md:gap-[30px] md:items-center min-h-[500px] mt-[65px] rounded-[15px] leading-[0.9]">
        <div className="pl-[15px] md:pl-[40px] pt-[90px]">
          <p className="text-[15px] md:text-[20px] ml-[10px]">
            {heroBanner.smallText}
          </p>
          <h3 className="text-[2rem] md:text-[4rem] mt-[4px] ml-[5px]">
            {heroBanner.midText}
          </h3>
          <h1 className="text-white uppercase font-bold text-[5rem] md:text-[10rem]">
            {heroBanner.largeText1}
          </h1>
          <div>
            <Link href={`product/${heroBanner.product}`}>
              <button
                className="rounded-[15px] px-[16px] py-[10px] bg-[#f02d34] text-white mt-[20px] md:mt-[40px] text-[18px] font-medium"
                type="button"
              >
                {heroBanner.buttonText}
              </button>
            </Link>
          </div>
        </div>

        <div className="">
          <img
            // className="hero-banner-image"
            src={urlFor(heroBanner.image)}
            alt="Perfume"
          />
        </div>

        <div className="pl-[15px] py-[20px] flex flex-col justify-end md:h-[500px]">
          <div className="flex flex-col">
            <h6 className="mb-[12px] font-bold text-[16px] md:self-end text-[#deb887] pr-[50px]">
              Description
            </h6>
            <p className="font-thin text-[#f5f5f5]">{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
