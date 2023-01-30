import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { BodySpray } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { client, urlFor } from "../../lib/client";

const BodySprayDetails = ({ bodySpray, bodySprays }) => {
  const { image, name, details, price } = bodySpray;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const handleBuyNow = () => {
    onAdd(bodySpray, qty);

    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(image && image[index])}
              alt=""
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                onMouseEnter={() => {
                  setIndex(i);
                }}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">#{price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              className="add-to-cart"
              type="button"
              onClick={() => onAdd(bodySpray, qty)}
            >
              Add to Cart
            </button>
            <button className="buy-now" type="button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {bodySprays.map((item) => (
              <BodySpray key={item._id} bodyspray={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "bodyspray"] {
        slug {
            current
        }
    }
    `;

  const bodySprays = await client.fetch(query);
  console.log(bodySprays)

  const paths = bodySprays.map((bodyspray) => ({
    params: {
      slug: bodyspray.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "bodyspray" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "bodyspray" && slug.current != '${slug}']`;

  const bodySpray = await client.fetch(query);
  const bodySprays = await client.fetch(productsQuery);

  console.log(bodySpray);

  return {
    props: {
      bodySprays,
      bodySpray,
    },
  };
};

export default BodySprayDetails;
