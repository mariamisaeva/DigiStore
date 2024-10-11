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
