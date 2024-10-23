import { useState ,useEffect} from "react";

import profile from "../assets/profile.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const initialvalues = {name:"", email: "", number:"",address:"", imgfile:""};

  const [formValues,setFormValues]=useState(initialvalues);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const [passVisible, setPassVisible] = useState(false);


  const handleChange = (e) =>{
    const{name , value} = e.target;
    setFormValues({...formValues,[name]: value});
  }

  

  const handleSubmit = async (e) =>{
    try{
      e.preventDefault();
      e.persist();
      setFormErrors(valideate(formValues));
    
    } catch (error) { throw error;} 
 
  }

  useEffect( ()=>{
  
    if(Object.keys(formErrors).length === 0 && isSubmit){
        
    }
  },[formErrors])

 

const validate = (values) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const phoneRegex = /^\d{10}$/; // Ensuring 10 digits

  if (!values.name) {
    errors.name = "- Please Enter Your Name.";
  }

  if (!values.email) {
    errors.email = "- Please Enter Your Email.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "- This is not a valid email format.";
  }

  if (!values.number) {
    errors.number = "- Enter Your Phone Number.";
  } else if (!phoneRegex.test(values.number)) {
    errors.number = "- Phone Number should be exactly 10 digits.";
  }

  if (!values.address) {
    errors.address = "- Enter Your Address.";
  }

  if (!values.imgfile) {
    errors.imgfile = "- Choose a file to upload an image.";
  }

  return errors;
};
// validation for image
  const [errors ,setErrors] = useState(null);

  const valideateImage = (image) =>{
    //chexk type

    if(!image.name.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)){
      const errors = "Wrong file type"
      setErrors(errors);
      return;
    }

    // Check image size
    if(image.size > 5000000){
      const errors = "flile too large- upload file less than 5mb"
      setErrors(errors);
      return;
    }

    if(!image.target.value){
      const errors = "jkkkjkllkj";
      setErrors(errors)
    }
    setErrors(null)
  };

  //  end image validation here 

  

  return (
    <>
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col md:flex-row md:space-x-20  space-y-6 md:space-y-0 bg-gradient-to-tr from-violet-700 to-pink-700 w-full max-w-6xl p-8 sm:p-12 rounded-xl shadow-lg text-white hover:shadow-lg hover:shadow-black">
          
          
          <div className="hidden md:flex flex-col space-y-4 ">
            <div className="">
              <h1 className="font-bold text-3xl tracking-wide">Profile</h1>
            
             
            </div>
            <div >
              <img className="object-cover object-center rounded   hover:shadow-md   active:scale-[.98] avtive:duration-75 hover:scale-[1.05] ease-in-out transition-all mt-14 " src={profile} alt="sign_in_img" />
            </div>
        
           
          </div>

          <div className="bg-white hover:shadow-md hover:shadow-black border-4 border-white rounded-xl shadow-lg p-8 text-teal-600  ">
            <h1 className="text-4xl text-gradient-to-tr from-violet-700 to-pink-700 tracking-wide font-bold mb-5 text-center">Profile</h1>
            <form action="#" onSubmit={handleSubmit} className=" flex flex-col space-y-4 w-full  font-bold ">

<div className="flex flex-col md:flex-row md:space-x-6">

<div className="space-y-2 ">
                <label htmlFor="">
                  Full Name :
                </label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  placeholder="Enter Your Full Name..!"
                  onChange={handleChange}
                  className=" px-4 py-2 text-md  outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600  bg-inherit w-full"
                />
                  <p className="text-red-900 text-sm">{formErrors.name}</p>
                  
              </div>

               <div className="space-y-2 ">
                <label htmlFor="">
                  Email :
                </label>
                <input
                  type="text"
                  name="email"
                  value={formValues.email}
                  placeholder="Enter Your Email Address..!"
                  onChange={handleChange}
                  className=" readonly px-4 py-2 text-md  outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600  bg-inherit w-full"
                />
                  <p className="text-red-900 text-sm">{formErrors.email}</p>
                  
              </div>

</div>

<div className="flex flex-col md:flex-row md:space-x-6">

<div className="space-y-2 ">
                <label htmlFor="">
                  Phone Number :
                </label>
                <input
                  type="number"
                  name="number"
                  value={formValues.number}
                  placeholder="Enter Your Number..!"
                  onChange={handleChange}
                  className=" px-4 py-2 text-md  outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600  bg-inherit w-full"
                />
                  <p className="text-red-900 text-sm">{formErrors.number}</p>
                  
              </div>

               <div className="space-y-2 ">
                <label htmlFor="">
                  Address :
                </label>
                <textarea
                 
                  name="address"
                 
                  value={formValues.address}
                  placeholder="Enter Your Address..!"
                  onChange={handleChange}
                  className=" px-4 py-2 text-md  outline-none border-2 border-gray-300 rounded-md hover:border-gray-600 duration-200 peer focus:border-indigo-600  bg-inherit w-full"
                />
                  <p className="text-red-900 text-sm">{formErrors.address}</p>
                  
              </div>

</div>


  <div>
    <input type="file" name="imgfile" value={formValues.imgfile}  onChange={(e)=>{valideateImage(e.target.files[0])}} />
    {errors && <p className="text-red-900 text-sm mt-2">{errors}</p> }
  
  </div>

  <div className="flex justify-between md:justify-center md:space-x-20">
  <div className="flex justify-end" >
              <button type="submit" className="inline-block  self-end bg-gradient-to-tr from-violet-700 to-pink-700 text-white text-sm uppercase  font-bold px-6 py-2 tracking-wide rounded-lg cursor-pointer 
                active:scale-[.98] avtive:duration-75 hover:scale-[1.05] ease-in-out transition-all  ">
                Save Changes
                </button>

              </div>

  <div className="flex justify-end" >
              <button type="submit" className="inline-block  self-end bg-gradient-to-tr from-violet-700 to-pink-700 text-white text-sm uppercase  font-bold px-6 py-2 tracking-wide rounded-lg cursor-pointer 
                active:scale-[.98] avtive:duration-75 hover:scale-[1.05] ease-in-out transition-all  ">
                  Reset to Default
                </button>

              </div>
  </div>
              
              </form>
            </div>
            
          </div>
        </div>
      </>
    );
  }

export default Profile
