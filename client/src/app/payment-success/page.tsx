import React from 'react';

function page() {
  return (
    <div
      className="flex items-center justify-center min-h-screen p-20"
      style={{ marginTop: '-170px' }}
    >
      <section className="rounded-3xl shadow-2xl">
        <div className="p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            Successful Payment
          </p>
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <h2 className="mt-6 text-3xl font-bold" style={{ color: 'black' }}>
            Thanks for your purchase, we're getting it ready!
          </h2>

          <a
            className="mt-8 inline-block w-2/3 sm:w-2/4 rounded-full bg-blue-600 py-4 text-sm font-bold text-white shadow-xl"
            href="/"
          >
            Home Page
          </a>
        </div>
      </section>
    </div>
  );
}

export default page;
