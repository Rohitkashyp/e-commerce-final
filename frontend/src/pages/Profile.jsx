

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL= import.meta.env.VITE_API_URL;

function Profile() {

    const [orders,setOrders] = useState([])
    const [User,setUser] = useState(null)
   

    useEffect(()=>{
     
      const getUser =localStorage.getItem("user")
    const user = getUser ? JSON.parse(getUser) : null;
     setUser(user)


      const getorder = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(getorder)
    },[])
    

    const deleteOrder = (index)=>{
     let updateOrder = [...orders]
     updateOrder.splice(index,1)
     localStorage.setItem("orders",JSON.stringify(updateOrder))
     setOrders(updateOrder)

     toast.error("Order Deleted",{
      position: "top-right",
      autoClose: 3000
   })

    }

  
    



  return (
 <div className='mt-40 min-[500px]:mt-30'>
 <div className='max-w-[1300px] mx-auto mt-5 px-2 flex flex-col gap-2 sm:flex-row'>  
     <div className='w-full sm:w-[35%]'>
       <div className='border-[1px] border-gray-300 h-[300px] p-4 bg-white rounded-md shadow-md'>
           <h1 className='text-2xl font-medium text-center'>My Profile</h1>
           <div className='flex flex-col items-start gap-2 mt-10'>
             <h2 className='text-xl font-medium'>Name: <span className='text-[14px] text-gray-800'>{User?.name || "Name Not available"}</span></h2>
             <h3 className='text-xl font-medium'>Email: <span className='text-[14px] text-gray-800'>{User?.email || "Email Not available"}</span></h3>
            </div>
         </div> 
      </div>
      {/*mobile screen 640px se uper block hai or 640 px se niche hidden   */}
       <div className='border-[1px] border-gray-300 bg-white shadow-md rounded-md w-full sm:w-[65%] hidden sm:block'>
            <div>
                <h1 className='text-2xl font-bold text-center'>Your Orders</h1>
                
                {
                  orders.length === 0 ? (
                    <p className='font-sm text-center font-medium mt-16'> Opps! No Orders Found</p>
                  ):(
                    <ul>
                {
                  orders.map((order,index)=>(
                    <li key={index} className='p-2'>
                    <strong>Order #{index+1}</strong> - ₹ {order.totalAmount}
                    <p>📅 {order.OrderDate}</p>
                    {/* order cart item */}
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 '>
                    {
                      order.cartItems.map((item,i)=>(
                        <div key={i} className='border-[1px] border-gray-300 shadow-md rounded-md h-full flex flex-col items-center mt-2'>
                        <img src={`${API_URL}${item.image}`} alt="" className='h-20 w-20 object-contain rounded-md' />
                        <p className='text-sm'>{item.name}</p>
                        <p className='font-medium'>₹{item.price}</p>
                      </div>
                      ))
                    }
                    </div>
                    <button onClick={()=>{deleteOrder(index)}} className='mt-4 cursor-pointer rounded-md bg-orange-700 text-white w-35 h-10 hover:bg-transparent hover:text-black hover:border-[1px] text-md transition'>Delete Order</button>
                  </li>
                  ))
                }

                </ul>
                  )
                }
            </div>
       </div>

       {/* mobile screen 640 px se uper hidden hai  Order */}
       <div className='border-[1px] border-gray-300 shadow-md rounded-md bg-white block w-full sm:hidden'>
       <div>
                <h1 className='text-2xl font-bold text-center'>Your Orders</h1>
                
                <ul>
                
                {
                  orders.length === 0 ? (
                    <p className='font-sm text-center font-bold mt-14 pb-2'> Opps! No Orders Found</p>
                  ):(
                    <ul>
                {
                  orders.map((order,index)=>(
                    <li key={index} className='p-2'>
                    <strong>Order #{index+1}</strong> - ₹ {order.totalAmount}
                    <p>📅 {order.OrderDate}</p>
                    {/* order cart item */}
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 '>
                    {
                      order.cartItems.map((item,i)=>(
                        <div key={i} className='border-[1px] border-gray-300 rounded-md shadow-md h-full flex flex-col items-center mt-2'>
                        <img src={`${API_URL}${item.image}`} alt="" className='h-20 w-20 object-contain rounded-md' />
                        <p className='text-sm'>{item.name}</p>
                        <p className='font-medium'>₹{item.price}</p>
                      </div>
                      ))
                    }
                    </div>
                    <button onClick={()=>{deleteOrder(index)}} className='mt-4 cursor-pointer rounded-md bg-orange-700 text-white w-35 h-10 hover:opacity-90 sm:hover:bg-transparent sm:hover:text-black sm:hover:border-[1px] text-md transition'>Delete Order</button>
                  </li>
                  ))
                }

                </ul>
                  )
                }
                
                </ul>
            </div>
       </div>
  </div>
 </div>
  )
}

export default Profile






