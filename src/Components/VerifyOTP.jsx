import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Enter_OTP from "../assets/Enter_OTP.png";
import OtpInput from "../Components/OtpInput";
import { otpgGenerator } from "./util/otpGenerator";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [message,setMessage] = useState("")

  // Handle OTP input change
  const handleChangeOtp = (newOtp) => {
    setOtp(newOtp);
  };

  // Regenerate OTP and store it in localStorage
  const regenerate = () => {
    const newOne = otpgGenerator(); // Generate a new OTP
    setOtp(newOne);
    console.log("New OTP:", newOne);
  };
  useEffect(() => {}, [otp]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateOtp(otp)); // Validate OTP

    console.log("local", JSON.parse(localStorage.getItem("otp")), typeof otp);
    if (Number(otp) === JSON.parse(localStorage.getItem("otp"))) {
      setIsSubmit(true); // Set submit flag if OTP is correct
    }
  };

  // If the form is submitted and OTP is correct, navigate to login page
  useEffect(() => {
    if (isSubmit) {
      setMessage("OTP verified!");
      setTimeout(()=>{
        navigate("/sign_in");
      },2000)
    
    }
  }, [isSubmit, navigate]);

  // OTP validation function
  const validateOtp = (value) => {
    const errors = {};
    const storedOtp = localStorage.getItem("otp"); // Get OTP from localStorage
    const regex = /^\d+$/; // Regex for digits only

    if (!regex.test(value)) {
      errors.otp = "Please enter a valid OTP.";
    } else if (value !== storedOtp) {
      errors.otp = "OTP does not match.";
    }
    return errors;
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="flex flex-col md:flex-row md:space-x-20 space-y-6 md:space-y-0 bg-gradient-to-tr from-violet-700 to-pink-700 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white hover:shadow-lg hover:shadow-black">
        {/* Left section with image */}
        <div className="hidden md:flex flex-col space-y-4">
          <h1 className="font-bold text-3xl tracking-wide">Enter OTP</h1>
          <img
            className="object-cover object-center rounded h-96 w-96 hover:shadow-md active:scale-[.98] hover:scale-[1.05] transition-all mt-8"
            src={Enter_OTP}
            alt="Enter OTP"
          />
        </div>

        {/* OTP input and buttons */}
        <div className="space-y-3 flex flex-col bg-white h-fit border-4 border-white rounded-xl shadow-lg p-8 text-teal-600 md:w-84 lg:w-96">
          <h1 className="text-center text-black font-semibold">
            {" "}
            <h1 className="text-2xl text-red-950  ">OTP</h1>
            {JSON.parse(localStorage.getItem("otp"))}
          </h1>
          <h1 className="text-4xl font-bold mt-1 text-center text-gradient-to-tr from-violet-700 to-pink-700">
            Enter OTP
          </h1>
          <form className="flex flex-col space-y-4 w-full font-bold">
            <div className="space-y-2 mt-2">
              <OtpInput length={6} onChangeOtp={handleChangeOtp} />
              {formErrors.otp && (
                <p className="text-red-900 text-sm text-center">
                  {formErrors.otp}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              {/* Verify button */}
              <button
                type="submit"
                className="bg-gradient-to-tr from-violet-700 to-pink-700 text-white text-sm uppercase font-bold px-6 py-2 rounded-lg cursor-pointer hover:scale-[1.05] transition-all"
                onClick={handleSubmit}
              >
                Verify
              </button>

              {/* Resend OTP button */}
              <button
                type="button"
                className="bg-gradient-to-tr from-violet-700 to-pink-700 text-white text-sm uppercase font-bold px-6 py-2 rounded-lg cursor-pointer hover:scale-[1.05] transition-all"
                onClick={regenerate}
              >
                Resend
              </button>
            </div>
            <div>
              {message && <p className="text-center mt-2 text-green-600 text-lg">{message}</p>}
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;