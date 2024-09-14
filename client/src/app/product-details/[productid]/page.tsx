'use client';
import React, { useEffect } from 'react';
import { getProductById } from '../../_utils/productsAPI';
import SmallNavbar from '../../_Components/SmallNavbar';
import ProductImage from './_components/ProductImage';

function DetailsPage({ params }: any) {
  useEffect(() => {
    async function fetchProductById() {
      try {
        const res = await getProductById(params?.productId);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProductById();
  }, [params?.productId]);

  return (
    <div className="text-black px-10 py-8 md:px-28">
      <SmallNavbar />
      <div>
        <div>
          <ProductImage />
        </div>
        <div>
          <ProductInfo />
        </div>
      </div>

      <h1>Product Id: {params?.productId}</h1>
    </div>
  );
}

export default DetailsPage;
