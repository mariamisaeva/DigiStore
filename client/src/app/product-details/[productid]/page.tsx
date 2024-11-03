'use client';
import React, { useEffect, useState } from 'react';
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
import { usePathname } from 'next/navigation';
import SkeletonProductInfo from './_components/SkeletonProductInfo';

type paramsType = {
  productid: string;
};

function DetailsPage({ params }: { params: paramsType }) {
  const path: any = usePathname();
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  const [similarProductList, setSimilarProductList] = useState<
    Product[] | null
  >(null);

  //   console.log('Params: ', params);
  //   let productId = params?.productId;
  //   productId = Number(productId);
  const productId = Number(params?.productid);

  useEffect(() => {
    async function fetchProductById() {
      //   console.log('PRODUCT_ID: ', productId);
      //   console.log('PARAMS.PRODUCTID: ', params.productid);
      //   console.log('PARAMS: ', params);

      if (!productId) {
        console.error('Product ID is undefined!');
        return;
      }

      try {
        const res = await getProductById(productId);
        // console.log(res.data.data);
        setProductDetails(res.data.data);
        // getProductByCategory(res.data.data); //func call
      } catch (err) {
        console.error(err);
      }
    }

    fetchProductById();
  }, [productId]);

  useEffect(() => {
    if (productDetails) {
      fetchProductByCategory(productDetails);
    }
  }, [productDetails]);

  async function fetchProductByCategory(product: Product) {
    try {
      const res: AxiosResponse<StrapiResponse<Product[]>> =
        await getProductByCategory(product?.attributes?.category);
      //   console.log('Here is the Response: ', res?.data?.data);
      setSimilarProductList(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="text-black px-10 py-8 md:px-28">
      <SmallNavbar path={path} />

      <div className="grid grid-cols-1 sm:grid-cols-2 flex-col mt-10 justify-around gap-5 sm:gap:0">
        {productDetails ? (
          <ProductImage product={productDetails} />
        ) : (
          <SkeletonProductInfo />
        )}
        {productDetails && <ProductInfo product={productDetails} />}
      </div>
      {/* <h1>Product Id: {params?.productId}</h1> */}

      <div>
        <h2 className="text-xl font-bold text-center mt-24 mb-5">
          Similar Products
        </h2>
        <ProductList productList={similarProductList || []} />
      </div>
    </div>
  );
}

export default DetailsPage;
