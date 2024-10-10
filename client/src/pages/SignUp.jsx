import { set } from 'mongoose';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
      );
      const data = await res.json();
      setLoading(false);
      
    } 
    catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  return (
    <div className='p-4 max-w-2xl center mx-auto'>
      <h1 className='text-3xl text-centre font-semibold gap'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5'>
        <input type="text" placeholder='Username' 
        id='name' className='bg-slate-100 p-3 rounded-lg '
        onChange={handleChange}/>
        <input type="text" placeholder='Email' 
        id='email' className='bg-slate-100 p-3 rounded-lg '
        onChange={handleChange}/>
        <input type="password" placeholder='Password' 
        id='password' className='bg-slate-100 p-3 rounded-lg '
        onChange={handleChange}/>
        <button disabled = {loading} className=' bg-slate-800  text-white p-3 rounded-xl 
        hover:opacity-90 disabled:opacity-100'> {loading? 'Loading...': 'SIGN UP' }</button>
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Have an account?</p>
        <Link to='/sign-in' className=' text-blue-500'>Sign in</Link>
      </div>
      <p className='text-red-500 mt-3'>{error && 'Something went wrong'}</p>
    </div>
  )
}

export default SignUp
