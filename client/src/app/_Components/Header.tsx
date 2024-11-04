'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import { RiShoppingCartLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import { useCart } from '../_context/cartContext';
import { getCartPerUser, CartItem } from '../_utils/cartAPI';
import Cart from './Cart';
import Link from 'next/link';

function Header() {
  const { user } = useUser();
  const pathname = usePathname();

  const [showHeader, setShowHeader] = useState(true);

  const { cart, setCart } = useCart();

  const [toggleCart, setToggleCart] = useState(false);

  const fetchUserCart = useCallback(
    async (email: string) => {
      try {
        const res = await getCartPerUser(email);
        res?.data?.data.forEach((item: CartItem) => {
          setCart((prevCart) => [
            ...prevCart,
            {
              id: item?.id,
              product: item?.attributes?.products?.data[0],
            },
          ]);
        });
      } catch (err) {
        console.error('ERROR: ', err);
      }
    },
    [setCart],
  );

  useEffect(() => {
    const hideHeaderRoutes = ['/sign-in', '/sign-up'];

    const shouldHideHeader = hideHeaderRoutes.some((route) =>
      pathname.includes(route),
    );

    setShowHeader(!shouldHideHeader);
  }, [pathname]);

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress || '';
    if (user) {
      fetchUserCart(email);
    }
  }, [user, fetchUserCart]);

  return (
    showHeader && (
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          {/*shadow-md*/}
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={170}
              height={170}
              className="cursor-pointer"
            />
          </Link>
          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    HOME
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/all-products"
                  >
                    {' '}
                    PRODUCTS{' '}
                  </Link>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {' '}
                    SERVICES{' '}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {' '}
                    CONTACT US{' '}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {' '}
                    ABOUT{' '}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6EACDA]"
                    href="/sign-in"
                  >
                    Login
                  </a>

                  <a
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-700 transition hover:text-blue-600/75 sm:block"
                    href="/sign-up"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <h2
                    color="black"
                    className="flex gap-2 cursor-pointer"
                    style={{ color: 'black' }}
                  >
                    <RiShoppingCartLine
                      onClick={() => setToggleCart(!toggleCart)}
                      color="black"
                      style={{
                        padding: 0,
                        fontSize: '22px',
                      }}
                    />
                    {cart?.length}
                  </h2>
                  <UserButton />
                  {toggleCart && <Cart />}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    )
  );
}

export default Header;
