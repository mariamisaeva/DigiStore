import React from 'react';
import {
  getProductById,
  Product,
  getProductByCategory,
  StrapiResponse,
} from '../../_utils/productsAPI';
import SmallNavbar from '../../_Components/SmallNavbar';
import ProductImage from './_components/ProductImage';
import ProductInfo from './_components/ProductInfo';
import { AxiosResponse } from 'axios';
import ProductList from '../../_Components/ProductList';
import { notFound } from 'next/navigation';

type paramsType = {
  productid: string;
};

export default async function DetailsPage({ params }: { params: paramsType }) {
  const productId = Number(params?.productid);

  try {
    const productRes: AxiosResponse<StrapiResponse<Product>> = await getProductById(productId);
    const productDetails = productRes.data.data;

    if (!productDetails) {
      notFound();
    }

    const categoryRes: AxiosResponse<StrapiResponse<Product[]>> = await getProductByCategory(
      productDetails.attributes.category,
    );
    const similarProductList = categoryRes.data.data;

    const path = `/product-details/${productId}`;

    return (
      <div className="text-black px-10 py-8 md:px-28">
        <SmallNavbar path={path} />

        <div className="grid grid-cols-1 sm:grid-cols-2 flex-col mt-10 justify-around gap-5 sm:gap:0">
          <ProductImage product={productDetails} />
          <ProductInfo product={productDetails} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-center mt-24 mb-5">Similar Products</h2>
          <ProductList productList={similarProductList || []} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product details', error);
    notFound();
  }
}
