const Loading = () => {
  return (
    <main className="w-full h-[600px] md:h-full flex flex-col justify-center items-center -mt-20 pr-6 md:pr-0 gap-5">
      <div className="w-12 h-12 border-[5px] border-t-orange rounded-full border-[#ffffff90] animate-spin" />
      <h1 className="font-outfitLight text-3xl">Loading...</h1>
    </main>
  );
};
export default Loading;
