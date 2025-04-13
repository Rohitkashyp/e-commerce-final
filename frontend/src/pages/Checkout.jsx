


import React, { useEffect, useState } from 'react'

import { Cartcontext } from '../context/CartContext';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Checkout() {

  const [formdata,setFormdata] = useState({name:'',email:'',address:'',zipcode:'',phone:'',paymentMethod:''})
  const [errors,setErrors] =useState({})
  const {cart,setCart,finalprice,totalprice,discount,shippingCharge} = useContext(Cartcontext)
    // console.log(cart)

  const navigate = useNavigate()
   
    
    


    //  input handle change
    
    const handleChange = (e)=>{
     
      const {name,value} = e.target;
      setFormdata((prev)=>({...prev,[name]:value}))
      
     
      setFormdata((prev)=>({...prev,[name]:value}))
    
    }

    const handleblur = (e)=>{
      const {name,value} = e.target;
      let error = ''
      
      if(name === "phone" && !/^[7-9]\d{9}$/.test(value)){
        error = "Invalid Phone Number! Please Enter Valid 10-digit Number"
      }
        


      if(name === "zipcode" && !/^\d{6}$/.test(value)){
         error = "Invalid Zipcode! Zipcode are allowed only 6-digits"
      }

      setErrors((prev)=>({...prev,[name]:error}))
     }
 
 

    //  form submit handler 

    const handlesubmit = async (e) =>{
     
       e.preventDefault()
     

       if(cart.length === 0){
        alert("Your cart is empty! Please add items")
        return
       }
       const {name,email,phone,address,zipcode,paymentMethod}= formdata
       const newErrors = {};

      if(!name){
        newErrors.name = "Please Enter Name"
      }
      if(!email){
        newErrors.email = "Please Enter Email"
      }
      if(!phone){
        newErrors.phone = "Please Enter Phone"
      }
      if(!address){
        newErrors.address = "Please Enter address"
      }
      if(!zipcode){
        newErrors.zipcode = "Please Enter zipcode"
      }
      if(!paymentMethod){
        newErrors.paymentMethod = "Please Enter Payment"
      }

      if(phone && !/^[7-9]\d{9}$/.test(phone)){
           newErrors.phone = "Invalid Phone Number! Please enter a valid 10 digit Number"
      }
      if(zipcode && !/^\d{6}$/.test(zipcode)){
        newErrors.zipcode = "Invalid ZipCode! Please enter a valid 6-digit Zipcode"
   }

   if(Object.keys(newErrors).length > 0){
    setErrors(newErrors)
    return
   }

  
  const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const OrderData = {
    userDetails:formdata,
    cartItems:cart,
    totalAmount:totalprice,
    OrderDate: date,
    shippingCharge:shippingCharge,
    discount:discount,
    finalprice:finalprice


  }

  try {
    const res = await axios.post("http://localhost:4000/checkout",OrderData)
    console.log(res)
    console.log(res.data)
    localStorage.removeItem("cart")
    setCart([])

   
    // alert("Order Placed Successfully! Check your email.")
      toast.success("Order Placed Successfully! Check your email.",{
       position: "top-right",
       autoClose: 3000
    })

    let getExitOrder = JSON.parse(localStorage.getItem("orders")) || [];
    getExitOrder.push(OrderData)
    localStorage.setItem("orders",JSON.stringify(getExitOrder))
    navigate('/profile')
    
    
  } catch (error) {
    console.error("Error Order falied client side" ,error)
    // alert("Order Failed! please try again")
    toast.error("Order Failed! please try again",{
      position: "top-right",
      autoClose: 3000
   })
  }
   
   setFormdata({name:'',email:'',phone:'',address:'',zipcode:'',paymentMethod:''})
   setErrors({})




      
    }

    useEffect(()=>{
      const existCart = localStorage.getItem(("cart"))
      if(!existCart !== cart.length === 0){
        localStorage.removeItem("cart")
      }
      
    },[cart])

  





  




  return (
    <div className='mt-25'>
        <div className='border-[6px] border-yellow-400 max-w-[1300px] mx-auto mt-2'>
               <h1 className='text-2xl font-bold ml-35'>Checkout</h1>  
         <div className='border-[5px] border-black w-full max-w-[1100px] mx-auto p-1'>
               hello 
             <div className='border-[4px] border-red-400 p-1 flex flex-col items-center justify-center sm:flex-row gap-2'>
                     
                     <div className='border-[3px] border-purple-900 w-full sm:w-[60%] p-2 shadow-md h-auto'>
                       <form onSubmit={handlesubmit}>
                          <div className='flex gap-1 w-full'>
                               <div className='w-full'>
                                 <label className='block text-sm font-medium text-gray-700 mb-1'>FullName</label>
                                 <input value={formdata.name} onChange={handleChange} name='name' className='border-[2px] border-gray-400 outline-none w-full h-[40px] text-sm font-medium' type="text" />
                                 {errors && <p className='text-sm font-medium text-red-500'>{errors.name}</p>}
                               </div>
                               <div className='w-full'>
                                 <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                                 <input value={formdata.email} onChange={handleChange} name='email' type="email" className='border-[2px] border-gray-400 outline-none w-full h-[40px] text-sm font-medium' />
                                 {errors && <p className='text-sm font-medium text-red-500'>{errors.email}</p>}
                               </div>
                           </div>
                            <div className='w-full'>
                                  <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label> 
                                  <input value={formdata.phone} onChange={handleChange} onBlur={handleblur} name='phone' className='border-[2px] border-gray-400 outline-none w-full h-[40px] text-sm font-medium' type="text" />
                                  {errors && <p className='text-sm font-medium text-red-500'>{errors.phone}</p>}
                            </div>
                            <div className='w-full'>
                                  <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label> 
                                  <textarea value={formdata.address} onChange={handleChange} name='address' className='outline-none border-[2px] border-gray-400 w-full h-[50px] text-sm font-medium ' ></textarea>
                                  {errors && <p className='text-sm font-medium text-red-500'>{errors.address}</p>}
                            </div>
                            <div className='w-full max-w-full'> 
                                <div className='w-full'>
                                 <label className='block text-sm font-medium text-gray-700 mb-1'>ZipCode</label>
                                 <input value={formdata.zipcode} onChange={handleChange} onBlur={handleblur} name='zipcode' className='border-[2px] border-gray-400 outline-none w-full h-[40px] text-sm font-medium' type="text" />
                                 {errors && <p className='text-sm font-medium text-red-500'>{errors.zipcode}</p>}
                                </div>
                                <div className="w-full relative">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>

                                 <select
                                   name="paymentMethod"
                                   value={formdata.paymentMethod}
                                   onChange={handleChange}
                                   className="appearance-none border-[2px] border-gray-400 outline-none w-full h-[40px] text-sm font-medium pl-3 pr-8 rounded-md truncate"
                                 >
                                   <option className="text-sm font-medium" value="" disabled>
                                     Select Payment Method
                                   </option>
                                   <option className="text-sm font-medium" value="cashOnDelivery">
                                     Cash On Delivery
                                   </option>
                                 </select>

                                 <div className="pointer-events-none absolute right-4 top-9 text-gray-600 text-sm">
                                   ▼
                                 </div>
                                
                                 {errors?.paymentMethod && (
                                    <p className="text-sm font-medium text-red-500">{errors.paymentMethod}</p>
                                  )}
                                </div>

                                
                            </div>
                            <div className='w-full mt-2'>
                                 <button className='w-full bg-orange-600 px-4 p-2 text-white boder-[1px] border-black transition
                                 hover:bg-transparent hover:text-black hover:border-[2px] cursor-pointer'>
                                      Place Order
                                 </button>
                            </div>
                        </form>
                      </div>
                      <div className='border-[3px] border-blue-900 w-full sm:w-[40%] p-2 bg-white shadow-md h-auto mb-12'>
                        <h3 className='text-sm font-medium'>Order summary</h3>
                        <div className='border-[2px] border-yellow-400 w-full h-[250px] p-1 overflow-y-scroll'>
                            {
                              cart.map((item,index)=>(
                            <div key={index} className='flex mt-2 gap-1 border-[1px] border-red-800 w-full p-1'>
                                <div className='border-[1px] border-black w-1/3 h-15 sm:h-20 flex justify-center items-center'>
                                    <img src={`http://localhost:5000${item.image}`} alt="img" className='w-full h-15 sm:h-18 object-contain border-[0.5px] border-gray-200 p-2 shadow-md' />
                                </div>
                                <div className='border-[1px] border-black w-1/3 h-15 sm:h-20 flex justify-center items-center'>
                                   <h4>{item.name}</h4>
                                </div>
                                <div className='border-[1px] border-black w-1/3 h-15 sm:h-20 flex justify-center items-center'>
                                  <h4>Price: ₹{item.price}</h4>
                                </div>
                             </div>
                              ))
                            }
                          
                            
                            
                            
                         </div>
                        <div className='flex justify-center items-center mb-5 mt-5'>
                              <h2 className='bg-orange-700 px-6 py-2 text-white'>Final Amount: ₹{finalprice}</h2>
                         </div>

                      </div>
               </div>
            </div>
         </div>
    </div>
  )
}

export default Checkout













