import React from "react";
import { client } from "../../lib/client";
import { BodySpray } from "../../components";

const index = ({ bodySprays }) => {
  return (
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
    </div>
  );
};

export default index;

export const getServerSideProps = async () => {
  const query = '*[_type == "bodyspray"] | order(name)';
  const bodySprays = await client.fetch(query);

  return {
    props: {
      bodySprays,
    },
  };
};
