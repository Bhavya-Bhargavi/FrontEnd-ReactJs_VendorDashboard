import React from 'react'

const SideBar = ({showAddFirmHandler, showAddProductHandler, showAllProductsHandler, showFirmTitle}) => {
  return (
    <div className='sideBarSection'>
      <ul>
    {showFirmTitle ? <li onClick={showAddFirmHandler}>Add Firm</li> : " "}
        
        <li onClick={showAddProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}> All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  )
}

export default SideBar
