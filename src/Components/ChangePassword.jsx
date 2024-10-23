import { useState, useEffect } from "react";
import PasswordStrengthMeter from "../Components/PasswordStrengthMeter";
import change_password from "../assets/change_password.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const initialValues = { currentpass: "", password: "", confpassword: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [confPassVisible, setConfPassVisible] = useState(false);
  const [currPassVisible, setCurrPassVisible] = useState(false);
  const [message, setMessage] = useState(""); // Display success or error message

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);

    // Check if there are no validation errors
    if (Object.keys(errors).length === 0) {
      setMessage("Password successfully changed!");
      navigate("/sign_in"); // Navigate to sign-in page after successful validation
    } else {
      setMessage("Please correct the errors before proceeding.");
    }
  };

  // Validation function
  const validate = (values) => {
    const errors = {};
    let capsCount, smallCount, numberCount, symbolCount;

    // Current password validation
    if (!values.currentpass) {
      errors.currentpass = "Please enter your current password.";
    }

    // New password validation
    if (values.password.length < 8) {
      errors.password =
        "Password must be at least 8 characters long and include one uppercase letter, lowercase letter, number, and special character.";
    } else {
      capsCount = (values.password.match(/[A-Z]/g) || []).length;
      smallCount = (values.password.match(/[a-z]/g) || []).length;
      numberCount = (values.password.match(/[0-9]/g) || []).length;
      symbolCount = (values.password.match(/\W/g) || []).length;

      if (capsCount < 1) {
        errors.password = "Must contain at least one uppercase letter.";
      } else if (smallCount < 1) {
        errors.password = "Must contain at least one lowercase letter.";
      } else if (numberCount < 1) {
        errors.password = "Must contain at least one number.";
      } else if (symbolCount < 1) {
        errors.password = "Must contain at least one special character.";
      }
    }

    // Confirm password validation
    if (!values.confpassword) {
      errors.confpassword = "Please confirm your new password.";
    } else if (values.confpassword !== values.password) {
      errors.confpassword = "Passwords do not match.";
    }

    return errors;
  };

  const [isStrength, setStrength] = useState(null);
  const dataHandler = async (childData) => {
    setStrength(childData);
  };

  return (
    <>
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col md:flex-row md:space-x-20 space-y-6 md:space-y-0 bg-gradient-to-tr from-violet-700 to-pink-700 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white hover:shadow-lg hover:shadow-black">
          <div className="hidden md:flex flex-col space-y-8">
            <div>
              <h1 className="font-bold text-3xl tracking-wide">Change Password</h1>
            </div>
            <div>
              <img
                className="object-cover object-center rounded h-96 w-96 hover:shadow-md active:scale-[.98] active:duration-75 hover:scale-[1.05] ease-in-out transition-all mt-16"
                src={change_password}
                alt="change_Password_img"
              />
            </div>
          </div>

          <div className="bg-white hover:shadow-md hover:shadow-black border-4 border-white rounded-xl shadow-lg p-8 text-teal-600 md:w-84 lg:w-96">
            <h1 className="text-4xl text-gradient-to-tr from-violet-700 to-pink-700 tracking-wide font-bold mb-5 text-center">
              Change Password
            </h1>
            <form action="#" onSubmit={handleSubmit} className="flex flex-col space-y-2 w-full font-bold">
              {/* Current Password */}
              <div className="space-y-2 mt-4">
                <label htmlFor="" className="relative font-bold">
                  Current Password:
                  <input
                    type={currPassVisible ? "text" : "password"}
                    name="currentpass"
                    value={formValues.currentpass}
                    placeholder="Enter Your Previous Password..!"
                    onChange={handleChange}
                    className="px-4 py-2 mt-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-inherit w-full"
                  />
                  <span
                    onClick={() => setCurrPassVisible(!currPassVisible)}
                    className="absolute right-0 mt-4 px-1 text-md uppercase tracking-wide peer-focus:text-indigo-600 duration-200 peer-focus:text-sm cursor-pointer mr-2"
                  >
                    {currPassVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </label>
                <p className="text-red-900 text-sm">{formErrors.currentpass}</p>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label htmlFor="" className="relative font-bold">
                  New Password:
                  <input
                    type={passVisible ? "text" : "password"}
                    name="password"
                    value={formValues.password}
                    placeholder="Enter Your New Password..!"
                    onChange={handleChange}
                    className="px-4 py-2 mt-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-inherit w-full"
                  />
                  <span
                    onClick={() => setPassVisible(!passVisible)}
                    className="absolute right-0 mt-4 px-1 text-md uppercase tracking-wide peer-focus:text-indigo-600 duration-200 peer-focus:text-sm cursor-pointer mr-2"
                  >
                    {passVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </label>
                <PasswordStrengthMeter password={formValues.password} actions={dataHandler} />
                <p className="text-red-900 text-sm">{formErrors.password}</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="" className="relative font-bold">
                  Confirm New Password:
                  <input
                    type={confPassVisible ? "text" : "password"}
                    name="confpassword"
                    value={formValues.confpassword}
                    placeholder="Enter Your Confirm Password..!"
                    onChange={handleChange}
                    className="px-4 py-2 mt-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-inherit w-full"
                  />
                  <span
                    onClick={() => setConfPassVisible(!confPassVisible)}
                    className="absolute right-0 mt-4 px-1 text-md uppercase tracking-wide peer-focus:text-indigo-600 duration-200 peer-focus:text-sm cursor-pointer mr-2"
                  >
                    {confPassVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </label>
                <p className="text-red-900 text-sm">{formErrors.confpassword}</p>
              </div>

              <button
                type="submit"
                className="inline-block self-end bg-gradient-to-tr from-violet-700 to-pink-700 text-white text-sm uppercase font-bold px-6 py-2 tracking-wide rounded-lg cursor-pointer active:scale-[.98] active:duration-75 hover:scale-[1.05] ease-in-out transition-all"
              >
                Change Password
              </button>

              {/* Display success or error message */}
              {message && (
                <p className={`mt-4 text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
