import React from 'react'

const NavBar = ({showLogInHandler, showRegisterHandler, showlogOut, logoutHandler} ) => {
  const firmName = localStorage.getItem('vendorFirmName') || 'Firm Name: Not Set';
  return (
      <div className='navSection'>
        <div className='company'>
            vendor Dashboard
        </div>
        <div>{firmName}</div>
        <div className='userAuth'>
           {!showlogOut ?  <>
           <span onClick={showLogInHandler}>Login / </span>
          <span onClick={showRegisterHandler}>Register</span>
          </> : <span onClick={logoutHandler}
          className='logout'
          >Logout</span>  }
            
            
        </div>
      </div>
  )
}

export default NavBar
