import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const { pathname } = useLocation();
  const splitNames = pathname.split("/").filter((name) => name !== "");

  return (
    <nav className="flex gap-3 text-base p" aria-label="breadcrumb">
      <Link to="/" className="">
        Home
      </Link>
      <span>&gt;</span>
      {splitNames.map((name, index) => {
        const url = `/${splitNames.slice(0, index + 1).join("/")}`;
        return (
          <>
            <Link
              key={name}
              to={url}
              className="text-base poppins-regular text-black/70 hover:text-black duration-200 transition-all"
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
            {index !== splitNames.length - 1 && <span>&gt;</span>}
          </>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
