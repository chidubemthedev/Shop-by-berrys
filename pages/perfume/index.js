import React from "react";
import { client } from "../../lib/client";
import { Perfumes } from "../../components";

const index = ({ perfumes }) => {
  return (
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
    </div>
  );
};

export default index;

export const getServerSideProps = async () => {
  const query = '*[_type == "perfumes"] | order(name)';
  const perfumes = await client.fetch(query);

  return {
    props: {
      perfumes,
    },
  };
};
