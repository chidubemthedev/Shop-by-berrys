import React from "react";
import { client } from "../lib/client";
import {
  BodySpray,
  Product,
  FooterBanner,
  HeroBanner,
  Perfumes,
} from "../components";
import Link from "next/link";

const Home = ({ products, bannerData, bodySprays, perfumes }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="">
        <div className="products-heading">
          <h2>Best selling products</h2>
          <p>Scents of many variations</p>
        </div>
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <div className="flex justify-center">
          <button className="btn">See More Best Sellers</button>
        </div>
      </div>

      <div>
        <div className="products-heading">
          <h2>Body Sprays</h2>
          <p>Sweet fregrances in a compact container</p>
        </div>
        <div className="products-container">
          {bodySprays?.map((bodyspray) => (
            <BodySpray key={bodyspray._id} bodyspray={bodyspray} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            className="btn flex items-center justify-center"
            href="/bodyspray"
          >
            <button>See more sprays</button>
          </Link>
        </div>
      </div>

      <div>
        <div className="products-heading">
          <h2>Perfumes</h2>
          <p>Perfumes to make you stand out!</p>
        </div>
        <div className="products-container">
          {perfumes?.map((perfume) => (
            <Perfumes key={perfume._id} perfume={perfume} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            className="btn flex items-center justify-center"
            href="/perfume"
          >
            <button>See more perfumes</button>
          </Link>
        </div>
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"] | order(name) [0...6]';
  const products = await client.fetch(query);

  const body = '*[_type == "bodyspray"] | order(name) [0...6]';
  const bodySprays = await client.fetch(body);

  const perfume = '*[_type == "perfumes"] | order(name) [0...6]';
  const perfumes = await client.fetch(perfume);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
      bodySprays,
      perfumes,
    },
  };
};

export default Home;
