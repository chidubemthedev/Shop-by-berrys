import Link from "next/link";
import React from "react";

import { urlFor } from "../lib/client";

const Mists = ({ mist: { image, name, slug, price } }) => {
  return (
    <div className="item">
      <Link href={`mist/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            alt=""
            width={250}
            height={250}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">#{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Mists;
