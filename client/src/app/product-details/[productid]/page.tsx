import React from 'react';

function DetailsPage({ params }: any) {
  return (
    <div className="text-black">
      Hello in Details
      <h1>Product Id: {params.productId}</h1>
    </div>
  );
}

export default DetailsPage;
