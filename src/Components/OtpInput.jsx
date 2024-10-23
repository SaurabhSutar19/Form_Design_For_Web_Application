import React, { useState } from 'react'


const OtpInput = ({ length, onChangeOtp }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleOnChange = (element, index) => {
    const value = element.value;
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < length - 1 && value) {
      element.nextSibling.focus();
    }
    onChangeOtp(newOtp.join(""));
  }

  const handleBackspace = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);

    if (index > 0) {
      element.previousSibling.focus();
    }

    onChangeOtp(newOtp.join(""));
  }
  return (
    <div className='flex space-x-2 items-center justify-center'>
      {otp.map((data, index) => (
        <input key={index} name='otp' value={data} type="text" maxLength={1}
          className="border-[3px] border-gray-600 hover:border-indigo-800 h-8 w-8  rounded-md text-md text-lg text-center focus:border-violet-700 outline-none "
          onChange={(e) => handleOnChange(e.target, index)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              handleBackspace(e.target, index);
            }
          }}
        />
      ))}

    </div>
  )
}




export default OtpInput
