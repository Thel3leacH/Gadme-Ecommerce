import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ShippingForm({ formData, setters }) {
  const {
    firstName,
    lastName,
    phone,
    province,
    district,
    subdistrict,
    address,
    postcode,
  } = formData;

  const {
    setFirstName,
    setLastName,
    setPhone,
    setProvince,
    setDistrict,
    setSubdistrict,
    setAddress,
    setPostcode,
  } = setters;

  return (
    <Card className="lg:col-span-8">
      <CardHeader className="pb-3">
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 pt-6">
        {/* ผู้รับ */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="firstName">Firstname</Label>
            <Input
              id="firstName"
              placeholder="สมชาย"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Lastname</Label>
            <Input
              id="lastName"
              placeholder="ใจดี"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="08x-xxx-xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* ที่อยู่ */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>Address</Label>
            <Textarea
              placeholder="บ้านเลขที่, หมู่บ้าน/อาคาร, ถนน, ซอย"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label>Sub-district</Label>
              <Input
                placeholder="แขวง/ตำบล"
                value={subdistrict}
                onChange={(e) => setSubdistrict(e.target.value)}
              />
            </div>
            <div>
              <Label>District</Label>
              <Input
                placeholder="อำเภอ/เขต"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label>Province</Label>
              <Input
                placeholder="จังหวัด"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div>
              <Label>Postal Code</Label>
              <Input
                placeholder="xxxxx"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Save Address</Button>
        </div>
      </CardContent>
    </Card>
  );
}
