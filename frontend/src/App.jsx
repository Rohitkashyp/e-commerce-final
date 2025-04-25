
import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ProductsList from './components/ProductsList'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Productdetails from './pages/Productdetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Allproducts from './pages/Allproducts'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile'
import PagenotFound from './pages/PagenotFound'
import Protected from './Protected/Protected'
import Changepassword from './pages/Changepassword'
import ForgetPassword from './pages/Forgetpassword'
import Layout from './Layout'
import MinFooterLayout from './MinFooterLayout'
import FullPageLoading from './components/FullPageLoading'


function App() {

  const [isLoding,setIsLoading]= useState(true)

  useEffect(()=>{
    
   setTimeout(() => {
      setIsLoading(false)
     }, 2000);
  },[])

 
  return (

<Router> 
<ToastContainer /> 
{
  isLoding ? (
    <FullPageLoading/>
  ):(
    <Routes>
  <Route element={<Layout/>}>
      {/* home fofile allproducts,cart,etc.. */}
      <Route path='/' element={<><Hero/><ProductsList/></>}/>
      <Route path='/productdetail/:id' element={<Productdetails/>}/>
      <Route path='/cart' element={<Protected><Cart/></Protected>}/>
      <Route path='/checkout' element={<Protected><Checkout/></Protected>}/>
      <Route path='/profile' element={<Protected><Profile/></Protected>}/>
      <Route path='/all_products' element={<Allproducts/>}/> 

  </Route>


{/* Login signup changepassword forgetpassword */}

<Route element={<MinFooterLayout/>}>
{/* Login signup changepassword forgetpassword */}

<Route path='/sign_up' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/change-password' element={<Changepassword/>}/>
<Route path='/forget-password' element={<ForgetPassword/>}/>

</Route>

<Route path='*' element={<PagenotFound/>}/>
</Routes> )}



</Router> 

  )




  
}

export default App


