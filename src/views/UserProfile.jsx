import React, { useMemo, useRef, useState } from "react";

// Single-file demo that mimics shadcn/ui aesthetics using Tailwind only
// so it runs cleanly in this canvas without external dependencies.
// Features: edit name, add/change/remove photo, add/edit/delete address, set default address.

function CameraIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function PencilIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L7 21H3v-4z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function Button({ children, className = "", variant = "default", ...rest }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2";
  const styles = {
    default:
      "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-400",
    secondary:
      "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus-visible:ring-gray-300",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

function Input({ className = "", ...rest }) {
  return (
    <input
      className={`w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`}
      {...rest}
    />
  );
}

function Textarea({ className = "", ...rest }) {
  return (
    <textarea
      className={`w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`}
      {...rest}
    />
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-gray-100 bg-white/80 shadow-sm backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
function CardHeader({ children, className = "" }) {
  return <div className={`p-6 pb-2 ${className}`}>{children}</div>;
}
function CardContent({ children, className = "" }) {
  return <div className={`p-6 pt-2 ${className}`}>{children}</div>;
}
function CardFooter({ children, className = "" }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-3xl border border-gray-100 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="p-6">{children}</div>
          {footer && <div className="border-t px-6 py-4">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

const demoAddresses = [
  {
    id: "addr_001",
    label: "บ้าน",
    recipient: "Pub Suse",
    phone: "081-234-5678",
    line1: "123/45 ถนนสุขุมวิท",
    line2: "แขวงคลองตัน เขตวัฒนา",
    city: "กรุงเทพฯ",
    province: "กรุงเทพมหานคร",
    postal: "10110",
    country: "ไทย",
    isDefault: true,
  },
  {
    id: "addr_002",
    label: "ที่ทำงาน",
    recipient: "Pub Suse",
    phone: "081-234-5678",
    line1: "88 อาคาร Tech Tower ชั้น 10",
    line2: "ถ.เพชรบุรีตัดใหม่",
    city: "กรุงเทพฯ",
    province: "กรุงเทพมหานคร",
    postal: "10400",
    country: "ไทย",
    isDefault: false,
  },
];

export default function UserProfilePage() {
  const fileRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState({
    name: "Pub Suse",
    email: "pub@example.com",
    avatarUrl: "https://i.pravatar.cc/240?img=67",
  });
  const [addresses, setAddresses] = useState(demoAddresses);
  const [modal, setModal] = useState({
    open: false,
    mode: "create",
    data: null,
  });
  const [notice, setNotice] = useState("");

  const defaultAddressId = useMemo(
    () => addresses.find((a) => a.isDefault)?.id,
    [addresses]
  );

  function showNotice(text) {
    setNotice(text);
    setTimeout(() => setNotice(""), 2000);
  }

  function onAvatarClick() {
    fileRef.current?.click();
  }
  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUser((prev) => ({ ...prev, avatarUrl: url }));
    showNotice("อัปเดตรูปโปรไฟล์แล้ว (ยังไม่บันทึก)");
  }

  function saveProfile(e) {
    e?.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showNotice("บันทึกโปรไฟล์เรียบร้อยแล้ว");
    }, 600);
  }

  function openCreateAddress() {
    setModal({ open: true, mode: "create", data: emptyAddress() });
  }
  function openEditAddress(addr) {
    setModal({ open: true, mode: "edit", data: { ...addr } });
  }
  function closeModal() {
    setModal((m) => ({ ...m, open: false }));
  }

  function emptyAddress() {
    return {
      id: `addr_${Math.random().toString(36).slice(2, 8)}`,
      label: "บ้าน",
      recipient: user.name,
      phone: "",
      line1: "",
      line2: "",
      city: "",
      province: "",
      postal: "",
      country: "ไทย",
      isDefault: addresses.length === 0,
    };
  }

  function saveAddress(data) {
    if (data.isDefault) {
      // Ensure only one default
      setAddresses((prev) =>
        prev
          .map((a) => ({ ...a, isDefault: a.id === data.id }))
          .some((a) => a.id === data.id)
          ? (prev) =>
              prev.map((a) =>
                a.id === data.id ? data : { ...a, isDefault: false }
              )
          : null
      );
    }
    setAddresses((prev) => {
      const exists = prev.some((a) => a.id === data.id);
      const next = exists
        ? prev.map((a) => (a.id === data.id ? data : a))
        : [...prev, data];
      // Enforce single default
      if (data.isDefault) {
        return next.map((a) => ({ ...a, isDefault: a.id === data.id }));
      }
      return next;
    });
    setModal({ open: false, mode: "create", data: null });
    showNotice(
      modal.mode === "edit" ? "แก้ไขที่อยู่แล้ว" : "เพิ่มที่อยู่ใหม่แล้ว"
    );
  }

  function deleteAddress(id) {
    setAddresses((prev) => {
      const removingDefault = prev.find((a) => a.id === id)?.isDefault;
      const next = prev.filter((a) => a.id !== id);
      if (removingDefault && next.length) next[0].isDefault = true;
      return [...next];
    });
    showNotice("ลบที่อยู่แล้ว");
  }

  function setDefaultAddress(id) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    showNotice("ตั้งค่าเป็นที่อยู่หลักแล้ว");
  }

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Soft gradient background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(135% 100% at 50% 0%, #ffffff 40%, #dbeafe 70%, #bfdbfe 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            โปรไฟล์ผู้ใช้
          </h1>
          <p className="text-sm text-gray-600">
            จัดการข้อมูลส่วนตัว รูปโปรไฟล์ และที่อยู่จัดส่ง
          </p>
        </div>

        {notice && (
          <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-3 text-sm shadow-sm">
            {notice}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {/* Profile (Top) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={user.avatarUrl}
                    alt="avatar"
                    className="h-24 w-24 rounded-2xl object-cover ring-2 ring-white shadow"
                  />
                  <button
                    onClick={onAvatarClick}
                    className="absolute -right-2 -bottom-2 rounded-xl border border-gray-200 bg-white p-2 shadow hover:bg-gray-50"
                    title="เปลี่ยนรูป"
                  >
                    <CameraIcon className="h-4 w-4" />
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFileChange}
                  />
                </div>
                <div>
                  <div className="text-lg font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">ชื่อผู้ใช้</label>
                  <Input
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="กรอกชื่อที่ต้องการแสดง"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">อีเมล</label>
                  <Input
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? "กำลังบันทึก..." : "บันทึกโปรไฟล์"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setUser({ ...user, avatarUrl: "" })}
                    className="hidden"
                  >
                    ลบรูป
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Addresses (Bottom) */}
          <Card>
            <CardHeader className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">ที่อยู่จัดส่ง</div>
                <p className="text-sm text-gray-600">
                  เพิ่ม/แก้ไขที่อยู่ และกำหนดที่อยู่หลัก
                </p>
              </div>
              <Button onClick={openCreateAddress}>
                <PlusIcon className="h-4 w-4" /> เพิ่มที่อยู่
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="text-base font-semibold">
                          {addr.label}
                        </div>
                        {addr.isDefault && (
                          <Badge className="border-blue-200 bg-blue-50 text-blue-700">
                            ค่าเริ่มต้น
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                        <Button
                          variant="secondary"
                          className="px-3 py-1.5"
                          onClick={() => openEditAddress(addr)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          className="px-3 py-1.5"
                          onClick={() => deleteAddress(addr.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      <div className="font-medium">
                        {addr.recipient} • {addr.phone || "-"}
                      </div>
                      <div>{addr.line1}</div>
                      {addr.line2 && <div>{addr.line2}</div>}
                      <div>
                        {addr.city} {addr.province} {addr.postal}
                      </div>
                      <div>{addr.country}</div>
                    </div>
                    {!addr.isDefault && (
                      <div className="mt-3">
                        <Button
                          variant="ghost"
                          className="px-3 py-1.5"
                          onClick={() => setDefaultAddress(addr.id)}
                        >
                          ตั้งเป็นที่อยู่หลัก
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {addresses.length === 0 && (
                  <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-gray-500">
                    ยังไม่มีที่อยู่ เพิ่มที่อยู่แรกของคุณได้เลย
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Address Modal */}
      <Modal
        open={modal.open}
        onClose={closeModal}
        title={modal.mode === "edit" ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่"}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={closeModal}>
              ยกเลิก
            </Button>
            <Button onClick={() => saveAddress(modal.data)}>บันทึก</Button>
          </div>
        }
      >
        {modal.data && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">ป้ายกำกับ</label>
              <Input
                value={modal.data.label}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, label: e.target.value },
                  }))
                }
                placeholder="บ้าน / ที่ทำงาน"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">ผู้รับ</label>
              <Input
                value={modal.data.recipient}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, recipient: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">โทรศัพท์</label>
              <Input
                value={modal.data.phone}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, phone: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium">ที่อยู่ (บรรทัด 1)</label>
              <Input
                value={modal.data.line1}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, line1: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium">ที่อยู่ (บรรทัด 2)</label>
              <Input
                value={modal.data.line2}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, line2: e.target.value },
                  }))
                }
                placeholder="อาคาร / ซอย / หมู่บ้าน (ถ้ามี)"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">เขต/อำเภอ</label>
              <Input
                value={modal.data.city}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, city: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">จังหวัด</label>
              <Input
                value={modal.data.province}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, province: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">รหัสไปรษณีย์</label>
              <Input
                value={modal.data.postal}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, postal: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">ประเทศ</label>
              <Input
                value={modal.data.country}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, country: e.target.value },
                  }))
                }
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-3 pt-2">
              <input
                id="defaultAddress"
                type="checkbox"
                checked={modal.data.isDefault}
                onChange={(e) =>
                  setModal((m) => ({
                    ...m,
                    data: { ...m.data, isDefault: e.target.checked },
                  }))
                }
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-300"
              />
              <label htmlFor="defaultAddress" className="text-sm">
                ตั้งเป็นที่อยู่หลัก
              </label>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
