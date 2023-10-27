import React from "react";
import { client } from "../lib/client";
import { BodySpray, Product, FooterBanner, HeroBanner } from "../components";
import Link from "next/link";

const Home = ({ products, bannerData, bodySprays }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log(bannerData)} */}
      <div>
        <div className="products-heading">
          <h2>Best selling products</h2>
          <p>Scents of many variations</p>
        </div>
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <div className="products-container">
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
          {/* <button className="btn">See More Sprays</button> */}
        </div>
        <Link href="/bodyspray">
          <button className="btn">See More Sprays</button>
        </Link>
      </div>

      {/* <div>
        <h2>Featured products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div>
        <h2>Latest products</h2>
        <p>Speakers of many variations</p>
      </div> */}
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"] | order(name) [0...6]';
  const products = await client.fetch(query);

  const body = '*[_type == "bodyspray"] | order(name) [0...6]';
  const bodySprays = await client.fetch(body);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
      bodySprays,
    },
  };
};

export default Home;
