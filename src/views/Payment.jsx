import React, { useMemo, useState, createContext, useContext } from "react";

/**
 * 🔧 Self-contained Payment Page demo (no external deps)
 * - ตัดการพึ่งพา react-router-dom และ lucide-react เพื่อแก้หน้าแคนวาสขาว
 * - มี Router shim ภายในสำหรับเดโม่: ปุ่ม back/ไปหน้าอื่น ๆ จะ log และแสดงข้อความแทนการเปลี่ยนหน้า
 * - โครง UI แนว shadcn โดยใช้ component ย่อที่ประกาศในไฟล์นี้
 * - ใช้ได้ทั้งแบบสแตนด์อโลน (แคนวาส) และแบบฝังในโปรเจกต์จริง: ให้ส่ง props { navigate, locationState }
 */

// ---------------- Minimal shadcn-like UI primitives ----------------
const cx = (...c) => c.filter(Boolean).join(" ");

function Card({ className, ...props }) {
  return (
    <div
      className={cx("rounded-2xl border bg-white shadow-sm", className)}
      {...props}
    />
  );
}
function CardHeader({ className, ...props }) {
  return <div className={cx("p-4", className)} {...props} />;
}
function CardContent({ className, ...props }) {
  return <div className={cx("p-4", className)} {...props} />;
}
function CardFooter({ className, ...props }) {
  return <div className={cx("p-4", className)} {...props} />;
}
function CardTitle({ className, ...props }) {
  return <h3 className={cx("text-base font-semibold", className)} {...props} />;
}

function Button({
  variant = "default",
  size = "default",
  className,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl";
  const sizes = {
    default: "h-10 px-4",
    sm: "h-9 px-3 text-sm",
    icon: "h-10 w-10 p-0",
  };
  const variants = {
    default: "bg-black text-white hover:bg-black/90",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "bg-transparent hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button
      className={cx(
        base,
        sizes[size] || sizes.default,
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  );
}

function Input({ className, ...props }) {
  return (
    <input
      className={cx(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
        "placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black",
        className
      )}
      {...props}
    />
  );
}

function Label({ className, ...props }) {
  return (
    <label
      className={cx("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

function Separator({ className, ...props }) {
  return (
    <div
      role="separator"
      className={cx("h-px w-full bg-gray-200", className)}
      {...props}
    />
  );
}

const RadioCtx = createContext(null);
function RadioGroup({ value, onValueChange, className, children }) {
  return (
    <div className={className}>
      <RadioCtx.Provider value={{ value, onChange: onValueChange }}>
        {children}
      </RadioCtx.Provider>
    </div>
  );
}
function RadioGroupItem({ value, id }) {
  const ctx = useContext(RadioCtx);
  const checked = ctx?.value === value;
  return (
    <input
      type="radio"
      id={id}
      checked={!!checked}
      onChange={() => ctx?.onChange?.(value)}
      className="h-4 w-4"
    />
  );
}

function Checkbox({ id, checked, onCheckedChange }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="h-4 w-4 rounded border border-gray-300"
    />
  );
}

function ScrollArea({ className, ...props }) {
  return <div className={cx("overflow-y-auto", className)} {...props} />;
}

function Badge({ variant = "default", className, ...props }) {
  const variants = {
    default: "bg-black text-white",
    secondary: "bg-gray-100 text-gray-900",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

// ---------------- Simple inline icons (แทน lucide-react) ----------------
const Svg = ({ className, children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cx("h-4 w-4", className)}
  >
    {children}
  </svg>
);
const IconArrowLeft = () => (
  <Svg>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </Svg>
);
const IconCreditCard = () => (
  <Svg>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </Svg>
);
const IconQrCode = () => (
  <Svg>
    <rect x="3" y="3" width="6" height="6" />
    <rect x="15" y="3" width="6" height="6" />
    <rect x="3" y="15" width="6" height="6" />
    <path d="M15 15h3v3h-3zM21 21h-3" />
  </Svg>
);
const IconWallet = () => (
  <Svg>
    <path d="M3 7h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3z" />
    <path d="M3 7V5a2 2 0 0 1 2-2h12" />
    <circle cx="17" cy="13" r="1" />
  </Svg>
);
const IconShieldCheck = () => (
  <Svg>
    <path d="M12 2l7 4v6c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);
const IconShoppingBag = () => (
  <Svg>
    <path d="M6 2v4h12V2" />
    <path d="M3 6h18l-1 14H4z" />
    <path d="M9 10v-2a3 3 0 0 1 6 0v2" />
  </Svg>
);
const IconTruck = () => (
  <Svg>
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h4l3 3v5h-7z" />
    <circle cx="5.5" cy="18" r="2" />
    <circle cx="18.5" cy="18" r="2" />
  </Svg>
);

// ---------------- Router shim (สำหรับเดโม่ในแคนวาส) ----------------
function useRouterShim(externalNavigate, externalLocationState) {
  const [lastNav, setLastNav] = useState(null);
  const navigate =
    externalNavigate ||
    ((toOrDelta, opts) => {
      try {
        if (typeof toOrDelta === "number") {
          window.history.go(toOrDelta);
          setLastNav({ type: "delta", value: toOrDelta });
        } else {
          setLastNav({ type: "path", value: toOrDelta, state: opts?.state });
          console.log("[navigate shim]", toOrDelta, opts);
        }
      } catch (e) {
        console.warn("navigate shim error", e);
        setLastNav({ type: "noop" });
      }
    });
  const locationState = externalLocationState || null;
  return { navigate, locationState, lastNav };
}

// ---------------- Utilities ----------------
const formatTHB = (satang) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format((satang || 0) / 100);

const nowMMYY = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${yy}`;
};

// Validators แยกออกมาเพื่อให้ทดสอบได้ง่าย
const onlyDigits = (s = "") => (s + "").replace(/\D/g, "");
const isValidCardNumber = (s) => /^\d{16}$/.test(onlyDigits(s)); // (เดโม่) ยังไม่ทำ Luhn
const isValidExp = (s) => /^\d{2}\/\d{2}$/.test(s);
const isValidCVC = (s) => /^\d{3,4}$/.test(onlyDigits(s));
const isValidPromptPay = (s) => /^\d{9,13}$/.test(onlyDigits(s));

// ---------------- Dev Test Cases (assert ใน console) ----------------
try {
  console.assert(
    formatTHB(202000).startsWith("฿2,020"),
    "formatTHB(202000) ~ ฿2,020"
  );
  console.assert(
    isValidCardNumber("4242 4242 4242 4242") === true,
    "valid card number should pass"
  );
  console.assert(
    isValidCardNumber("1234 5678") === false,
    "short card number should fail"
  );
  console.assert(isValidExp("12/29") === true, "exp MM/YY should pass");
  console.assert(isValidExp("1229") === false, "exp without slash should fail");
  console.assert(
    isValidCVC("123") === true && isValidCVC("1234") === true,
    "3-4 digit CVC should pass"
  );
  console.assert(
    isValidPromptPay("0812345678") === true,
    "promptpay 10 digits should pass"
  );
  console.assert(
    isValidPromptPay("abc") === false,
    "non-digit promptpay should fail"
  );
  // Extra tests
  console.assert(
    onlyDigits("12-34-56") === "123456",
    "onlyDigits should strip non-digits"
  );
  console.assert(
    isValidPromptPay("1234567890123") === true,
    "promptpay 13 digits upper bound"
  );
  console.assert(
    isValidPromptPay("12345678") === false,
    "promptpay 8 digits should fail"
  );
} catch {}

// ---------------- Inner Page (ใช้ได้ทั้งเดโม่/โปรเจกต์จริง) ----------------
function PaymentPageInner({
  navigate: externalNavigate,
  locationState: externalLocationState,
}) {
  const { navigate, locationState, lastNav } = useRouterShim(
    externalNavigate,
    externalLocationState
  );

  /**
   * ✅ วิธีส่งข้อมูลจากหน้า Checkout มาหน้า Payment (โปรเจกต์จริง)
   * const payload = { ... };
   * navigate("/payment", { state: payload }); // ในแคนวาส navigate จะจำลองและแสดงข้อความแทน
   */

  // ถ้าไม่มี state จาก checkout จะใส่ตัวอย่างให้รันทันที (demo เท่านั้น)
  const demoFallback = useMemo(
    () =>
      locationState && locationState.grandTotalSatang
        ? locationState
        : {
            orderId: "ord_demo_0001",
            currency: "THB",
            items: [
              {
                key: "p101_black",
                productId: "p101",
                name: "NovaTech Headphones X",
                sku: "NT-HE-0101-BL",
                image: "https://picsum.photos/seed/gadget-101-black/300/300",
                options: { color: "Black" },
                unitPriceSatang: 199000,
                quantity: 1,
              },
            ],
            shippingFeeSatang: 3000,
            discountSatang: 0,
            grandTotalSatang: 202000,
            shippingAddress: {
              fullName: "สมชาย ใจดี",
              phone: "0812345678",
              line1: "99/1 หมู่ 9",
              line2: "แขวง/ตำบล ตัวอย่าง",
              district: "เมือง",
              province: "กรุงเทพฯ",
              postalCode: "10110",
            },
            contact: { email: "somchai@example.com" },
          },
    [locationState]
  );

  const [method, setMethod] = useState("card");
  const [agree, setAgree] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [paid, setPaid] = useState(null); // { ok: true, ref: string }
  const [demoBanner, setDemoBanner] = useState(true);

  // ฟอร์มบัตรเครดิต (demo validation แบบง่าย ๆ)
  const [cardName, setCardName] = useState("Somchai Jaidee");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [exp, setExp] = useState(nowMMYY());
  const [cvc, setCvc] = useState("123");

  // ฟอร์ม PromptPay (มือถือ/เลขพร้อมเพย์)
  const [ppId, setPpId] = useState("0812345678");

  const totalQty =
    demoFallback.items?.reduce((a, b) => a + (b.quantity || 0), 0) || 0;

  // ตรวจสอบความถูกต้องแบบคร่าว ๆ (พอใช้ใน demo)
  const cardOk = useMemo(() => {
    const nameOk = cardName.trim().length > 3;
    const numOk = isValidCardNumber(cardNumber);
    const expOk = isValidExp(exp);
    const cvcOk = isValidCVC(cvc);
    return nameOk && numOk && expOk && cvcOk;
  }, [cardName, cardNumber, exp, cvc]);

  const promptPayOk = useMemo(() => isValidPromptPay(ppId), [ppId]);

  const canPay = useMemo(() => {
    if (!agree) return false;
    if (method === "card") return cardOk;
    if (method === "promptpay") return promptPayOk;
    if (method === "cod") return true;
    return false;
  }, [agree, method, cardOk, promptPayOk]);

  const handleFormatCard = (val) => {
    const digits = onlyDigits(val).slice(0, 16);
    const groups = digits.match(/.{1,4}/g) || [];
    setCardNumber(groups.join(" "));
  };

  const handlePay = async () => {
    if (!canPay) return;
    setIsPaying(true);
    // จำลองการเรียก API ชำระเงิน (ในโปรเจกต์จริง ให้ไปเชื่อม Payment Gateway เช่น Omise/Stripe/2C2P)
    setTimeout(() => {
      setIsPaying(false);
      setPaid({
        ok: true,
        ref: `PAY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      });
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* พื้นหลังไล่เฉดนุ่ม ๆ */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #14b8a6 100%)`,
          backgroundSize: "100% 100%",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 md:py-10">
        {/* Demo banner */}
        {demoBanner && (
          <div className="mb-4 rounded-xl border bg-yellow-50 text-yellow-900 p-3 text-sm flex items-start justify-between gap-3">
            <div>
              โหมดเดโม่ในแคนวาส: ปุ่มนำทาง (ย้อนกลับ / ไปหน้าอื่น)
              จะไม่เปลี่ยนหน้า แต่จะแสดงข้อความแทน —
              นำโค้ดนี้ไปใช้ในโปรเจกต์จริงแล้วส่ง{" "}
              <code>{`navigate("/payment", { state })`}</code> ได้ตามปกติ
            </div>
            <button
              className="text-xs underline"
              onClick={() => setDemoBanner(false)}
            >
              ซ่อน
            </button>
          </div>
        )}

        <div className="mb-6 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <IconArrowLeft />
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            ชำระเงิน (Payment)
          </h1>
          <Badge variant="secondary" className="ml-1">
            {totalQty} รายการ
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT: วิธีการชำระเงิน + ฟอร์ม */}
          <Card className="lg:col-span-7">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">เลือกวิธีการชำระเงิน</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-6">
              <RadioGroup
                value={method}
                onValueChange={setMethod}
                className="space-y-4"
              >
                {/* วิธี: บัตรเครดิต/เดบิต */}
                <div className="flex gap-3 items-center">
                  <RadioGroupItem value="card" id="pay-card" />
                  <Label
                    htmlFor="pay-card"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <IconCreditCard /> บัตรเครดิต/เดบิต
                  </Label>
                </div>
                {method === "card" && (
                  <div className="rounded-2xl border p-4 bg-white shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardName">ชื่อบนบัตร</Label>
                        <Input
                          id="cardName"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="เช่น Somchai Jaidee"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">เลขบัตร</Label>
                        <Input
                          id="cardNumber"
                          value={cardNumber}
                          onChange={(e) => handleFormatCard(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          inputMode="numeric"
                        />
                      </div>
                      <div>
                        <Label htmlFor="exp">หมดอายุ (MM/YY)</Label>
                        <Input
                          id="exp"
                          value={exp}
                          onChange={(e) => setExp(e.target.value)}
                          placeholder="MM/YY"
                          inputMode="numeric"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          value={cvc}
                          onChange={(e) =>
                            setCvc(onlyDigits(e.target.value).slice(0, 4))
                          }
                          placeholder="123"
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <IconShieldCheck />
                      ข้อมูลบัตรเป็นตัวอย่างเท่านั้น —
                      โปรดเชื่อมต่อผ่านผู้ให้บริการชำระเงินจริงในโปรเจกต์ของคุณ
                      (PCI-DSS)
                    </div>
                  </div>
                )}

                {/* วิธี: PromptPay */}
                <div className="flex gap-3 items-center">
                  <RadioGroupItem value="promptpay" id="pay-pp" />
                  <Label
                    htmlFor="pay-pp"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <IconQrCode /> PromptPay (QR)
                  </Label>
                </div>
                {method === "promptpay" && (
                  <div className="rounded-2xl border p-4 bg-white shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="pp">
                          ระบุเบอร์/เลขพร้อมเพย์ (เพื่อออกบิล)
                        </Label>
                        <Input
                          id="pp"
                          value={ppId}
                          onChange={(e) =>
                            setPpId(onlyDigits(e.target.value).slice(0, 13))
                          }
                          placeholder="เช่น 0812345678"
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                    {/* กล่อง QR (placeholder สำหรับ demo) */}
                    <div className="rounded-xl border p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">
                          สแกนเพื่อชำระ
                        </div>
                        <div className="font-semibold">
                          {formatTHB(demoFallback.grandTotalSatang)}
                        </div>
                      </div>
                      <div className="h-28 w-28 bg-gray-100 rounded-lg grid place-items-center text-xs">
                        QR DEMO
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      * ในระบบจริงให้สร้าง QR ผ่านผู้ให้บริการ (เช่น ThaiQR, GB
                      Prime Pay, Omise ฯลฯ)
                    </div>
                  </div>
                )}

                {/* วิธี: เก็บเงินปลายทาง */}
                <div className="flex gap-3 items-center">
                  <RadioGroupItem value="cod" id="pay-cod" />
                  <Label
                    htmlFor="pay-cod"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <IconWallet /> เก็บเงินปลายทาง (COD)
                  </Label>
                </div>
              </RadioGroup>

              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  id="agree"
                  checked={agree}
                  onCheckedChange={(v) => setAgree(!!v)}
                />
                <Label htmlFor="agree" className="text-sm text-gray-500">
                  ฉันยอมรับเงื่อนไขการสั่งซื้อและนโยบายความเป็นส่วนตัว
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <IconShieldCheck /> การเชื่อมต่อปลอดภัย (SSL)
              </div>
              <Button
                className="h-11 rounded-full"
                disabled={!canPay || isPaying || !!paid}
                onClick={handlePay}
              >
                {isPaying
                  ? "กำลังชำระเงิน..."
                  : paid
                  ? "ชำระเงินสำเร็จ"
                  : `ชำระเงินตอนนี้ ${formatTHB(
                      demoFallback.grandTotalSatang
                    )}`}
              </Button>
            </CardFooter>
          </Card>

          {/* RIGHT: สรุปคำสั่งซื้อ */}
          <Card className="lg:col-span-5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <IconShoppingBag /> สรุปคำสั่งซื้อ
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <ScrollArea className="max-h-[50vh]">
                <ul className="divide-y">
                  {demoFallback.items?.map((it) => (
                    <li key={it.key} className="flex items-center gap-3 p-4">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="h-16 w-16 rounded-md object-cover border"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{it.name}</div>
                        <div className="text-xs text-gray-500">
                          {it.options?.color} • SKU: {it.sku}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">x{it.quantity}</div>
                        <div className="font-medium">
                          {formatTHB(it.unitPriceSatang * it.quantity)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
            <Separator />
            <CardContent className="space-y-3 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">ค่าส่ง</span>
                <span>{formatTHB(demoFallback.shippingFeeSatang)}</span>
              </div>
              {demoFallback.discountSatang > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">ส่วนลด</span>
                  <span>-{formatTHB(demoFallback.discountSatang)}</span>
                </div>
              )}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold">ยอดชำระทั้งหมด</span>
                <span className="font-semibold">
                  {formatTHB(demoFallback.grandTotalSatang)}
                </span>
              </div>
            </CardContent>
            <Separator />
            <CardContent className="pt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <IconTruck /> ที่อยู่จัดส่ง
              </div>
              <div className="text-sm text-gray-500">
                <div>
                  {demoFallback.shippingAddress?.fullName} •{" "}
                  {demoFallback.shippingAddress?.phone}
                </div>
                <div>
                  {demoFallback.shippingAddress?.line1}
                  {demoFallback.shippingAddress?.line2
                    ? `, ${demoFallback.shippingAddress?.line2}`
                    : ""}
                </div>
                <div>
                  {demoFallback.shippingAddress?.district},{" "}
                  {demoFallback.shippingAddress?.province}{" "}
                  {demoFallback.shippingAddress?.postalCode}
                </div>
              </div>
              {demoFallback.contact?.email && (
                <div className="text-xs text-gray-500">
                  อีเมลติดต่อ: {demoFallback.contact.email}
                </div>
              )}
            </CardContent>
            {paid && (
              <>
                <Separator />
                <CardContent className="pt-4">
                  <div className="rounded-xl border bg-green-50 text-green-900 p-4">
                    <div className="font-semibold">ชำระเงินสำเร็จ</div>
                    <div className="text-sm mt-1">
                      รหัสอ้างอิงการชำระเงิน: {paid.ref}
                    </div>
                    <div className="text-xs mt-1 text-green-800">
                      คำสั่งซื้อ: {demoFallback.orderId || "-"} • วิธีที่ใช้:{" "}
                      {method.toUpperCase()}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate("/orders")}
                      >
                        ดูคำสั่งซื้อของฉัน
                      </Button>
                      <Button size="sm" onClick={() => navigate("/")}>
                        กลับสู่หน้าหลัก
                      </Button>
                    </div>
                    {lastNav && (
                      <div className="text-xs mt-2 text-green-700">
                        (เดโม่) การนำทางล่าสุด: {lastNav.type} →{" "}
                        {JSON.stringify(lastNav)}
                      </div>
                    )}
                  </div>
                </CardContent>
              </>
            )}
            <CardFooter />
          </Card>
        </div>

        {/* หมายเหตุสำหรับนักพัฒนา */}
        <div className="mt-6 text-xs text-gray-500">
          <div className="font-medium text-gray-700">
            หมายเหตุ (สำหรับนักพัฒนา):
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              หน้านี้เป็นตัวอย่าง UI/UX แนว shadcn + Tailwind (ประกาศ component
              จำลองไว้ในไฟล์นี้เพื่อให้ preview ได้)
            </li>
            <li>
              ในระบบจริง ให้รับ payload จาก Checkout ผ่าน{" "}
              <code>{`navigate("/payment", { state: payload })`}</code> หรือใช้
              Global State (เช่น Context/Zustand)
            </li>
            <li>
              อย่าเก็บ/ส่งข้อมูลบัตรเอง ให้ใช้ผู้ให้บริการที่ผ่านการรับรอง (เช่น
              Omise/Stripe/2C2P) และ Tokenize ข้อมูล
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ---------------- Export ----------------
export default function PaymentPage(props) {
  return <PaymentPageInner {...props} />;
}
