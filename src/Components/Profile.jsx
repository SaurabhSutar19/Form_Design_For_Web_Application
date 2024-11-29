import { json, useState, useEffect } from "react";
import profile from "../assets/profo.png";

const Profile = () => {
  const initialvalues = {
    name: "",
    email: "",
    number: "",
    address: "",
    imgfile: "",
  };
  const [formValues, setFormValues] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState(null);
  const [previewImage, setPreviewImage] = useState(""); // Default profile image

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // Add submission logic here
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\d{10}$/;

    if (!values.name) errors.name = "- Please Enter Your Name.";
    if (!values.email) errors.email = "- Please Enter Your Email.";
    else if (!emailRegex.test(values.email))
      errors.email = "- Invalid email format.";

    if (!values.number) errors.number = "- Enter Your Phone Number.";
    else if (!phoneRegex.test(values.number))
      errors.number = "- Must be 10 digits.";

    if (!values.address) errors.address = "- Enter Your Address.";
    if (!values.imgfile) errors.imgfile = "- Choose a file to upload an image.";

    return errors;
  };

  const validateImage = (image) => {
    if (!image.name.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)) {
      setErrors("Wrong file type");
      return;
    }

    if (image.size > 5000000) {
      setErrors("File too large - upload file less than 5MB");
      return;
    }

    setErrors(null); // Clear errors if the image is valid
    setFormValues({ ...formValues, imgfile: image });

    // Set the preview image URL for display
    const previewURL = URL.createObjectURL(image);
    setPreviewImage(previewURL);
  };

  const resetForm = () => {
    setFormValues(initialvalues);
    setFormErrors({});
    setErrors(null);
    setPreviewImage(profile); // Reset preview image to default
  };

  const userMail = JSON.parse(localStorage.getItem("email"));
  const userPass = JSON.parse(localStorage.getItem("password"));
  console.log("from loacal", userMail, userPass);
  console.log("formValues", formValues, formValues.email, formValues.password);

  return (
    <>
      <div className="flex w-[1800px] min-h-screen justify-center items-center">
        <div className="flex flex-col  md:flex-row md:space-x-20 space-y-6 md:space-y-0 bg-gradient-to-tr from-violet-700 to-pink-700 w-[1600px] justify-center items-center  p-8 sm:p-12 rounded-xl shadow-lg text-white hover:shadow-lg hover:shadow-black">
          <div className="hidden md:flex flex-col space-y-4">
            <h1 className="font-bold text-3xl tracking-wide">Profile</h1>
            <img
              className="object-cover rounded h-96 w-96 mt-14 hover:scale-[1.05] transition-all"
              src={profile}
              alt="sign_in_img"
            />
          </div>

          <div className="bg-white hover:shadow-md hover:shadow-black border-4 border-white rounded-xl shadow-lg p-8 text-teal-600">
            <h1 className="text-4xl font-bold mb-5 text-center text-gradient-to-tr from-violet-700 to-pink-700">
              Profile
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 w-full font-bold"
            >
              <div className="flex flex-col justify-center items-center  md:flex-row md:space-x-6">
                <div className="space-y-2">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    placeholder="Enter Your Full Name..!"
                    onChange={handleChange}
                    className="px-4 py-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 focus:border-indigo-600 w-full"
                  />
                  <p className="text-red-900 text-sm">{formErrors.name}</p>
                </div>

                <div className="space-y-2">
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={userMail}
                    placeholder="Enter Your Email Address..!"
                    onChange={handleChange}
                    className="px-4 py-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 focus:border-indigo-600 w-full"
                  />
                  <p className="text-red-900 text-sm">{formErrors.email}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="space-y-2">
                  <label>Phone Number:</label>
                  <input
                    type="number"
                    name="number"
                    value={formValues.number}
                    placeholder="Enter Your Number..!"
                    onChange={handleChange}
                    className="px-4 py-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 focus:border-indigo-600 w-full"
                  />
                  <p className="text-red-900 text-sm">{formErrors.number}</p>
                </div>

                <div className="space-y-2">
                  <label>Select Image :</label>
                  <input
                    type="file"
                    name="imgfile"
                    onChange={(e) => validateImage(e.target.files[0])}
                  />
                  {errors && (
                    <p className="text-red-900 text-sm mt-2">{errors}</p>
                  )}
                  <p className="text-red-900 text-sm">{formErrors.address}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 justify-center">
                <img
                  className="object-cover rounded h-20 w-20 ml-20 shadow-sm shadow-black"
                  src={previewImage}
                  alt="profile_preview"
                />
              </div>

              <div className="space-y-2 ">
                <label htmlFor="">Address :</label>
                <textarea
                  rows={3}
                  name="address"
                  value={formValues.address}
                  placeholder="Enter Your Address..!"
                  onChange={handleChange}
                  className=" px-4 py-2 text-md  outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600  bg-inherit w-full"
                />
                <p className="text-red-900 text-sm">{formErrors.address}</p>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-tr from-violet-700 to-pink-700 text-white px-6 py-2 rounded-lg font-bold transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gradient-to-tr from-violet-700 to-pink-700 text-white px-6 py-2 rounded-lg font-bold transition-all"
                >
                  Reset to Default
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
