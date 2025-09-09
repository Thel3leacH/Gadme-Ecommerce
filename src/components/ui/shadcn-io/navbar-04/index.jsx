"use client";
import * as React from "react";
import { useEffect, useState, useRef, useId, useMemo } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import gadmeLogo from "/src/assets/gadme-logo.svg";
import { LoginForm } from "../../../LoginForm";

// Simple logo component for the navbar
const Logo = () => {
  return <img src={gadmeLogo} alt="Logo" className="h-10 w-10" />;
};

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Default navigation links
const defaultNavigationLinks = [
  { href: "#", label: "Products" },
  { href: "#", label: "About" },
  // { href: "#", label: "Deals" },
];

export const Navbar04 = React.forwardRef(
  (
    {
      className,
      logo = <Logo />,
      logoHref = "#",
      navigationLinks = defaultNavigationLinks,
      signInText = "Sign In",
      signInHref = "#signin",
      cartText = "Cart",
      cartHref = "#cart",
      cartCount = 2,
      searchPlaceholder = "Search...",
      onSignInClick,
      onCartClick,
      onSearchSubmit,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const searchId = useId();
    const { totalQty } = useCart();

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    // Combine refs
    const combinedRef = React.useCallback(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get("search");
      if (onSearchSubmit) {
        onSearchSubmit(query);
      }
    };

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky  top-0 z-50 w-full border-b backdrop-blur  px-4 md:px-6 [&_*]:no-underline bg-[#48A6A7]/60",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-1">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-0">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                          >
                            {link.label}
                          </button>
                        </NavigationMenuItem>
                      ))}
                      <NavigationMenuItem
                        className="w-full"
                        role="presentation"
                        aria-hidden={true}
                      >
                        <div
                          role="separator"
                          aria-orientation="horizontal"
                          className="bg-border -mx-1 my-1 h-px"
                        />
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        {/* <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (onSignInClick) onSignInClick();
                          }}
                          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                        >
                          {signInText}
                        </button> */}
                        <LoginForm />
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <Button
                          size="sm"
                          className="mt-0.5 w-full text-left text-sm"
                        >
                          <Link to="/cart">
                            <span className="flex items-baseline gap-2">
                              {cartText}
                              <span className="text-primary-foreground/60 text-xs">
                                {cartCount}
                              </span>
                            </span>
                          </Link>
                        </Button>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* Main nav */}
            <div className="flex flex-1 items-center min-md:justify-around max-md:justify-between">
              <button
                onClick={(e) => e.preventDefault()}
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <Link to="/">
                  <div className="text-2xl">{logo}</div>
                </Link>
                <Link to="/">
                  <span className="hidden font-bold text-xl sm:inline-block">
                    Gadme
                  </span>
                </Link>
              </button>
              {/* Search form */}
              <div className="">
                <form onSubmit={handleSearchSubmit} className="relative">
                  {/* <Input
                    id={searchId}
                    name="search"
                    className="peer h-8 ps-8 pe-2 min-md:w-96 bg-white"
                    placeholder={searchPlaceholder}
                    type="search"
                  /> */}
                  <ProductSearch />
                  {/* <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                    <SearchIcon size={16} />
                  </div> */}
                </form>
              </div>
              {/* Navigation menu */}
              {/* {!isMobile && (
                <NavigationMenu className="flex ">
                  <NavigationMenuList className="gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          href={link.href}
                          onClick={(e) => e.preventDefault()}
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium transition-colors cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )} */}
              {/* Right side */}
              {!isMobile && (
                <div className="flex items-center gap-3">
                  <Link to="productlists">
                    <p>Products</p>
                  </Link>
                  <Link to="about">
                    <p>About</p>
                  </Link>
                  <Button
                    size="sm"
                    className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                  >
                    <Link to="/cart">
                      <span className="flex items-baseline gap-2">
                        {cartText}
                        <span className="text-primary-foreground text-xs">
                          {totalQty}
                        </span>
                      </span>
                    </Link>
                  </Button>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onSignInClick) onSignInClick();
                    }}
                  >
                    {signInText}
                  </Button> */}
                  <LoginForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
);

function ProductSearch({ onSelectProduct }) {
  const { products, loading, error } = useProducts();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const navigate = useNavigate();

  // กรองผลลัพธ์ทันทีเมื่อพิมพ์ (ค้นหา title/brand แบบ case-insensitive)
  const results = useMemo(() => {
    if (!q) return [];
    const key = q.toLowerCase().trim();
    return products
      .filter((p) =>
        [p.title, p.brand].some((f) =>
          f?.toString().toLowerCase().includes(key)
        )
      )
      .slice(0, 8); // จำกัดจำนวนที่แสดง
  }, [q, products]);

  useEffect(() => {
    setOpen(!!q);
    setActiveIndex(0);
  }, [q]);

  // คลิกนอกเพื่อปิด
  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

  const select = (item) => {
    if (!item) return;
    onSelectProduct?.(item);
    // นำทางไปหน้าสินค้า ถ้าคุณมี route เช่น /products/:id
    try {
      navigate(`/products/${item.id}`);
    } catch {}
    setQ("");
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(!!q)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) =>
                Math.min(i + 1, Math.max(results.length - 1, 0))
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter") {
              const item = results[activeIndex];
              if (item) select(item);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="search"
          className="peer h-8 ps-8 pe-2 min-md:w-96 bg-white"
        />
        {q && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
            onClick={() => setQ("")}
            aria-label="Clear"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-md">
          {loading && (
            <div className="p-3 text-sm text-muted-foreground">
              กำลังโหลด...
            </div>
          )}
          {error && (
            <div className="p-3 text-sm text-red-600">โหลดข้อมูลไม่สำเร็จ</div>
          )}

          {!loading && !error && q && results.length === 0 && (
            <div className="p-3 text-sm text-muted-foreground">ไม่พบ “{q}”</div>
          )}

          {!loading && !error && results.length > 0 && (
            <ul role="listbox" className="max-h-80 overflow-auto">
              {results.map((p, i) => (
                <li
                  key={p.id}
                  role="option"
                  aria-selected={i === activeIndex}
                  onMouseDown={(e) => e.preventDefault()} // กัน blur ก่อนคลิก
                  onClick={() => select(p)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 px-3 py-2 text-sm",
                    i === activeIndex
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  )}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-10 w-10 rounded-md object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="truncate font-medium">
                      <Highlight text={p.title} q={q} />
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      <Highlight text={p.brand ?? ""} q={q} />
                    </div>
                  </div>
                  <div className="ml-auto shrink-0 text-xs sm:text-sm font-medium">
                    {formatTHB(p.price)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function Highlight({ text, q }) {
  if (!q || !text) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-yellow-200/70 px-0.5 dark:bg-yellow-300/20">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  );
}

const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(n);

Navbar04.displayName = "Navbar04";

export { Logo, HamburgerIcon };
