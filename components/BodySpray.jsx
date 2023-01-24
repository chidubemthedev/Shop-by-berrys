import Link from "next/link";
import React from "react";

import { urlFor } from "../lib/client";

const BodySpray = ({ bodyspray: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`bodyspray/${slug.current}`}>
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

export default BodySpray;
