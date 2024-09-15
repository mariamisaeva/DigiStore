import React from 'react';

function SkeletonProductInfo() {
  return (
    <div>
      <div className="w-[300px] h-[30px]  bg-slate-100 animate-pulse rounded-lg"></div>
      <br />
      <div className="w-[100px] h-[20px]  bg-slate-100 animate-pulse rounded-lg"></div>
      <br />
      <div className="w-[400px] h-[20px]  bg-slate-100 animate-pulse rounded-lg"></div>
      <br />
      <div className="w-[400px] h-[20px]  bg-slate-100 animate-pulse rounded-lg"></div>
      <br />
      <div className="w-[400px] h-[20px]  bg-slate-100 animate-pulse rounded-lg"></div>
      <br />
      <div className="w-[200px] h-[20px]  bg-slate-100 animate-pulse rounded-lg"></div>
      <br />
      <div className="w-[400px] h-[30px]  bg-slate-100 animate-pulse rounded-lg"></div>
    </div>
  );
}

export default SkeletonProductInfo;
