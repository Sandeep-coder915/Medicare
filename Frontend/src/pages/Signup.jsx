import React, { useState } from 'react'
import aboutimg from '../assets/images/signup.gif'
import { Link, useNavigate } from 'react-router-dom'
import uploadIMageToCloudinary from '../utils/uploadCloudinary'
import { BASE_URL } from '../../config'
import HashLoader from "react-spinners/HashLoader"
import { toast } from 'react-toastify'
const Signup = () => {
  const [selectedFile, setselectedFile] = useState(null)
  const [previewURL, setpreviewURL] = useState("")
  const [loading, setloading] = useState(false)


  const [formdata, setformdata] = useState({
    name:"",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: 'patient'
  });


const navigate= useNavigate ();



  const handleInputChange = e => {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0]
    //larte will updsate clouffdniry to yuplod img 
    const data = await uploadIMageToCloudinary(file)
    setpreviewURL(data.url)
    setselectedFile(data.url)
    setformdata({ ...formdata, photo: data.url })
    // console.log(file)
  }
  const submithandler = async event => {

    event.preventDefault();
    setloading(true)

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      })
      const { message } = await res.json()
      if (!res.ok) {
        throw new Error(message)
      }
      setloading(false)
      toast.success(message)
      navigate('/login')

    } catch (err) {
      toast.error(err.message)
      setloading(false)


    }

  }

  return (

    <section className='px-5 xl:px-0'>
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:block rounded-l-lg">
            <figure className='rounded-l-lg'>

              <img src={aboutimg} alt="aboutimg" className='w-full rounded-l-lg' />

            </figure>

          </div>
          {/* ===sigunup form== */}


          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10 '>Create an <span style={{ color: " rgb(0, 119, 255)" }}>Account</span></h3>
            <form onSubmit={submithandler}>


              <div className="mb-5">
                <input type="text"
                  placeholder='Full Name'
                  name='name'
                  value={formdata.name}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid bordeer-[#0055ff61] focus:outline-none focus:border-b-black text-[16px]leading-7 text-headingColor placeholder:text-textColor placeholder:text-[20px] cursor-pointer' required />
              </div>



              <div className="mb-5">
                <input type="email"
                  placeholder='Enter Your Email'
                  name='email'
                  value={formdata.email}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid bordeer-[#0055ff61] focus:outline-none focus:border-b-black text-[16px]leading-7 text-headingColor placeholder:text-textColor placeholder:text-[20px] cursor-pointer' required />
              </div>


              <div className="mb-5">
                <input type="password"
                  placeholder='password'
                  name='password'
                  value={formdata.password}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid bordeer-[#0055ff61] focus:outline-none focus:border-b-black text-[16px]leading-7 text-headingColor placeholder:text-textColor placeholder:text-[20px] cursor-pointer' required />
              </div>

              {/* 
            <div className="mb-5">
            <input type="text"
              placeholder='Full Name'
              name='name'
              value=""
              className='w-full pr-4 py-3 border-b border-solid bordeer-[#0055ff61] focus:outline-none focus:border-b-black text-[16px]leading-7 text-headingColor placeholder:text-textColor placeholder:text-[20px] cursor-pointer' required />
          </div> */}

              <div className="mb-5 flex items-center justify-between">
                <label className='text-textColor font-semibold text-[15px] leading-7'>
                  Are You a:
                  <select name="role"
                    value={formdata.role}
                    onChange={handleInputChange}
                    className='textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                    <option value="patient">Patient</option>
                    <option value="doctor">Docotor</option>
                  </select>
                </label>


                <label className='text-textColor font-semibold text-[15px] leading-7'>
                  Gender
                  <select name="gender"
                    value={formdata.gender}
                    onChange={handleInputChange}
                    className='textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others ">Others</option>
                  </select>

                </label>

              </div>
              <div className="mb-5 flex items-center gap-3">

                {selectedFile && (
                  <figure className='w-[60px] rounded-full border border-solid border-black  flex items-center justify-center'>
                    <img src={previewURL}
                      alt=""
                      className='w-full rounded-full' />
                  </figure>

                )}



                <div className='relative w-[160px] h-[50px]'>
                  <input type="file"
                    name='photo'
                    id='customFile'
                    onChange={handleFileInputChange}
                    accept='.jpg,.png' className='absolute top-0 w-full h-full opacity-0 cursor-pointer' />
                  <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type='submit'
                  className='btn1 w-full text-white text-[18px] leading-[30px] rounded-lg px-4 py-'  >
                  {loading ? <HashLoader size={35} color='#fffff' /> : 'Sign Up'}

                </button>
              </div>

              <p className='mt-5 text-textColor text-center '>
                Already Have Account <Link to="/login" className='font-medium ml-1' style={{ color: "rgba(28,184,195)" }}>Login</Link>
              </p>
            </form>

          </div>
        </div>
      </div>

    </section>
  )
}

export default Signup
