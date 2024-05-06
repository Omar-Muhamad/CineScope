import Heading from "@/components/ui/Heading";

const NotFound = () => {
  return (
    <main className="page-layout md:ml-32 pl-6 md:pl-0 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Heading as="h1" className="-mt-0 text-orange">404 Not Found</Heading>
      </div>
    </main>
  );
};
export default NotFound;
