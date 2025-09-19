"use client";
import * as React from "react";
import { useEffect, useState, useRef, useId, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

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
import { LoginForm } from "../../../auth/LoginForm";
import AuthDialog from "../../../auth/AuthDialog";

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
    const { totalQty, totalItems } = useCart();
    const { user, logout, loading } = useAuth();
    const [busy, setBusy] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const handleLogout = async () => {
      setBusy(true);
      try {
        await toast.promise(
          logout(), // <- ใช้จาก AuthContext
          {
            loading: "กำลังออกจากระบบ...",
            success: "ออกจากระบบแล้ว",
            error: "ออกจากระบบไม่สำเร็จ",
          }
        );
      } finally {
        setBusy(false);
      }
    };

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
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center gap-4">
          {/* LEFT cluster: โลโก้ + ค้นหา (กินพื้นที่) */}
          <div className="flex flex-1 items-center gap-2">
            {/* Main nav (โลโก้ + ค้นหา) */}
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
              <div>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <ProductSearch />
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT cluster: ปุ่มเมนู */}
          {isMobile ? (
            <div className="ml-auto flex items-center">
              <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle menu"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>

                {/* ชิดขวา */}
                <PopoverContent
                  align="end"
                  className="w-72 p-2"
                  sideOffset={8}
                  onEscapeKeyDown={() => setMobileOpen(false)}
                >
                  <nav className="flex flex-col gap-1">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                    >
                      <Link to="/" onClick={() => setMobileOpen(false)}>
                        Home
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                    >
                      <Link to="/products" onClick={() => setMobileOpen(false)}>
                        Products
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                    >
                      <Link to="/about" onClick={() => setMobileOpen(false)}>
                        About
                      </Link>
                    </Button>

                    {!loading && user && (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="justify-start"
                      >
                        <Link
                          to="/OrderHistory"
                          onClick={() => setMobileOpen(false)}
                        >
                          Order
                        </Link>
                      </Button>
                    )}

                    <div className="bg-border my-1 h-px" />

                    <Button asChild size="sm" className="justify-between">
                      <Link to="/cart" onClick={() => setMobileOpen(false)}>
                        <span className="flex items-center gap-2">
                          {cartText}
                          <span className="text-xs opacity-70">
                            {totalItems}
                          </span>
                        </span>
                      </Link>
                    </Button>
                  </nav>
                </PopoverContent>
              </Popover>

              {/* Dialog นอก Popover */}
              <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
            </div>
          ) : (
            // Desktop right cluster เดิม
            <div className="ml-auto flex items-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link to="products">Products</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="about">About</Link>
              </Button>
              {loading ? null : user ? (
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/OrderHistory">Order</Link>
                  </Button>
                </div>
              ) : null}
              <Button
                size="sm"
                className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
              >
                <Link to="/cart">
                  <span className="flex items-baseline gap-2">
                    {cartText}
                    <span className="text-primary-foreground text-xs">
                      {totalItems}
                    </span>
                  </span>
                </Link>
              </Button>
              {loading ? null : user ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    disabled={busy}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <AuthDialog />
              )}
            </div>
          )}
        </div>
      </header>
    );
  }
);

// --- utils ภายในไฟล์ ---
const parsePrice = (x) => {
  if (x == null) return 0;
  if (typeof x === "number") return x;
  if (typeof x === "string") {
    const num = Number(x.replace(/[^\d.-]/g, "")); // "1,490" -> 1490
    return Number.isFinite(num) ? num : 0;
  }
  return 0;
};

const toTHB = (n) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(
    parsePrice(n)
  );

// เน้นคำค้นแบบง่าย
const Highlight = ({ text = "", q = "" }) => {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent underline decoration-2 underline-offset-2">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  );
};

// แปลง product ให้เป็นรูปแบบเดียวกัน
const toVM = (p) => {
  const id = p?._id ?? p?.id ?? p?.product_id ?? "";
  const rawPrice =
    p?.product_price ?? p?.price ?? p?.minPrice ?? p?.product_minPrice ?? 0;

  return {
    id: String(id),
    title: p?.product_name ?? p?.title ?? p?.name ?? "",
    brand: p?.product_brand ?? p?.brand ?? "",
    image:
      p?.product_image ??
      p?.image ??
      (Array.isArray(p?.images) ? p.images[0] : ""),
    price: parsePrice(rawPrice), // ✅ เก็บเป็นตัวเลขแน่นอน
    _raw: p, // เก็บต้นฉบับไว้เผื่อใช้งานต่อ
  };
};

export function ProductSearch({ onSelectProduct }) {
  const { products, loading, error } = useProducts();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // สร้าง view models ให้ฟิลด์ตรงกันทุกที่
  const items = useMemo(() => (products ?? []).map(toVM), [products]);

  // ค้นหา title/brand (case-insensitive)
  const results = useMemo(() => {
    const key = q.trim().toLowerCase();
    if (!key) return [];
    return items
      .filter((p) =>
        [p.id, p.brand].some((f) => f?.toLowerCase().includes(key))
      )
      .slice(0, 8);
  }, [q, items]);

  // เปิด/รีเซ็ต index เมื่อมีข้อความค้นหา
  useEffect(() => {
    setOpen(!!q);
    setActiveIndex(0);
  }, [q]);

  // ถ้าจำนวนผลลัพธ์เปลี่ยน ให้ clamp index
  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(results.length - 1, 0)));
  }, [results]);

  // ปิดเมื่อคลิกนอก (ใช้ capture phase ให้ปิด popup อย่างปลอดภัย)
  useEffect(() => {
    const onPointerDownCapture = (e) => {
      const el = ref.current;
      if (el && !el.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDownCapture, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDownCapture, true);
  }, []);

  const select = (vm) => {
    if (!vm) return;
    onSelectProduct?.(vm._raw ?? vm);

    // ปิด dropdown ก่อน แล้วค่อย navigate ในเฟรมถัดไป กัน NotFoundError
    setOpen(false);
    setQ("");
    requestAnimationFrame(() => {
      const name = vm.id.trim();
      if (!name) return; // กันค่าว่าง
      const target = `/products/${encodeURIComponent(name)}`;
      if (location.pathname !== target) {
        navigate(target);
        navigate(0);
      }
    });
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className="relative"
        role="combobox"
        aria-expanded={open}
        aria-controls="search-results"
        aria-haspopup="listbox"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(!!q)}
          onKeyDown={(e) => {
            if (!results.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => (i + 1) % results.length); // วนลง
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => (i - 1 + results.length) % results.length); // วนขึ้น
            } else if (e.key === "Enter") {
              e.preventDefault();
              select(results[activeIndex]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search products or brands..."
          className="peer h-8 ps-8 pe-8 min-md:w-96 bg-white"
          role="searchbox"
          aria-autocomplete="list"
          aria-activedescendant={
            open && results[activeIndex]
              ? `opt-${results[activeIndex].id}`
              : undefined
          }
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
            <div className="p-3 text-sm text-red-600">Failed to load data</div>
          )}

          {!loading && !error && q && results.length === 0 && (
            <div className="p-3 text-sm text-muted-foreground">
              No results found “{q}”
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <ul
              id="search-results"
              role="listbox"
              className="max-h-80 overflow-auto"
            >
              {results.map((p, i) => (
                <li
                  key={p.id}
                  id={`opt-${p.id}`}
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
                    alt={p.id || "product image"}
                    className="h-10 w-10 rounded-md object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="truncate font-medium">
                      <Highlight text={p.id} q={q} />
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      <Highlight text={p.brand} q={q} />
                    </div>
                  </div>
                  <div className="ml-auto shrink-0 text-xs sm:text-sm font-medium">
                    {toTHB(p.price)}
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

Navbar04.displayName = "Navbar04";

export { Logo, HamburgerIcon };
