const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 justify-items-center bg-white ">
      {children}
    </section>
  );
};

export default GridContainer;
