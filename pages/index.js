import React from "react";
import { client } from "../lib/client";
import { BodySpray, Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData, bodySprays }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData)}
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Scents of many variations</p>
      </div>
      {/* <div>
        <h2>Featured products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div>
        <h2>Latest products</h2>
        <p>Speakers of many variations</p>
      </div> */}

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <div className="products-heading">
        <h2>Body Spray products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {bodySprays?.map((bodyspray) => (
          <BodySpray key={bodyspray._id} bodyspray={bodyspray} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const body = '*[_type == "bodyspray"]';
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
