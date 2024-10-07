import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const { pathname } = useLocation();
  const splitNames = pathname.split("/").filter((name) => name !== "");

  return (
    <div className="flex gap-3 text-base poppins-regular text-black/70 hover:text-black duration-200 transition-all">
      <Link to="/" className="">
        Home
      </Link>
      <span>&gt;</span>
      {splitNames.map((name, index) => {
        const url = `/${splitNames.slice(0, index + 1).join("/")}`;
        return (
          <>
            <Link key={name} to={url} className="">
              {name}
            </Link>
            {index !== splitNames.length - 1 && <span>&gt;</span>}
          </>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
