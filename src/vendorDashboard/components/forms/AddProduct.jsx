import React from 'react'
import { API_URL } from '../../helpers/ApiPath';

const AddProduct = () => {
    const [productName, setProductName] = React.useState('');
    const [price, setPrice] = React.useState('');   
    const [category, setCategory] = React.useState([]);
    const [bestSeller, setBestSeller] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [productImage, setProductImage] = React.useState(null);
    const handleAddProduct = async (e) => {
        e.preventDefault(); 
        try {
            const loginToken = localStorage.getItem('vendorToken');
            const firmId = localStorage.getItem('vendorFirmId');
            if (!loginToken || !firmId) {
                alert("You must be logged in to add a product");   
                return;
            }
             // Retrieve the firmId from local storage            
            const formData = new FormData();
            formData.append('token', loginToken); // Append the token to the form data
            formData.append('firmId', firmId); // Append the firmId to the form
            formData.append('productName', productName);
            formData.append('price', price);
            category.forEach((value) => {
                formData.append('category', value); 
            });
            formData.append('bestSeller', bestSeller);
            formData.append('description', description);
            formData.append('image', productImage);
            const response = await fetch(`${API_URL}/Product/add-product/${firmId}`, {
                method: 'POST',
                headers: {
                    token: loginToken,
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setProductName("");
                setPrice("");
                setCategory([]);
                setBestSeller(false);
                setDescription("");
                setProductImage(null);
                
            } else {
                alert(data.error || "Failed to add product, please try again");
            }
            
        } catch (error) {
            console.error("Error adding product", error);
            
        }
    }
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };
    const handleBestSellerChange = (e) => {
        const value = e.target.value === 'true';
        setBestSeller(value);  
    }
    const handleImageHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProductImage(file);
    } else {
        setProductImage(null);
    }
}
  return (
    <div className="firmSection">
        <form className='tableForm' onSubmit={handleAddProduct}>
            <h3> Add Product</h3>
            <label>Product Name</label>
            <input type="text" placeholder='Enter Product Name' value={productName} onChange={(e) => setProductName(e.target.value)}/> <br />
            <label>price</label>
            <input type="text" placeholder='Enter Product Price' value={price} onChange={(e) => setPrice(e.target.value)}/><br />
            <div className='checkInp'>
                <label>Category</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                    <label htmlFor="veg">Veg</label>
                    <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
                    </div>
                <div className="checkboxContainer">
                    <label htmlFor="non-veg">Non-veg</label>
                    <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
                </div>
            </div>
            </div>
            <div className='checkInp'>
            <label>Best Seller</label>
            <div className="inputsContainer">
                <div className="checkboxContainer">
                    <label htmlFor="yes">Yes</label>
                    <input type="radio" value="true" checked={bestSeller === true} onChange={handleBestSellerChange}/>
                    </div>
                <div className="checkboxContainer">
                    <label htmlFor="no">No</label>
                    <input type="radio" value="false" checked={bestSeller === false} onChange={handleBestSellerChange}/>
                </div>
            </div>
            </div>
            <label>Description</label>
            <input type="text" placeholder='Enter offer' value={description} onChange={(e) => setDescription(e.target.value)}/><br />
            <label>Product Image</label>
            <input type="file" onChange={handleImageHandle}/>
            <div className='btnSubmit'>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct
