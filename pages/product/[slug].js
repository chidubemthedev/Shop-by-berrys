import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product, SeeMore } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { client, urlFor } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container ml-[20px] mt-[120px]">
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
          <h1 className="font-bold text-[40px]">{name}</h1>
          <div className="reviews">
            <div className="flex">
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
            <p className="quantity-desc flex items-center">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              className="add-to-cart"
              type="button"
              onClick={() => onAdd(product, qty)}
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
            {products.map((item) => (
              <SeeMore key={item._id} more={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product" && slug.current != '${slug}']`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: {
      products,
      product,
    },
  };
};

export default ProductDetails;
