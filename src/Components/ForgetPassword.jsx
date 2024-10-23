import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import forget_password from "../assets/forgot_password.png";

const ForgetPassword = () => {
  const initialvalues = { email: "" };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState(""); // State to display login success/error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormErrors(validate(formValues));

      const userMail = JSON.parse(localStorage.getItem("email")); // Retrieve email from localStorage
      console.log("Stored email:", userMail);
      console.log("Entered email:", formValues.email);

      // Check if the email in local storage matches the input email
      if (userMail === formValues.email) {
        setMessage("Login Successful!");
        navigate("/change_password"); // Navigate to change password
      } else {
        setMessage("Invalid email input.");
      }

      setIsSubmit(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form validation successful.");
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!values.email) {
      errors.email = "Please enter your email.";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format.";
    }

    return errors;
  };

  return (
    <>
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col md:flex-row md:space-x-20 space-y-6 md:space-y-0 bg-gradient-to-tr from-violet-700 to-pink-700 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white hover:shadow-lg hover:shadow-black">
          <div className="hidden md:flex flex-col space-y-4">
            <div>
              <h1 className="font-bold text-3xl tracking-wide">Forget Password</h1>
            </div>
            <div>
              <img
                className="object-cover object-center rounded h-96 w-96 hover:shadow-md active:scale-[.98] active:duration-75 hover:scale-[1.05] ease-in-out transition-all mt-8"
                src={forget_password}
                alt="forget_password_img"
              />
            </div>
          </div>

          <div className="flex flex-col bg-white hover:shadow-md hover:shadow-black h-fit border-4 border-white rounded-xl shadow-lg p-8 text-teal-600 md:w-84 lg:w-96">
            <h1 className="text-4xl text-gradient-to-tr from-violet-700 to-pink-700 tracking-wide font-bold mt-5 text-center">
              Forget Password
            </h1>
            <form action="#" onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full font-bold">
              <div className="space-y-2 mt-16">
                <label>Email :</label>
                <input
                  type="text"
                  name="email"
                  value={formValues.email}
                  placeholder="Enter Your Email..!"
                  onChange={handleChange}
                  className="px-4 py-2 text-md outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600 bg-inherit w-full"
                />
                <p className="text-red-900 text-sm">{formErrors.email}</p>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-block self-end bg-gradient-to-tr from-violet-700 to-pink-700 text-white text-sm uppercase font-bold px-6 py-2 tracking-wide rounded-lg cursor-pointer active:scale-[.98] active:duration-75 hover:scale-[1.05] ease-in-out transition-all mb-10 mt-3"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
            {/* Display login success or error message */}
            {message && <p className="text-center text-red-600 mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
