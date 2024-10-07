import React from "react";

function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="w-[90%] mx-auto">{children}</div>;
}

export default PageContainer;
