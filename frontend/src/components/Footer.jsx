import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* {------ Left Section-------} */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="Company Logo" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti praesentium nostrum fuga neque eligendi sunt sint consectetur eum velit odio dolor sapiente officiis, excepturi accusamus! Quisquam totam ab repudiandae sunt.</p>
            </div>

            {/*----------------- Center Section -------------- */}
            <div>
                <p className='text-lg font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/* {-------- Right Section ---------} */}
            <div>
                <p className='text-lg font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>greatstackdev@gmail.com</li>
                </ul>
            </div>
        </div>

        {/* {------------Copyright Text-----------} */}
        <div className='mt-10'>
            <hr className='mb-4' />
            <p className='text-center text-gray-600'>Copyright 2023@ Prescripto - All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer