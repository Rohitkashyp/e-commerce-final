import React, { useEffect, useState } from 'react'

import {useParams,Link} from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react';
import { Cartcontext } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL= import.meta.env.VITE_API_URL;

function Productdetails() {

   const [product,setProduct] = useState([])
   const [selectedimg,setSelectedImg] =useState("")
   const [relatedproduct,setRelatedproducts] =useState([])
    const {Addtocart} = useContext(Cartcontext)

   const {id} = useParams()
   

   const fetchProduct = async()=>{
      
      try {
         const res = await axios.get(`${API_URL}/products/${id}`)
         console.log(res.data.category,res.data.id,"detalis") 
         fectchRelatedProducts(res.data.category,res.data.id)
         if(res.data){
            setProduct(res.data)
            setSelectedImg(res.data.image)
         }else{
            setProduct({})
         }
        
      } catch (error) {
         console.log(error)
         setProduct({})
      }
   }
   useEffect(()=>{
      fetchProduct()
   },[id])

   const fectchRelatedProducts = async(category,cuurentId)=>{
     try {
      const res = await axios.get(`${API_URL}/products`)
      console.log(res.data,"related...")
      const filterproduct = res.data.filter(
         (product)=> product.category === category && product.id !== cuurentId
      );
      setRelatedproducts(filterproduct)
     } catch (error) {
       console.log(error)
     }
   }
   console.log(relatedproduct,"final related product")

 
 
   if(!product ||  Object.keys(product).length === 0){
      return (
        
            <div className='mt-36 min-[500px]:mt-30'>
               <div className='w-full h-[300px] flex justify-center items-center rounded-md bg-white'>
                 <h1 className='text-2xl font-medium'>Product Searching...</h1>
               </div>
            </div>
       )
   }

   return (

      <div className='mt-36 min-[500px]:mt-30'>
         <div className='max-w-[1300px] mx-auto mt-5 px-2'>
                 
           <div className='w-full max-w-[1200px] mx-auto grid grid-cols-1 min-[510px]:grid-cols-1 min-[610px]:grid-cols-2 sm:grid-cols-2 md:[grid-template-columns:60%_40%] gap-6 overflow-hidden'>
                      <div className='border-[1px] border-gray-300 min-h-[300px] shadow-md rounded-md p-2 bg-white'>
                          <div className='flex justify-center items-center'>
                            <div className='border-[1px] border-gray-300 rounded-md h-[160px] w-[250px] overflow-hidden flex justify-center items-center'>
                               <img src={`${API_URL}${selectedimg}`} alt="img" className='h-40 w-full object-contain'/>
                            </div>
                          </div>
                          <div className='h-[140px] flex gap-1 mt-2 justify-center items-center'>
                              {
                                 product.relatedImages?.map((img,index)=>(
                             
                                     <div key={index} className='border-[1px] border-gray-900 rounded-md h-[130px] w-1/3 bg-white shadow-sm flex justify-center items-center p-2'>
                                      <img  src={`${API_URL}${img}`} alt="img" className='w-full h-30 object-contain cursor-pointer'
                                        onClick={()=>{setSelectedImg(img)}}
                                        onMouseEnter={()=>{setSelectedImg(img)}}

                                     />
                                    </div>
                                
                                   
                                 ))

                              }
                          </div>
                       </div>
                       <div className='border-[1px] border-gray-300 min-h-[300px] shadow-md rounded-md p-2 bg-white'>
                          <div className='flex flex-col items-start gap-6 mt-4 ml-6'>
                             <h1 className='text-3xl font-medium'>{product.name}</h1>
                             <p className='text-[18px] font-normal mt-10'>{product.description}</p>
                             <p className='text-[18px] font-normal mt-0.5'>Price: <span className='text-xl text-orange-700'>{product.price}</span></p>
                              <div className='flex justify-center items-center w-full'>
                                <button onClick={()=>{ 
                                 Addtocart({...product,image:selectedimg})
                                   toast.success('item added to cart!')
                              }}
                                 className='bg-orange-700 mt-8 px-6 sm:px-10 py-2 cursor-pointer font-normal rounded-md w-[75%] md:w-[70%] md:text-center text-[18px] text-white hover:opacity-90 transition sm:hover:bg-transparent sm:hover:text-black sm:hover:border-[2px]'>
                                 AddToCart</button>
                              </div>
                          </div>
                       </div>    
             </div>

             {/* Realted products */}
             {
               relatedproduct.length > 0 && 
               <>
             
                  <h2 className='text-2xl font-bold text-center mt-8'>Realated Products</h2>
                 
                 
                 <div className='grid grid-cols-1 min-[450px]:grid-cols-2 min-[639px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 min-[1200px]:!grid-cols-4 xl:grid-cols-4 gap-4 mt-4'>
                    
               
                 {relatedproduct.map((product)=>(
                     <Link key={product.id} to={`/productdetail/${product.id}`}>
                           <div className='min-h-[300px] bg-white shadow-xl rounded-md pb-1'>
                            <div className='h-[180px] flex justify-center items-center overflow-hidden'>
                                <img src={`${API_URL}${product.image}`} alt={product.name} className='h-full w-full object-contain scale-100 hover:scale-110' />   
                            </div>
                            <div className='h-[170px] mt-2 px-2'>
                                 <h2 className='text-2xl font-semibold'>{product.name}</h2> 
                                 <p className='text-sm text-gray-500 mt-1'>{product.description}</p> 
                                 <p className='text-md mt-0.5'>Price <span className='text-xl text-orange-700'>₹{product.price}</span></p>
                                 <div className='flex mt-4 gap-2'>
                                   <button className='bg-orange-700 w-full px-6 py-2 cursor-pointer text-white text-[18px] rounded-md transition hover:opacity-90 sm:hover:bg-transparent sm:hover:text-black sm:hover:border-[2px]'
                                    onClick={(e)=>{
                                      e.stopPropagation()
                                      e.preventDefault()
                                      Addtocart(product)
                                     toast.success('item added to cart!')
                                    }}>AddToCart</button>
                                 </div>
                            </div>
                       </div>
                     </Link>
                   
                      ))}
              </div>
             
               </>
             }
          </div>
         </div>
        )


}

export default Productdetails








