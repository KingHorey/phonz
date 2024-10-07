import {
  UserIcon,
  ShoppingCartIcon,
  HeartIcon,
  SmartphoneIcon,
  SearchIcon,
  Menu,
} from "lucide-react";

/* import shadcn components */
import { Form, FormField, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

/* import react-router elements */
import { NavLink, Link } from "react-router-dom";

/* import type annoation and related imports for search functionality*/
import { z } from "zod";
import { searchParamsSchema } from "../utils/types.d";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const links = [
  {
    path: "/home",
    name: "Home",
  },
  {
    path: "/shop",
    name: "Shop",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/contact-us",
    name: "Contact Us",
  },
];

function Navbar() {
  const form = useForm<z.infer<typeof searchParamsSchema>>({
    resolver: zodResolver(searchParamsSchema),
  });

  function submitSearch(data: z.infer<typeof searchParamsSchema>) {
    console.log(data);
  }

  return (
    <header>
      <nav className="w-full flex justify-evenly mt-2 afacad-flux-400">
        <div className="flex items-center justify-center">
          <SmartphoneIcon size="20" />
          <Link
            to="/home"
            className="afacad-flux-700 text-xl tracking-wide"
            title="Go to homepage"
          >
            Phonz
          </Link>
        </div>
        <div className="w-2/5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitSearch)}
              className="p-3 relative"
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="search for product"
                          className="bg-slate-300/20 border border-slate-300/20 py-3 h-full focus-within:border-slate-300/40 focus:outline-none focus:ring-0 focus:ring-slate-300/40 focus:ring-offset-0 focus:ring-offset-slate-300/40 text-base"
                        />
                      </FormControl>
                      <SearchIcon
                        className="absolute top-5 right-5"
                        size={20}
                      />
                    </FormItem>
                  );
                }}
              ></FormField>
            </form>
          </Form>
        </div>
        <ul className="flex gap-x-6 items-center justify-center">
          {links.map(({ path, name }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-600 duration-200 transition-all"
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex gap-x-5 items-center justify-center">
          <Link to="/favorites">
            <HeartIcon size="20" className="cursor-pointer" />
          </Link>
          <Link to="/cart">
            <ShoppingCartIcon size="20" className="cursor-pointer" />
          </Link>
          <Link to="/profile">
            <UserIcon size="20" className="cursor-pointer" />
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
