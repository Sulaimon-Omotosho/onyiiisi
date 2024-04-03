import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { addToCart } from "@/redux/cart-slice";
import { useDispatch } from "react-redux";
import { detailsImg } from "@/constants";
import { ChevronLeft, ChevronRight, Heart, Share2, Star } from "lucide-react";
import { ProductProps } from "@/lib/types";
import { productById, urlFor } from "@/lib/sanity-client";
import DetailsDescription from "@/components/DetailsDescription";
import RelatedProducts from "@/components/RelatedProducts";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";

const SingleProductPage = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
    if (products.length > 0) {
      const selectedProduct = products[0];
      const cartItem = {
        _id: selectedProduct._id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        categoryName: selectedProduct.categoryName,
        brand: selectedProduct.brand,
        quantity: quantity,
      };
      console.log(cartItem);
      dispatch(addToCart(cartItem));
    }
  };

  useEffect(() => {
    if (typeof id === "string") {
      const fetchProduct = async () => {
        try {
          const product = await productById(id);
          setProduct(product);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching product:", err);
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  // console.log(product)

  // Carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToImg = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Price
  const [total, setTotal] = useState(73.4);
  const [quantity, setQuantity] = useState(1);

  // useEffect(() => {
  //   setTotal(quantity * 73.4)
  // }, [quantity])

  // Descriptions

  return (
    <div className="py-5 lg:py-20">
      {loading ? (
        <Loading />
      ) : (
        <div className=" px-5 lg:px-16 xl:px-28">
          {/* Navigation */}
          <div className="flex py-10 justify-between items-center">
            <div className="flex gap-1">
              <Link className="text-gray-400 hover:text-gray-800" href="/">
                Home |{" "}
              </Link>
              <Link className="text-gray-400 hover:text-gray-800" href="/shop">
                Shop |{" "}
              </Link>
              <Link
                className="text-gray-400 hover:text-gray-800"
                href="/shop/earrings"
              >
                Earrings |{" "}
              </Link>
              <p className="font-semibold"> Details</p>
            </div>
          </div>

          {/* Image and details  */}

          <div className="flex flex-col md:flex-row gap-10 flex-grow">
            {/* Image Carousel  */}
            <div className="flex-1">
              {product?.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative h-[350px] lg:h-[450px] xl:h-[550px] w-[350px] lg:w-[450px] xl:w-[550px] transition duration-500 ${
                    idx === currentIndex ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  <Image
                    src={urlFor(img).url()}
                    alt="Earring"
                    fill
                    className={`absolute object-cover rounded-md ${img.trans}`}
                  />
                </div>
              ))}
              <div className="relative py-6 flex gap-4 justify-center w-[350px] lg:w-[450px] xl:w-[550px]">
                {product?.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => goToImg(idx)}
                    className="relative h-20 w-20 hover:scale-110 hover:shadow-md ease-in-out transition duration-500 cursor-pointer "
                  >
                    <Image
                      src={urlFor(img).url()}
                      alt="Earrings"
                      fill
                      className={`rounded-md object-cover ${img.trans}`}
                    />
                  </div>
                ))}
                <div className="hidden lg:flex justify-center items-center">
                  <ChevronLeft className="absolute left-0 text-gray-600 hover:scale-150 transition-all duration-500 cursor-pointer" />
                  <ChevronRight className="absolute right-0 text-gray-600 hover:scale-150 transition-all duration-500 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Details  */}
            <div className="flex-1 flex flex-col gap-8 justify-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl md:text-4xl font-semibold capitalize">
                  {product?.title}
                </h2>

                <p className="text-orange-800 text-xl md:text-2xl font-semibold">
                  {/* ${total.toFixed(2)} */}${product?.price}
                </p>
                <p className="text-gray-500 font-thin text-sm md:text-md capitalize">
                  {product?.gram} grams
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-gray-500 text-xs md:text-sm">
                  {product?.description}
                </p>
                <div className="flex gap-4 py-2">
                  <div className="flex gap-1">
                    {(() => {
                      const stars = [];
                      for (let i = 0; i < (product?.ratings || 0); i++) {
                        stars.push(
                          <Star
                            key={`star_${i}`}
                            style={{ fill: "rgb(244,206,80)" }}
                            color="rgb(244,206,80)"
                          />
                        );
                      }
                      return stars;
                    })()}

                    {/* <Star
                      style={{ fill: 'rgb(244,206,80)' }}
                      color='rgb(244,206,80)'
                    />
                    <Star
                      style={{ fill: 'rgb(244,206,80)' }}
                      color='rgb(244,206,80)'
                    />
                    <Star
                      style={{ fill: 'rgb(244,206,80)' }}
                      color='rgb(244,206,80)'
                    />
                    <Star
                      style={{ fill: 'rgb(244,206,80)' }}
                      color='rgb(244,206,80)'
                    /> */}
                  </div>
                  <p className="text-gray-800">(356 Reviews)</p>
                  <Heart className="cursor-pointer" />
                  <Share2 className="cursor-pointer" />
                </div>
                <hr className="border-b-2 border-gray-600" />
              </div>
              <div className="flex flex-col gap-7">
                <div className="flex justify-between">
                  <p className="text-lg md:text-2xl capitalize">Quantity</p>
                  <div className="text-2xl flex">
                    <button
                      onClick={() =>
                        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                    >
                      -
                    </button>{" "}
                    <p className="w-10 text-center">{quantity}</p>{" "}
                    <button
                      onClick={() =>
                        setQuantity((next) => (next < 10 ? next + 1 : 10))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="text-white bg-[rgb(95,40,74)] py-2 lg:py-5 mx-5 rounded-full uppercase font-thin flex items-center justify-center gap-1 lg:gap-2 "
                >
                  add to cart
                </button>
                <p className="capitalize cursor-pointer underline underline-offset-2 md:text-2xl font-semibold text-center">
                  write a review
                </p>
              </div>
            </div>
          </div>
          {/* Description Reviews Specification  */}
          <DetailsDescription />
        </div>
      )}
      {/* Related Products  */}
      <RelatedProducts />
    </div>
  );
};

export default SingleProductPage;
