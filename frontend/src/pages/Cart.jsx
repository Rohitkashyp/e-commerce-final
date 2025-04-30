
import React from 'react'

import EmptyCart from './EmptyCart'
import {useNavigate} from 'react-router-dom'
import { Cartcontext } from '../context/CartContext';
import { useContext } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL= import.meta.env.VITE_API_URL;

function Cart() {

  const navigate = useNavigate()

  const {cart,Removecart,totalprice,discount,shippingCharge,finalprice} = useContext(Cartcontext)
  // console.log(cart)
  // console.log(totalprice,"cart")





  const handlecheckOut = ()=>{
       navigate('/checkout')
       window.scroll(0,0)
  }



   return(
    <>
      {

cart.length === 0 ? (
  <div className='mt-40 min-[500px]:mt-32'>
    <EmptyCart/>
  </div>
): (
  <div className='mt-36 min-[500px]:mt-30'>
  <div className='max-w-[1300px] mx-auto mt-5'>
         <h1 className='text-xl sm:text-2xl md:text-3xl font-bold ml-5 sm:ml-35'>Shooping Cart {cart.length}</h1>  
       <div className='mt-4 w-full max-w-[1200px] mx-auto p-2 min-h-[500px]'>
     <div className='flex flex-col min-[713px]:flex-row gap-2'>
            <div className='w-full h-auto bg-white border-[1px] border-gray-300 shadow-md rounded-md'>
               {
                cart.map((item,index)=>(
                
                  <div key={index} className='h-[120px] flex justify-between gap-1 items-center border-b-[1px] border-b-gray-300 p-1 min-[403px]:p-0'>
                          <div className='w-1/4 h-full flex justify-center items-center'>
                              <button className='text-red-500 text-xl sm:text-2xl cursor-pointer' onClick={()=>{
                                Removecart(item.id)
                                  toast.error("Item Deleted",{
                                      position: "top-right",
                                      autoClose: 3000
                                   })

                                }}><AiOutlineDelete size={25}/></button>
                          </div>
                           <div className='w-1/4 h-full flex justify-center items-center'>
                            <img src={`${API_URL}${item.image}`} alt="img" className='h-20 md:h-25 w-[90%] object-contain' />
                           </div>
                           <div className='w-1/4 h-full flex justify-center items-center'>
                            <h3 className='text-[16px] sm:text-[20px] font-normal'>{item.name}</h3>
                           </div>
                           <div className='w-1/4 h-full flex justify-center items-center'>
                             <h3 className='ml-4 min-[373px]:ml-0 text-[16px] sm:text-[20px] font-normal'>Price: <span className=' text-orange-700'>{item.price}</span></h3>
                           </div>
                     </div>

                ))
               }
                 
                  
                 
                
             </div>
               <div className='w-full min-[713px]:w-[40%] min-h-[200px] flex flex-col gap-4'>
                  <div className='p-1 bg-white border-[1px] border-gray-300 rounded-md shadow-md min-h-[200px]'>
                       <div className='flex items-center justify-between p-2'>
                          <p className='text-[20px] min-[713px]:text-[15px] min-[742px]:text-[16px] min-[784]:text-[18px] lg:text-[20px] font-normal'>Subtotal:</p> 
                          <p className='text-[20px] min-[713px]:text-[15px] min-[742px]:text-[16px] min-[784]:text-[18px] lg:text-[20px] text-orange-700'> ₹{totalprice}</p>
                       </div>
                       <div className='flex items-center justify-between p-2'>
                          <p className='text-[20px] min-[713px]:text-[15px] min-[742px]:text-[16px] min-[784]:text-[18px] lg:text-[20px] font-normal'>Shipping Charge:</p> 
                          <p className='text-[20px] min-[713px]:text-[15px] min-[742px]:text-[16px] min-[784]:text-[18px] lg:text-[20px] text-orange-700'> ₹{shippingCharge}</p>
                       </div>
                       <div className='flex items-center justify-between p-2'>
                          <p className='text-[20px] min-[713px]:text-[15px] min-[742px]:text-[16px] min-[784]:text-[18px] lg:text-[20px] font-normal'>Discount (10%):</p> 
                          <p className='text-[20px] min-[713px]:text-[15px] min-[742px]:text-[16px] min-[784]:text-[18px] lg:text-[20px] text-green-700'> -₹{discount}</p>
                       </div>
                       <div className='flex items-center justify-between p-2'>
                          <p className='text-[20px] min-[713px]:text-[15px] min-[742px]:text-[16px] min-[784]:text-[18px] lg:text-[20px] font-normal'>Final Amount:</p> 
                          <p className='text-[20px] min-[713px]:text-[15px] min-[742px]:text-[16px] min-[784]:text-[18px] lg:text-[20px] text-orange-700'> ₹{finalprice}</p>
                       </div>
                  </div>
                  <div className='w-full flex items-center justify-center'>
                        <button onClick={handlecheckOut}
                         className='rounded-md bg-orange-700 cursor-pointer px-6 py-3 text-white text-[18px] min-[713px]:text-[14px] min-[827px]:text-[18px] transition hover:opacity-95 sm:hover:bg-transparent sm:hover:text-black sm:hover:border-[2px]'>
                          Proceed To CheckOut
                        </button>
                 </div>
             </div> 
       </div>            
       </div>
      </div>
</div>
)
}

    </>
   )



}

export default Cart