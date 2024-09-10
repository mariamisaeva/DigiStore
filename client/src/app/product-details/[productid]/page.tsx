'use client';
import React, { useEffect } from 'react';
import { getProductById } from '../../_utils/productsAPI';

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
    <div className="text-black">
      Hello in Details
      <h1>Product Id: {params?.productId}</h1>
    </div>
  );
}

export default DetailsPage;
