'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

function DetailsPage(/*{ params }: any*/) {
  //   const path: any = usePathname();
  const router = useRouter();

  const [productDetails, setProductDetails] = useState<Product | null>(null);

  const [similarProductList, setSimilarProductList] = useState<
    Product[] | null
  >(null);

  useEffect(() => {
    if (!router.isReady) return; //if router is fully mounted and ready

    const { productId } = router.query; //now access productId safely

    if (!productId || Array.isArray(productId)) {
      console.error('Invalid Product ID!');
      return;
    }

    async function fetchProductById() {
      //   if (!productId) {
      //     /*params?.*/
      //     console.error('Product ID is undefined!');
      //     return;
      //   }

      try {
        const res = await getProductById(Number(productId)); //params?.productId
        // console.log(res.data.data);
        setProductDetails(res.data.data);
        // getProductByCategory(res.data.data); //func call
      } catch (err) {
        console.error(err);
      }
    }

    fetchProductById();
  }, [productId, router.isReady]);

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
      <SmallNavbar path={usePathname()} />

      <div className="grid grid-cols-1 sm:grid-cols-2 flex-col mt-10 justify-around gap-5 sm:gap:0">
        {productDetails ? (
          <ProductImage product={productDetails} />
        ) : (
          <h4>Loading ... </h4>
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
