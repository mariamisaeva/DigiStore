'use client';
import React, { useEffect, useState } from 'react';
import { getProductById, Product } from '../../_utils/productsAPI';
import SmallNavbar from '../../_Components/SmallNavbar';
import ProductImage from './_components/ProductImage';
import ProductInfo from './_components/ProductInfo';

function DetailsPage({ params }: any) {
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProductById() {
      try {
        const res = await getProductById(params?.productId);
        console.log(res.data.data);
        setProductDetails(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProductById();
  }, [params?.productId]);

  return (
    <div className="text-black px-10 py-8 md:px-28">
      <SmallNavbar />
      <div className="flex md:flex-row flex-col mt-10 justify-around">
        {/*add marginTop flex(bigScreen) flex-col(smallScreen) justify around for space arounnd them*/}
        {productDetails ? (
          <ProductImage product={productDetails} />
        ) : (
          <h4>Loading Image ... </h4>
        )}
        <ProductInfo />
      </div>

      {/* <h1>Product Id: {params?.productId}</h1> */}
    </div>
  );
}

export default DetailsPage;
