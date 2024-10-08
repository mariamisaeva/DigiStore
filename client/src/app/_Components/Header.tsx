'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import { RiShoppingCartLine } from 'react-icons/ri';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../_context/cartContext';
import { getCartPerUser } from '../_utils/cartAPI';

function Header() {
  const { user } = useUser();
  const pathname = usePathname();

  const [showHeader, setShowHeader] = useState(true);
  const { cart /*, setCart*/ } = useCart();

  const fetchUserCart = async (email: string) => {
    try {
      const res = await getCartPerUser(email);
      console.log('Cart Response: ', res?.data?.data);
    } catch (err) {
      console.error('ERROR: ', err);
    }
  };

  //   const getUserCart = async () => {
  //     const email = user?.primaryEmailAddress?.emailAddress || '';
  //     try {
  //       const res = await getCartPerUser(email);
  //       console.log('Cart Response: ', res);
  //     } catch (err) {
  //       console.error('ERROR: ', err);
  //     }
  //   };

  useEffect(() => {
    // const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const hideHeaderRoutes = ['/sign-in', '/sign-up'];

    const shouldHideHeader = hideHeaderRoutes.some((route) =>
      pathname.includes(route),
    );

    setShowHeader(!shouldHideHeader);
  }, [pathname]);

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress || '';
    user && fetchUserCart(email);
  }, [user]);

  //   console.log(window.location.href);
  //   const [loggedIn, setLoggedIn] = useState(false);
  //   useEffect(() => {
  //     setLoggedIn(window.location.href.toString().includes('sign-in'));
  //   }, []);

  return (
    showHeader && (
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          {/*shadow-md*/}
          <Image src="/logo.svg" alt="logo" width={170} height={170} />
          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {' '}
                    Careers{' '}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {' '}
                    History{' '}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {' '}
                    Services{' '}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {' '}
                    Projects{' '}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {' '}
                    Blog{' '}
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
                      color="black"
                      style={{
                        padding: 0,
                        fontSize: '22px',
                      }}
                    />
                    {cart?.length}
                  </h2>
                  <UserButton />s
                </div>
              )}

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
}

export default Header;
