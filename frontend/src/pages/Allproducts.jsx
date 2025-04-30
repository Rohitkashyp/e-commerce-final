
import React, { useEffect, useMemo, useState } from 'react'
import { Link ,useNavigate,useLocation } from 'react-router-dom'
import { useContext } from 'react';
import { Cartcontext } from '../context/CartContext';
import  axios  from 'axios'
import { FaTimes } from "react-icons/fa";
import AllProductSkelaton from '../components/AllProductSkelaton'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL= import.meta.env.VITE_API_URL;

const Categories = ["All","Men","Women","Kids","Electronics","Shoes","Jwellary"]
const SortOptions = ["none","lowtohigh","hightolow"]


function Allproducts() {

 const navigate  = useNavigate()
 const location = useLocation()

  const {Addtocart} = useContext(Cartcontext)
  const [products,setProduct]= useState([])
  const [sort,setSort] = useState('none')
  const [searchname,setSearchname] = useState('')
  const [filter,setFilter] = useState('All')
  const [isopen,setIsOpen] = useState(false)
  const [isloading,setIsloading] =useState(true)
  const [error,setError] =useState(null)


  useEffect(()=>{
    if(isopen){
      document.body.style.overflow = "hidden"
    }else{
        document.body.style.overflow = "auto"
    }
    return ()=>{
         document.body.style.overflow = "auto"
    };
  },[isopen])


  useEffect(()=>{
    const queryparams = new URLSearchParams(location.search)
    const searchquery = queryparams.get("query");
    setSearchname(searchquery ? searchquery.toLowerCase() : "");
  
  },[location.search])

    useEffect(()=>{
      const getProduct = async()=>{
       try {
        setError(null)
       const res = await axios.get(`${API_URL}/products`)
      
       await new Promise(resolve => setTimeout(resolve,300))
       setProduct(res.data)
       } catch (error) {
          console.log(error) 
          setError("Products Failed please try again!")
          setIsloading(false)
       }finally{
        setIsloading(false)
       }
      }
      getProduct()

    },[])

    

 

  
 const getfilertcateories = ()=>{
   if(!searchname.trim()){
    return Categories;
   }
   const searchTerm = searchname.toLowerCase().trim()
   const filterproduts = products.filter((product)=>
    product.name.toLowerCase().split(/\s+/).includes(searchTerm)
  )
 


   return ["All", ...new Set(filterproduts.map(product => product.category))]
 }
 
 
 

 

  const FinalFilterFunction = useMemo(() =>{
    let UpdatedProducts = [...products]

    if(searchname){
      UpdatedProducts = UpdatedProducts.filter((product)=>
        product.name.toLowerCase().includes(searchname)
      )
    }
    if(filter !== "All"){
      UpdatedProducts = UpdatedProducts.filter(product => product.category === filter);
    }

    if (sort === "lowtohigh") {
      UpdatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "hightolow") {
      UpdatedProducts.sort((a, b) => b.price - a.price);
    }

     return UpdatedProducts;
  },[products,searchname,filter,sort])

 

  const handlisOpenategories = (category) =>{
     setFilter(category)
     setIsOpen(false)
  }

  const handlisOpenSort = (option) =>{
    setSort(option)
    setIsOpen(false)
  }

  // ...................skelaton

  
    if(isloading){
      return <AllProductSkelaton/>
    }
  

  

  return ( 
 <div>
   
<section className='py-6 mt-28 min-[500px]:mt-25' id="product-section">

          {/* isOpen */}
     {
      isopen && (
 <div className='bg-black text-white fixed inset-0 z-50 overflow-hidden'>
   <div className='w-full h-full bg-white text-black absolute top-0 left-0 overflow-y-auto'>
        
        <button className='text-3xl cursor-pointer absolute top-2 right-2' onClick={()=>{setIsOpen(false)}}><FaTimes size={30}/></button>
     <div className='mt-5'>

                  
         <div className='px-4'>
          <h2 className='text-xl font-bold'>Jobs Categories</h2>
          <hr className='mt-2 text-gray-400' />
         <div className='flex flex-col items-start gap-1 mt-5'>
           {
              getfilertcateories().map((category,index)=>(
                <button key={index} onClick={()=>{handlisOpenategories(category)}} 
                className = {`border-[1px] cursor-pointer w-50 py-2 ${filter === category ? 'bg-blue-900 text-white': 'bg-gray-200 text-gray-700'} `}>
                  
                  {category}</button>
              ))
            }
          </div>

          <h2 className='text-xl font-bold mt-4'>Salary Range</h2>
          <hr className='mt-2 text-gray-400' />
          <div className='mt-4'>
            <ul className='flex flex-col items-start gap-2'>
            {
                  SortOptions.map((option,index) =>(
                    <li key={index} className='list-none'>
                      <button className='border-[1px] cursor-pointer py-2 bg-blue-900 w-50 text-white' onClick={()=>{handlisOpenSort(option)}}>
                       {option === 'none' ? 'Default' : option === 'lowtohigh' ? 'LowToHigh' :'HighToLow'}
                       </button>
                     </li> 
                  ))
                }
            </ul>
          </div>
         
         </div>
         
     </div>
  </div>
 </div> 
      )
     }

 <div className='w-full max-w-[1300px] mx-auto'>

{/* error show api fail */}
  {
   error &&  (
      <div className='flex justify-center items-center w-full max-w-[1300px] mx-auto h-[100px] mt-16 bg-white'>
       <p className='text-xl sm:text-2xl font-bold text-red-500'>{error}</p>
      </div>
    )
  }
  {/*error show no products  */}

  {!error && products.length === 0 && (
      <div className='flex justify-center items-center min-h-[100px] mt-16 w-full max-w-[1300px] mx-auto bg-white'>
        <p className='text-xl sm:text-2xl font-semibold text-red-500'>Opps! No Products Found</p>
      </div>
   )}
    {/*error show search products not found  */}
     {!error && products.length > 0 && FinalFilterFunction.length === 0 &&(
      <div className='flex justify-center items-center min-h-[100px] mt-16 w-full max-w-[1300px] mx-auto bg-white'>
        <p className='text-xl sm:text-2xl font-semibold'>Opps! No matching Products Serach</p>
      </div>
   )}
        
  <div className='flex w-full gap-2'>
    {
      searchname === '' && !error && FinalFilterFunction.length > 0 && (
        <>
         <div className={`w-[22%] min-h-[500px] hidden min-[625px]:block p-4 bg-white mt-2 rounded-md`}>
        <div>
          <h2 className='text-xl font-bold'>Jobs Categories</h2>
          <hr className='mt-2 text-gray-400' />
          <div className='flex flex-col items-start mt-4 gap-1'>
            {
            getfilertcateories().map((category,index)=>(
                <button key={index} onClick={()=>{setFilter(category)}} 
                
                className = {`border-[1px] w-25 cursor-pointer md:w-30 lg:w-40 py-2 hover:bg-transparent hover:border-[1px] border-black hover:text-black ${filter === category ? 'bg-blue-900 text-white': 'bg-gray-200 text-gray-700'} `}>
                  
                  {category}</button>
              ))
            }
          
          </div>

          <h2 className='text-xl font-bold mt-4'>Salary Range</h2>
          <hr className='mt-2 text-gray-400' />
          <div>
            <ul className='flex flex-col items-start mt-4 gap-2'>
                {
                  SortOptions.map((option,index) =>(
                    <li key={index} className='list-none'>
                      <button className='border-[1px] cursor-pointer py-2 md:py-3 text-sm md:text-md bg-blue-900 w-25 md:w-35 lg:w-50 text-white' onClick={()=>{setSort(option)}}>
                       {option === 'none' ? 'Default' : option === 'lowtohigh' ? 'LowToHigh' :'HighToLow'}
                       </button>
                     </li> 
                  ))
                }
            </ul>
          </div>

        </div>
     </div> 
        </>
      )
    }
     <div className={`w-full min-[625px]:${searchname === '' ? 'w-[78%]' : 'w-full'} w-full`} >
        <div className='min-[625px]:hidden'>
             <div className='p-2 w-full min-[625px]:max-w-[90%] mx-auto'>
               <div className='flex justify-between items-center gap-4 w-full'>
                 <div className={`${FinalFilterFunction.length > 0 ? 'block' :'hidden'} min-[625px]:hidden mb-2`}>
                   <button onClick={()=>{setIsOpen(true)}} className='border-[0.5px] text-[18px] font-normal border-gray-800 rounded-md px-2 py-2 min-[478px]:px-6 min-[478px]:py-2 text-black cursor-pointer'>Filter By Categories & Price</button>
                 </div>
                </div>
             </div>
        </div>
        {/*  */}

        {
          !error && FinalFilterFunction.length > 0 && (

            <div className='grid grid-cols-1 min-[475px]:grid-cols-2 min-[630px]:grid-cols-2 min-[960px]:grid-cols-3 lg:grid-cols-3 gap-4 p-2'
style={{display: FinalFilterFunction.length === 0 ? 'flex' : "grid",justifyContent:"center",alignItems:"center",minHeight:"400px" }}>
      
      {
   
         FinalFilterFunction.map((product)=>(
           <Link key={product.id} to={`/productdetail/${product.id}`}
            onClick={()=> {window.scroll(0,0)}}>
                 <div className='min-h-[300px] bg-white shadow-xl rounded-md'>
                  <div className='h-[180px] flex justify-center items-center overflow-hidden'>
                      <img src={`${API_URL}${product.image}`} alt={product.name} className='h-full w-full object-contain scale-100 hover:scale-110' />   
                  </div>
                  <div className='h-[170px] mt-2 px-2'>
                       <h2 className='text-2xl font-semibold'>{product.name}</h2> 
                       <p className='text-sm text-gray-500 mt-1'>{product.description}</p> 
                       <p className='text-md mt-0.5'>Price <span className='text-xl text-orange-700'>₹{product.price}</span></p>
                       <div className='flex justify-between items-center mt-4 gap-2'>
                         <button className='rounded-md bg-orange-700 text-white px-4 min-[450px]:px-3 min-[590px]:px-4 py-1 text-[18px] min-[450px]:text-[15px] min-[590px]:text-[18px] transition hover:opacity-90 sm:hover:bg-transparent cursor-pointer sm:hover:text-black hover:border-[2px]'
                          onClick={(e)=>{
                           e.stopPropagation() 
                           e.preventDefault()
                           navigate(`/productdetail/${product.id}`)
                           window.scroll(0,0)
                          }}>BuyNow</button>
                         <button className='rounded-md bg-orange-700 text-white px-4 min-[450px]:px-3 min-[590px]:px-4 py-1 text-[18px] min-[450px]:text-[15px] min-[590px]:text-[18px] transition hover:opacity-90 sm:hover:bg-transparent cursor-pointer sm:hover:text-black hover:border-[2px]'
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
           
            ))

      }  
  </div> 
          )
        }

     </div>  
  </div>
     
</div>


</section>
 </div>
  )
}

export default Allproducts












































 












