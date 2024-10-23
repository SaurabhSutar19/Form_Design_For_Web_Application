export const otpgGenerator = () => {
  localStorage.removeItem("otp"); // Clear the old OTP from local storage
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  localStorage.setItem("otp", otp); // Save OTP to local storage
  return otp;
};