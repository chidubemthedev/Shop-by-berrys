import React from "react";
import { client } from "../../lib/client";
import { Mists } from "../../components";

const index = ({ mists }) => {
  return (
    <div>
      <div className="products-heading">
        <h2>Perfumes</h2>
        <p>Perfumes to make you stand out!</p>
      </div>
      <div className="products-container">
        {mists?.map((mist) => (
          <Mists key={mist._id} mist={mist} />
        ))}
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps = async () => {
  const query = '*[_type == "mists"] | order(name)';
  const mists = await client.fetch(query);

  return {
    props: {
      mists,
    },
  };
};
