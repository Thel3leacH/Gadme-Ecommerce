import { useState } from "react";

const AddressForm = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    roomnumber: "",
    floor: "",
    buildingname: "",
    housenumber: "",
    villagenumber: "",
    villagename: "",
    alley: "",
    road: "",
    province: "",
    district: "",
    subdistrict: "",
    postalcode: "",
  });

  const defaultValues = {
    firstname: "",
    lastname: "",
    phonenumber: "",
    roomnumber: "",
    floor: "",
    buildingname: "",
    housenumber: "",
    villagenumber: "",
    villagename: "",
    alley: "",
    road: "",
    province: "",
    district: "",
    subdistrict: "",
    postalcode: "",
  };

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // รอเชื่อมกับ Backend
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    setValues(defaultValues);
  };

  const handleCancelValue = () => {
    setValues(defaultValues);
  };

  return (
    <div className="max-w-7xl mx-auto pl-[65px] pr-[40px] border-2 border-black ">
      <h1 className="text-xl font-bold my-4">Add shipping address</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <label htmlFor="firstname" className="block">
              First name
            </label>
            <input
              type="text"
              name="firstname"
              value={values.firstname}
              onChange={(e) => handleChanges(e)}
              pattern="^.{1,50}$"
              title="Please enter a valid name (1-50 characters)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="lastname" className="block">
              Last name
            </label>
            <input
              type="text"
              name="lastname"
              value={values.lastname}
              onChange={(e) => handleChanges(e)}
              pattern="^.{1,50}$"
              title="Please enter a valid surname (1-50 characters)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <label htmlFor="phonenumber" className="block">
              Phone number
            </label>
            <input
              type="text"
              name="phonenumber"
              value={values.phonenumber}
              onChange={(e) => handleChanges(e)}
              pattern="^[0-9]{10}$"
              title="Please enter a 10-digit phone number."
              required
              className="w-full flex-1 border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>
          <div className="flex-1"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <label htmlFor="roomnumber" className="block">
              Room number
            </label>
            <input
              type="text"
              name="roomnumber"
              value={values.roomnumber}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,4}$"
              title="Please enter a valid room number (4 alphanumeric characters)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="floor" className="block">
              Floor
            </label>
            <input
              type="text"
              name="floor"
              value={values.floor}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,5}$"
              title="Please enter a valid floor number (up to 5 alphanumeric characters)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <label htmlFor="buildingname" className="block">
              Building name
            </label>
            <input
              type="text"
              name="buildingname"
              value={values.buildingname}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,50}$"
              title="Please enter a valid building name (up to 50 characters)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>
          <div className="flex-1"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <label htmlFor="housenumber" className="block">
              House number
            </label>
            <input
              type="text"
              name="housenumber"
              value={values.housenumber}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,10}$"
              title="Please enter a valid house number (numbers only)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="villagenumber" className="block">
              Village number
            </label>
            <input
              type="text"
              name="villagenumber"
              value={values.villagenumber}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,10}$"
              title="Please enter a valid village number (numbers only)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <label htmlFor="villagename" className="block">
              Village name
            </label>
            <input
              type="text"
              name="villagename"
              value={values.villagename}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,100}$"
              title="Please enter valid characters (letters, numbers, and spaces)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="alley" className="block">
              Alley
            </label>
            <input
              type="text"
              name="alley"
              value={values.alley}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,100}$"
              title="Please enter valid characters (letters, numbers, and spaces)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <label htmlFor="road" className="block">
              Road
            </label>
            <input
              type="text"
              name="road"
              value={values.road}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,100}$"
              title="Please enter valid characters (letters, numbers, and spaces)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>
          <div className="flex-1"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <label htmlFor="province" className="block">
              Province
            </label>
            <input
              type="text"
              name="province"
              value={values.province}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,100}$"
              title="Please enter valid characters (letters and spaces)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="district" className="block">
              District
            </label>
            <input
              type="text"
              name="district"
              value={values.district}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,100}$"
              title="Please enter valid characters (letters and spaces)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <label htmlFor="subdistrict" className="block">
              Subdistrict
            </label>
            <input
              type="text"
              name="subdistrict"
              value={values.subdistrict}
              onChange={(e) => handleChanges(e)}
              pattern="^.{0,100}$"
              title="Please enter valid characters (letters and spaces)."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="postalcode" className="block">
              Postal code
            </label>
            <input
              type="text"
              name="postalcode"
              value={values.postalcode}
              onChange={(e) => handleChanges(e)}
              pattern="^[0-9]{5}$"
              title="Please enter a 5-digit number."
              required
              className="w-full border-2 bg-[#ECFDFF] rounded-[8px] px-2.5"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 my-12">
          <button
            type="submit"
            className="bg-teal-300 border border-black rounded px-4 py-1 cursor-pointer hover:bg-teal-500 transition-colors duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancelValue}
            className="bg-amber-300 border border-black rounded px-4 py-1 cursor-pointer hover:bg-amber-500 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
