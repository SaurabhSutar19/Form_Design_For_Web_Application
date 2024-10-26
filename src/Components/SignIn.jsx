import { useState, useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";

import login_form from "../assets/login_form.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();

  const initialvalues = { email: "", password: "" };

  const [formValues, setFormValues] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
 

  const [passVisible, setPassVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      e.persist();
      setFormErrors(valideate(formValues));
      setIsSubmit(true)

    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors,isSubmit]);

  const valideate = (values) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const userMail = JSON.parse(localStorage.getItem("email"));
    const userPass = JSON.parse(localStorage.getItem("password"));
    console.log("from loacal", userMail, userPass);
    console.log(
      "formValues",
      formValues,
      formValues.email,
      formValues.password
    );

    if (userMail === formValues.email && userPass === formValues.password) {
      setMessage("Login Succesful!");
      setTimeout(() => {
        navigate("/profile");
      }, 2000); 
     
    } 
     

    if (!values.email) {
      errors.email = "Please enter your email.";
    } else if (!regex.test(values.email)) {
      errors.email = "This is a not valid format ";
    }else if(userMail === formValues.email){
      errors.email = "Please enter the correct email."
    }

    if (values.password.length < 4) {
      errors.password =
        "Password must be minimum 4 characters include one UPPERCASE, lowercase, number and special character: @$! % * ? & ";
    }else if(userPass !== formValues.password){
      errors.password = "Please enter the correct password. ";
    }



    return errors;
  };

  return (
    <>
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col md:flex-row md:space-x-20  space-y-6 md:space-y-0 bg-gradient-to-tr from-violet-700 to-pink-700 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white hover:shadow-lg hover:shadow-black">
          <div className="hidden md:flex flex-col space-y-4 ">
            <div className="">
              <h1 className="font-bold text-3xl tracking-wide">Sign In</h1>
              <p></p>
            </div>
            <div>
              <img
                className="object-cover object-center rounded  h-96 w-96 hover:shadow-md   active:scale-[.98] avtive:duration-75 hover:scale-[1.05] ease-in-out transition-all mt-14 "
                src={login_form}
                alt="sign_in_img"
              />
            </div>
          </div>

          <div className="bg-white hover:shadow-md hover:shadow-black border-4 border-white rounded-xl shadow-lg p-8 text-teal-600 md:w-84 lg:w-96">
            <h1 className="text-4xl text-gradient-to-tr from-violet-700 to-pink-700 tracking-wide font-bold mb-5 text-center">
              Sign In
            </h1>
            <form
              
              onSubmit={handleSubmit}
              className=" flex flex-col space-y-4 w-full font-bold "
            >
              <div className="space-y-2 ">
                <label htmlFor="">Email :</label>
                <input
                  type="text"
                  name="email"
                  value={formValues.email}
                  placeholder="enter your email address..!"
                  onChange={handleChange}
                  className=" px-4 py-2 text-md  outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600  bg-inherit w-full"
                />
                <p className="text-red-900 text-sm">{formErrors.email}</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="" className=" relative font-bold">
                  Password :
                  <input
                    type={passVisible ? "text" : "password"}
                    name="password"
                    value={formValues.password}
                    placeholder="enter your password..!"
                    onChange={handleChange}
                    className="mt-2 px-4 py-2 text-md  outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600  bg-inherit w-full"
                  />
                  <span
                    onClick={() => setPassVisible(!passVisible)}
                    className="absolute right-0 mt-4  px-1 text-md uppercase tracking-wide peer-focus:text-indigo-600  duration-200 peer-focus:text-sm cursor-pointer  mr-2 
                   "
                  >
                    {passVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </label>
                <p className="text-red-900 text-sm">{formErrors.password}</p>
              </div>

              <div className="flex justify-between">
                <label htmlFor="" className="">
                  Remember Me
                  <input type="checkbox" className="ml-1 " />
                </label>
                <p className="font-bold ">
                  {" "}
                  <Link
                    to={"/forget_password"}
                    className="text-base font-bold text-violet-500 ml-2 active:scale-[.98] avtive:duration-75 hover:scale-[1.01] ease-in-out transition-all "
                  >
                    Forget Password
                  </Link>
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-block  self-end bg-gradient-to-tr from-violet-700 to-pink-700 text-white text-sm uppercase  font-bold px-6 py-2 tracking-wide rounded-lg cursor-pointer 
              active:scale-[.98] avtive:duration-75 hover:scale-[1.05] ease-in-out transition-all  "
                >
                  Sign In
                </button>
              </div>
              <div>
              {message && <p className="text-center mt-2 text-green-600 text-lg">{message}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;
