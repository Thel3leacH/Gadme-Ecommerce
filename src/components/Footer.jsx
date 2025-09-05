// src/components/Footer.jsx
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-[#48A6A7]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* บล็อกบน: โลโก้ + สมัครอีเมล */}
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-2xl font-bold">Gadget Store</div>
            <p className="mt-2 max-w-prose text-sm text-primary-foreground">
              อัปเดตดีลและสินค้าใหม่ทุกสัปดาห์ สมัครรับข่าวสารได้เลย
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault(); /* submit */
            }}
            className="flex w-full flex-col gap-3 sm:flex-row"
          >
            <Input type="email" placeholder="อีเมลของคุณ" required />
            <Button type="submit" className="shrink-0">
              Subscribe
            </Button>
          </form>
        </div>

        <Separator className="my-10" />

        {/* ลิงก์หลายคอลัมน์ */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          <FooterCol
            title="Products"
            links={["Headphones", "Speakers", "Smartwatch", "Accessories"]}
          />
          <FooterCol
            title="Company"
            links={["About", "Careers", "Partners", "Press"]}
          />
          <FooterCol
            title="Resources"
            links={["Blog", "Help Center", "Shipping", "Returns"]}
          />
          <FooterCol
            title="Legal"
            links={["Terms", "Privacy", "Cookies", "Licenses"]}
          />
        </div>

        <Separator className="my-10" />

        {/* แถวล่าง: ลิขสิทธิ์ + โซเชียล */}
        <div className="flex flex-col-reverse items-start justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Gadget Store. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a aria-label="Facebook" className="hover:text-foreground" href="#">
              <Facebook size={18} />
            </a>
            <a
              aria-label="Instagram"
              className="hover:text-foreground"
              href="#"
            >
              <Instagram size={18} />
            </a>
            <a aria-label="YouTube" className="hover:text-foreground" href="#">
              <Youtube size={18} />
            </a>
            <a aria-label="GitHub" className="hover:text-foreground" href="#">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((t) => (
          <li key={t}>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
