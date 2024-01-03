import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  return (
    <>
      <div className="footer-banner-container hidden lg:block">
        <div className="banner-desc">
          <div className="left">
            <p>{discount}</p>
            <h3>{largeText1}</h3>
            <h3>{largeText2}</h3>
            <p>{saleTime}</p>
          </div>
          <div className="right">
            <p>{smallText}</p>
            <h3>{midText}</h3>
            <p>{desc}</p>
            <Link href={`product/${product}`}>
              <button type="button">{buttonText}</button>
            </Link>
          </div>

          <img className="footer-banner-image" src={urlFor(image)} alt="" />
        </div>
      </div>

      <div className="bg-[#f02d34] rounded-[15px] leading-[1] py-[40px] mt-[100px] block lg:hidden">
        <div className="flex justify-between px-[20px] text-white">
          <div>
            <p>{discount}</p>
            <h3 className="font-medium text-[40px]">{largeText1}</h3>
            <h3 className="font-medium text-[40px]">{largeText2}</h3>
            <p>{saleTime}</p>
          </div>

          <div>
            <p className="mt-1">{smallText}</p>
            <h3 className="mt-1">{midText}</h3>
            <p className="mt-1">{desc}</p>
            <Link href={`product/${product}`}>
              <button
                type="button"
                className="rounded-[15px] px-[16px] py-[14px] bg-white text-[#f02d34] mt-[20px] md:mt-[40px] text-[18px] font-medium"
              >
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBanner;
