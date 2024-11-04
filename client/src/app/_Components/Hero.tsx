import React from 'react';

function Hero() {
  return (
    <div>
      <section className="relative bg-[url(https://res.cloudinary.com/dm4vls99s/image/upload/v1728992758/DigitalStore-Project/DALL_E_2024-10-15_13.14.37_-_A_light_blue_background_for_a_digital_products_website_designed_to_be_versatile_for_items_like_courses_e-books_and_software._The_background_feature_xumxd4.webp)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-1">
          <div className="max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold text-blue-500 sm:text-5xl">
              Unlock Your Potential
              <strong className="block font-extrabold text-[#001d88]">
                {' '}
                With Top-Quality Products & Courses{' '}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg text-blue-500 sm:text-xl/relaxed">
              Discover expertly curated products and online courses designed to
              elevate your skills, boost your productivity, and transform your
              life. Start your journey to success today!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="/all-products"
                className="block w-full rounded bg-[#001d88] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#6EACDA]  focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                SHOP NOW
              </a>

              <a
                href="#featured-products"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-[#001d88] shadow hover:text-blue-500 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                EXPLORE
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
