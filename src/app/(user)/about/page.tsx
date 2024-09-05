import { MoveDownRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { products } from "@/constants";
import Blog from "@/components/Blog";
import SocialMedia from "@/components/SocialMedia";
import FAQs from "@/components/FAQs";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="py-0 lg:py-16 xl:py-20">
      {/* Hero  */}

      <div className="w-full h-[680px] relative flex justify-center items-center">
        <Image
          src="/About Hero.jpeg"
          alt="about"
          fill
          className="brightness-75 object-cover"
        />
        <div className="absolute text-white flex flex-col justify-center items-center gap-2 w-[98%] md:w-[80%] lg:w-[70%] text-center ">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
            Elevating Elegance: Discover the Story Behind Onyiisi
          </h1>
          <p className="md:w-[75%]">
            At Onyiisi, we believe in the transformative power of exquisite
            jewelry. Step into our world where craftsmanship meets creativity,
            and every piece tells a story. Learn more about our journey, our
            passion for luxury, and our commitment to personalized elegance.
          </p>
          <button className="text-white bg-[rgb(95,40,74)] py-2 px-5 rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 ">
            learn more
            <span>
              <MoveDownRight className="w-4 lg:w-5 h-4 lg:h-5 pt-1" />
            </span>
          </button>
        </div>
      </div>

      {/* Our Mission  */}

      <div className="text-center py-10 px-8 md:px-12 lg:px-40">
        <h1 className="text-3xl font-semibold uppercase py-3 md:py-5">
          our mission
        </h1>
        <p className="text-md md:text-lg">
          At Onyiisi, our mission is simple yet profound: to redefine luxury
          jewelry by infusing it with personal meaning and unparalleled
          craftsmanship. We strive to create timeless pieces that not only
          reflect individual style but also celebrate the unique stories and
          moments of our customers lives. With dedication to excellence and a
          commitment to authenticity, we aim to inspire confidence and elegance
          in every wearer, leaving a lasting impression that transcends trends
          and time
        </p>
      </div>

      {/* Definitions  */}

      <div className="flex flex-col md:flex-row h-[700px] md:h-[600px] lg:h-[640px] justify-center overflow-hidden mx-5 lg:mx-10 xl:mx-20 my-10">
        <div className="relative w-full md:w-[50%] h-[50%] md:h-full flex justify-center items-center">
          <Image
            src="/Sparkling Brilliance.jpeg"
            alt="Sparkling Brilliance"
            fill
            className="brightness-75 object-cover"
          />
          <div className="absolute text-center w-[80%]">
            <h1 className="uppercase text-2xl text-white font-semibold pb-1">
              Sparkling Brilliance
            </h1>
            <p className="text-md text-white">
              Elevate Your Style with Opulent Designs Crafted to Perfection.
              Indulge in the Essence of Luxury with Every Glittering Detail
            </p>
          </div>
        </div>
        <div className="relative w-full md:w-[50%] h-[50%] md:h-full justify-center items-center flex">
          <Image
            src="/Customized elegance.jpeg"
            alt="Customized Elegance"
            fill
            className="brightness-75 object-cover"
          />
          <div className="absolute text-center w-[80%]">
            <h1 className="uppercase text-2xl text-white font-semibold pb-1">
              Customized Elegance
            </h1>
            <p className="text-md text-white">
              Tailor Your Jewelry to Reflect Your Unique Elegance. Immerse
              Yourself in the World of Bespoke Luxury.
            </p>
          </div>
        </div>
      </div>

      {/* Gift Someone  */}

      <div className="flex flex-col md:flex-row h-[700px] md:h-[420px] lg:h-[492px] my-20">
        <div className="h-[40%] md:h-full md:w-[50%] bg-[rgb(217,199,211)] flex flex-col justify-center items-center">
          <div className="w-[75%] lg:w-[40%] text-center ">
            <h1 className="text-2xl font-semibold">Send a Gift to Someone</h1>
            <p className="text-sm">
              Sign-up to receive 10% off your next purchase. Plus hear about new
              arrivals and offers.
            </p>
          </div>
        </div>
        <div className="relative h-[60%] md:h-full md:w-[50%] overflow-hidden">
          <Image
            src="/Gift Someone.jpeg"
            alt="Gift Someone"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Product Catalogue  */}

      <div className="bg-[rgb(56,22,10)] text-white p-5 lg:px-10 xl:px-20 ">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold uppercase my-3 lg:my-5">
          {" "}
          product catalogue
        </h1>
        <div className="flex flex-col md:flex-row justify-between">
          {products.map((product, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="relative h-[400px] md:h-[250px] lg:h-[320px] xl:h-[450px] w-[380px] md:w-[230px] lg:w-[300px] xl:w-[420px] rounded-md overflow-hidden ">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="hover:scale-110 transition-all duration-300 object-cover"
                />
              </div>
              <p className="text-md font-medium">{product.title}</p>
              <Link href="/shop">
                <p className="uppercase text-md font-semibold hover:underline cursor-pointer text-orange-800 underline-offset-4">
                  view more
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ  */}

      <div className="relative flex justify-center items-center h-[750px] w-full my-20">
        <Image src="/FAQ bg.jpeg" alt="faq bg" fill className="object-cover" />
        <div className="absolute rounded-lg p-5 md:p-8 lg:p-16 bg-white md:w-[80%]">
          <h1 className="text-2xl md:text-4xl font-bold uppercase text-center">
            frequently asked questions
          </h1>
          {/* <Faq /> */}
          <FAQs />
        </div>
      </div>

      {/* Blog  */}
      <Blog />

      {/* Social Media  */}

      <SocialMedia />
    </div>
  );
};

export default AboutPage;
