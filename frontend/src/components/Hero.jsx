import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-scroll";






const productsSlide = [
  {id:1 ,name: "product1", description: "Upgrade your style with our premium men's clothing collection",img:"/images/TmensSlide.png"},
  {id:2 ,name: "product2", description: "Trendy outfits and accessories to elevate your look",img:"/images/TgirlSlide.png"},
  {id:3 ,name: "product3", description: "Comfortable and stylish clothing for your little ones",img:"/images/TkidsSlide.png"},
  {id:4 ,name: "product4", description: "Latest smartphones with cutting-edge technology",img:"/images/TphoneSlide.png"},
  {id:5 ,name: "product5", description: "Powerful and efficient laptops for work and play",img:"/images/TlaptopSlide.png"},
  { id: 6, name: "product6", description: "Experience immersive sound with our premium noise-canceling headphones", img: "/images/TheadSlide.png" },
  { id: 7, name: "product7", description: "Step up your style with our latest collection of trendy and comfortable shoes", img: "/images/TshoesSlide.png" },
  { id: 8, name: "product8", description: "Enhance your elegance with our exclusive jewelry collection for every occasion", img: "/images/TjwellarySlide.png" }
  
]

function Hero() {

  const [currentindex ,setCurrentIndex] = useState(0)


  const nextslide = ()=>{
    setCurrentIndex((prevslide) =>(
      (prevslide + 1) % (productsSlide.length)
    ))
  }

  const prevslide = ()=>{
    setCurrentIndex((prevslide)=>(
      prevslide === 0 ? productsSlide.length -1 : prevslide -1
    ))
  }

  useEffect(()=>{
    const interval = setInterval(() => {
       nextslide()
    }, 3000);

    return () => clearInterval(interval)
      
    

    
  },[nextslide])

  return (
    <main className='mt-36 min-[500px]:mt-35'>
       <div className='max-w-[1300px] p-2 mx-auto'>
          <div className='w-full'>
             <div className='w-full relative h-[60vh]'>
               <img src={productsSlide[currentindex].img} alt="" className='w-full h-full object-contain'/>
               <div className='bg-black opacity-60 absolute w-full top-0 left-0 right-0 bottom-0 flex justify-center items-center rounded-md'>
                  <div className='text-center text-white px-20'>
                    <h1 className='text-white text-[22px] md:text-3xl'>{productsSlide[currentindex].description}</h1>
                  </div>
               </div>
               {/* left arrow */}
               <button onClick={prevslide} className='absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer bg-gray-700 rounded-full text-white opacity-80 hover:bg-gray-900 transition'>
                  <MdKeyboardArrowLeft className='w-9 h-9  md:w-12 md:h-12'/>
               </button>

               {/* right arrow */}
               <button onClick={nextslide} className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer bg-gray-700 rounded-full text-white opacity-80 hover:bg-gray-900 transition'>
                <MdKeyboardArrowRight className='w-9 h-9 md:w-12 md:h-12'/>
               </button>
             </div>
          </div>



       {/* latest items */}
        <div className='flex justify-center items-center mt-5'>
          <Link to="product-section" smooth={true} duration={500}>
          <button className='bg-orange-700 px-8 py-3 text-xl text-white font-semibold hover:opacity-90 transition cursor-pointer sm:hover:bg-transparent sm:hover:text-black sm:hover:transition sm:hover:border-[2px]'>
           Explore Products</button>
          </Link>
        </div>
           {/* latest items */}

 
    
       </div>

    </main>
  )
}

export default Hero;
