import Heading from "./Heading";

const Loading = () => {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-5 -mt-20">
      <div className="w-12 h-12 border-[5px] border-t-orange rounded-full border-[#ffffff90] animate-spin" />
      <Heading as="h1" className="">
        Loading..
      </Heading>
    </main>
  );
};
export default Loading;
