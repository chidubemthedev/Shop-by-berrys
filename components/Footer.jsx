import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from "react-icons/ai";
import logo from "../assets/LogoTrans.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <Image src={logo} alt="logo" width={100} height={50} />
      <p>2023 Berry&apos;s Fragrances All rights reserved</p>
      <p className="icons">
        <Link href="https://www.instagram.com/berrysfragrances" target="_blank">
          <AiFillInstagram />
        </Link>
        <Link
          href="https://twitter.com/d_fragranceplug?t=Qv3KDoA3J-FCrAhtmrtkcA&s=09"
          target="_blank"
        >
          <AiOutlineTwitter />
        </Link>
        <Link
          href="https://www.facebook.com/Fragrancepluginbenin/"
          target="_blank"
        >
          <AiFillFacebook />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
