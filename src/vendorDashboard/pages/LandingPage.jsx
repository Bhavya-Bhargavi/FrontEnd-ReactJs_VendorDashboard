import React , {useEffect, useState} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/forms/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showAddFirm, setShowAddFirm] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [showlogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);
    const [showUserDetails, setShowUserDetails] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('vendorToken');
      if (token) {
        setShowLogin(false);
        setShowRegister(false);
        setShowLogOut(true);
      }
    },[]);

    useEffect(() => {
      const firmName = localStorage.getItem('vendorFirmName');
      const firmId = localStorage.getItem('vendorFirmId')
      if(firmName || firmId ){
          setShowFirmTitle(false)
          setShowWelcome(true)
      }
  },[])


    const logoutHandler = () => {
        localStorage.removeItem('vendorToken');
        localStorage.removeItem('vendorFirmId');
        localStorage.removeItem('vendorFirmName');
        setShowLogin(true);
        setShowRegister(false);
        setShowLogOut(false);
        setShowFirmTitle(true);
    }
    const showLogInHandler = () => {
        setShowLogin(true);
        setShowRegister(false);
        setShowAddFirm(false);
        setShowAddProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
        setShowLogOut(false);
    }
    const showRegisterHandler = () => {
        setShowLogin(false);
        setShowRegister(true);
        setShowAddFirm(false);
        setShowAddProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
        setShowLogOut(false);
    }
    const showAddFirmHandler = () => {
      if (showlogOut) {
        setShowLogin(false);
        setShowRegister(false);
        setShowAddFirm(true);
        setShowAddProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
      }else {
      alert("please login")
      setShowLogin(true)
    }
    }
    const showAddProductHandler = () => {
      if (showlogOut) {
        setShowLogin(false);
        setShowRegister(false);
        setShowAddFirm(false);
        setShowAddProduct(true);
        setShowWelcome(false);
        setShowAllProducts(false);
      }else {
      alert("please login")
      setShowLogin(true)
    }
    }
    const showWelcomeHandler = () => {
        setShowLogin(false);
        setShowRegister(false);
        setShowAddFirm(false);
        setShowAddProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  }
  const showAllProductsHandler = () => {
    if (showlogOut) {
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFirm(false);
      setShowAddProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);

    } else {
      alert("please login")
      setShowLogin(true)
    }
  }
  return (
    <>
      <NavBar showLogInHandler={showLogInHandler} showRegisterHandler={showRegisterHandler} showlogOut={showlogOut} logoutHandler={logoutHandler} />
      <div className='collectionSection'>
      <SideBar showAddFirmHandler={showAddFirmHandler} showAllProductsHandler={showAllProductsHandler} showAddProductHandler={showAddProductHandler} showFirmTitle={showFirmTitle}/>
      
      {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
      {showRegister && <Register showLogInHandler={showLogInHandler}/> }
      {showAddFirm && showlogOut && <AddFirm /> }
      {showAddProduct && showlogOut && <AddProduct /> }
        {showWelcome && <Welcome />}
        {showAllProducts && showlogOut && <AllProducts /> }
      </div>
    </>
  )
}

export default LandingPage
