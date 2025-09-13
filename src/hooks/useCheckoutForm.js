import { useState, useMemo } from "react";

export const useCheckoutForm = (items) => {
  // ----- ฟอร์มผู้รับ/ที่อยู่ ----- (จากโค้ดเดิม)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  const formData = {
    firstName,
    lastName,
    phone,
    province,
    district,
    subdistrict,
    address,
    postcode,
  };

  const setters = {
    setFirstName,
    setLastName,
    setPhone,
    setProvince,
    setDistrict,
    setSubdistrict,
    setAddress,
    setPostcode,
  };

  const isFormValid = useMemo(
    () =>
      firstName.trim() &&
      lastName.trim() &&
      phone.trim() &&
      address.trim() &&
      subdistrict.trim() &&
      district.trim() &&
      province.trim() &&
      postcode.trim() &&
      items.length > 0,
    [
      firstName,
      lastName,
      phone,
      address,
      subdistrict,
      district,
      province,
      postcode,
      items,
    ]
  );

  return {
    formData,
    setters,
    isFormValid,
  };
};
