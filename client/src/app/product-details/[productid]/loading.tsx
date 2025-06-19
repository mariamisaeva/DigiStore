import SkeletonProductInfo from './_components/SkeletonProductInfo';

export default function Loading() {
  return (
    <div className="text-black px-10 py-8 md:px-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-5">
        <div className="w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse" />
        <SkeletonProductInfo />
      </div>
    </div>
  );
}
