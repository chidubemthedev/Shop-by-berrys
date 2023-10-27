import React from "react";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <>
      <div className="hero-banner-container">
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
      </div>

      <div className="bg-red-500 flex flex-col md:flex-row justify-between items-center min-h-[500px] mt-[60px] rounded-[15px]">
        <div>
          <p className="text-[15px] md:text-[20px]">{heroBanner.smallText}</p>
          <h3 className="text-[2rem] md:text-[4rem]">{heroBanner.midText}</h3>
          <h1>{heroBanner.largeText1}</h1>
          <div>
            <Link href={`product/${heroBanner.product}`}>
              <button type="button">{heroBanner.buttonText}</button>
            </Link>
          </div>
        </div>

        <div className="bg-red-300">
          <img
            // className="hero-banner-image"
            src={urlFor(heroBanner.image)}
            alt="Perfume"
          />
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
