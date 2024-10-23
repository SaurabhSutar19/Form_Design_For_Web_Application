import { useState, useEffect } from "react";
import PasswordStrengthMeter from "../Components/PasswordStrengthMeter";
import sign_up from "../assets/sign_up.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { otpgGenerator } from "./util/otpGenerator";


// Function to save user data (email and password) to local storage
const saveUserToLocalStorage = (user) => {
  console.log("Local storage email", user.email, "Local storage pass", user.pass);
  localStorage.setItem("email", JSON.stringify(user.email));
  localStorage.setItem("password", JSON.stringify(user.pass));
};

// Function to retrieve user data from local storage (if needed)
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const SignUp = () => {
  const navigate = useNavigate();

  // Form initial values for controlled inputs
  const initialvalues = {
    username: "",
    email: "",
    password: "",
    confpassword: "",
  };

  // States for managing form values, errors, and submission
  const [formValues, setFormValues] = useState(initialvalues); // Form input values
  const [formErrors, setFormErrors] = useState({}); // Form error messages
  const [isSubmit, setIsSubmit] = useState(false); // Track if form is submitted
  const [message, setMessage] = useState(""); // Message to display after submission
  const [passVisible, setPassVisible] = useState(false); // Password visibility toggle
  const [confPassVisible, setConfPassVisible] = useState(false); // Confirm password visibility toggle

  // Handle input change and update the form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission and trigger validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues); // Validate form fields
    setFormErrors(errors); // Set validation errors (if any)
    setIsSubmit(true); // Flag form as submitted
  };

  // useEffect to handle navigation if there are no validation errors
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const user = { email: formValues.email, pass: formValues.password };
      saveUserToLocalStorage(user); // Save user data to local storage
      setMessage("Signup successful! You can now verify your email.");

      const myotp = otpgGenerator();
      localStorage.setItem("otp", JSON.stringify(myotp));
      console.log(myotp);

      navigate("/verify_otp"); // Navigate to OTP verification page
    }
  }, [formErrors, isSubmit]); // Trigger effect when formErrors or isSubmit changes

  // Validation function for form fields
  const validate = (values) => {
    const errors = {}; // Initialize errors object
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // Regex for email validation

    let capsCount, smallCount, numberCount, symbolCount;

    // Username validation
    if (!values.username) {
      errors.username = "Please enter your username.";
    }

    // Email validation
    if (!values.email) {
      errors.email = "Please enter your email.";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format.";
    }

    // Password validation (length and character types)
    if (values.password.length < 4) {
      errors.password =
        "Password must be at least 4 characters and include uppercase, lowercase, number, and special character.";
    } else {
      capsCount = (values.password.match(/[A-Z]/g) || []).length;
      smallCount = (values.password.match(/[a-z]/g) || []).length;
      numberCount = (values.password.match(/[0-9]/g) || []).length;
      symbolCount = (values.password.match(/\W/g) || []).length;

      if (capsCount < 1) {
        errors.password = "Password must contain at least one uppercase letter.";
      } else if (smallCount < 1) {
        errors.password = "Password must contain at least one lowercase letter.";
      } else if (numberCount < 1) {
        errors.password = "Password must contain at least one number.";
      } else if (symbolCount < 1) {
        errors.password = "Password must contain at least one special character.";
      }
    }

    // Confirm password validation
    if (!values.confpassword) {
      errors.confpassword = "Please confirm your password.";
    } else if (values.confpassword !== values.password) {
      errors.confpassword = "Passwords do not match.";
    }

    return errors; // Return the errors object
  };

  // For handling password strength meter (child component)
  const [isStrength, setStrength] = useState(null);
  const dataHandler = async (childData) => {
    setStrength(childData);
  };

  // JSX for the sign-up form
  return (
    <>
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col md:flex-row md:space-x-20 space-y-6 md:space-y-0 bg-gradient-to-tr from-violet-700 to-pink-700 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white hover:shadow-lg hover:shadow-black">
          {/* Left side image */}
          <div className="hidden md:flex flex-col space-y-4">
            <h1 className="font-bold text-3xl tracking-wide">Sign Up</h1>
            <img
              className="object-cover object-center rounded h-96 w-96 hover:shadow-md active:scale-[.98] active:duration-75 hover:scale-[1.05] ease-in-out transition-all mt-14"
              src={sign_up}
              alt="sign_up_img"
            />
          </div>

          {/* Right side form */}
          <div className="bg-white hover:shadow-md hover:shadow-black border-4 border-white rounded-xl shadow-lg p-8 text-teal-600 md:w-84 lg:w-96">
            <h1 className="text-4xl text-gradient-to-tr from-violet-700 to-pink-700 tracking-wide font-bold mb-5 text-center">
              Sign Up
            </h1>
            <form
              action="#"
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 w-full font-bold"
            >
              {/* Username input */}
              <div className="space-y-2">
                <label htmlFor="username">Full Name:</label>
                <input
                  type="text"
                  name="username"
                  value={formValues.username}
                  placeholder="Enter full name"
                  onChange={handleChange}
                  className="px-4 py-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-inherit w-full"
                />
                <p className="text-red-900 text-sm">{formErrors.username}</p>
              </div>

              {/* Email input */}
              <div className="space-y-2">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  value={formValues.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="px-4 py-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-inherit w-full"
                />
                <p className="text-red-900 text-sm">{formErrors.email}</p>
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <label htmlFor="password" className="relative font-bold">
                  New Password:
                  <input
                    type={passVisible ? "text" : "password"}
                    name="password"
                    value={formValues.password}
                    placeholder="Enter your new password"
                    onChange={handleChange}
                    className="px-4 py-2 mt-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-inherit w-full"
                  />
                  {/* Toggle visibility icon */}
                  <span
                    onClick={() => setPassVisible(!passVisible)}
                    className="absolute right-0 mt-4 px-1 text-md uppercase tracking-wide peer-focus:text-indigo-600 duration-200 cursor-pointer mr-2"
                  >
                    {passVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </label>
                <PasswordStrengthMeter password={formValues.password} actions={dataHandler} />
                {formErrors.password && <p className="text-red-900 text-sm">{formErrors.password}</p>}
              </div>

              {/* Confirm password input */}
              <div className="space-y-2">
                <label htmlFor="confpassword" className="relative font-bold">
                  Confirm New Password:
                  <input
                    type={confPassVisible ? "text" : "password"}
                    name="confpassword"
                    value={formValues.confpassword}
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    className="px-4 py-2 mt-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-inherit w-full"
                  />
                  {/* Toggle visibility icon */}
                  <span
                    onClick={() => setConfPassVisible(!confPassVisible)}
                    className="absolute right-0 mt-4 px-1 text-md uppercase tracking-wide peer-focus:text-indigo-600 duration-200 cursor-pointer mr-2"
                  >
                    {confPassVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </label>
                <p className="text-red-900 text-sm">{formErrors.confpassword}</p>
              </div>

              {/* Sign-up button */}
              <button
                type="submit"
                className="w-full text-center bg-gradient-to-r from-indigo-600 to-purple-500 hover:scale-[1.05] ease-in-out transition-all px-4 py-3 rounded-md tracking-wide font-bold hover:shadow-lg hover:shadow-black text-white"
              >
                Sign Up
              </button>
            </form>

            {/* Message after submission */}
            <p className="text-green-500 mt-3 text-center">{message}</p>

            {/* Link to sign in page */}
            <div className="flex justify-center mt-3 text-sm">
              <p>Already have an account?</p>
              <Link to="/sign_in" className="ml-1 text-blue-900 font-bold">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
