
import React from 'react'

function AllProductSkelaton() {
  return (
 

    <div>
   
    <section className='py-6 mt-32 min-[500px]:mt-25' id="product-section">
    
        
    
     <div className='w-full max-w-[1300px] mx-auto'>
       
            
      <div className='flex w-full gap-2'>
       
             <div className='w-[22%] min-h-[500px] p-0.5 sm:p-2 hidden min-[625px]:block bg-white rounded-md'>
               <div className='h-6 sm:h-8 w-full max-w-[220px] bg-gray-300 rounded-md animate-pulse'></div>
            <div className='mt-6'>
            {
                Array(7)
                .fill()
                .map((_,index)=>(
                  <div key={index} className='h-6 sm:h-8 w-full max-w-[160px] bg-gray-300 rounded-md animate-pulse mt-2'></div>
                ))
              }
            </div>

            <div className='h-6 sm:h-8 w-full max-w-[220px] bg-gray-300 rounded-md animate-pulse mt-6'></div>

            <div className='mt-6'>
            {
                Array(3)
                .fill()
                .map((_,index)=>(
                  <div key={index} className='h-6 sm:h-10 w-full max-w-[200px] bg-gray-300 rounded-md animate-pulse mt-2'></div>
                ))
              }
            </div>
               
            </div> 
         
           <div className='w-full min-[625px]:w-[78%] bg-white rounded-md'>
           
           <div className='grid grid-cols-1 min-[475px]:grid-cols-2 min-[630px]:grid-cols-2 min-[960px]:grid-cols-3 lg:grid-cols-3 gap-4 p-2'>
                 
            {
              Array(13)
              .fill()
              .map((_,index)=>(
                <div key={index} className='min-h-[300px] rounded-md animate-pulse space-y-2'>
                <div className='h-40 bg-gray-300 rounded-md'></div>
                <div className='h-5 w-3/4 bg-gray-300 rounded-md'></div>
                <div className='h-4 w-1/2 bg-gray-300 rounded-md'></div>
                <div className='h-10 w-full bg-gray-300 rounded-md'></div>
               </div>  
              ))
            }
                 
            
                 
             
             
           </div> 
         </div>  
      </div>
         
    </div>
    
    
    </section>
     </div>

 
 
  )
}

export default AllProductSkelaton




