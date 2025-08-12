import React, {useState} from 'react'
import { API_URL } from '../../helpers/ApiPath';

const AddFirm = () => {
    const  [firmName, setFirmName] = useState('');
    const  [area, setArea] = useState('');      
    const  [category, setCategory] = useState([]);
    const  [region, setRegion] = useState([]);
    const  [offer, setOffer] = useState('');
    const [file, setFile] = useState(null);
    const  [firmImage, setFirmImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
const handleFirmSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); // Set loading to true when the request starts
    try {
const loginToken = localStorage.getItem('vendorToken');
if (!loginToken) {
    alert("You must be logged in to add a firm");   
    return;
}
        const formData = new FormData(); //instance of FormData to handle file uploads
        //formData.append('token', loginToken); // Append the token to the form data  
        formData.append('firmName', firmName);
        formData.append('area', area);
        category.forEach((value) => {
            formData.append('category', value); 
        });
        region.forEach((value) => {
            formData.append('region', value);
        });
        formData.append('offer', offer);
        formData.append('image', firmImage);
        const response = await fetch(`${API_URL}/firm/add-firm`, {
            method: 'POST',
            headers: {
                token: loginToken,
            },
             body: formData
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            const firmId = data.firmId; // Assuming the response contains the firmId
            localStorage.setItem('firmId', firmId); // Store the firmId in local storage
            setFirmName("");
            setArea("");
            setCategory([]);
            setRegion([]);
            setOffer("");
            setFirmImage(null);
            alert("Firm added successfully");            
        } else if(data.message === 'vendor can have only one firm') {
            alert(data.message);
        }
        else {
            setError(data.error);   
            alert("Failed to add firm, please try again");
        }
    } catch (error) {
        console.error("Error adding firm", error);

        alert("Error adding firm, please try again later");
    } finally { 
        setLoading(false); // Set loading to false when the request completes
    }
}       

const handleCategoryChange = (e) => {
    const { value, checked } = e.target;    
    if (checked) {
        setCategory((prev) => [...prev, value]);
    } else {
        setCategory((prev) => prev.filter((item) => item !== value));
    }   
}
const handleRegionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
        setRegion((prev) => [...prev, value]);
    } else {
        setRegion((prev) => prev.filter((item) => item !== value));
    }

}
const handleImageHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFirmImage(file);
    } else {
        setFirmImage(null);
    }
}
  return (
    <div className="firmSection">
        <form className='tableForm' onSubmit ={handleFirmSubmit}>
            <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type="text" placeholder='Enter Firm Name' name="firmName" value={firmName} onChange={(e) => setFirmName(e.target.value)}/> <br />
            <label>Area</label>
            <input type="text" placeholder='Enter Firm Area' name="area" value={area} onChange={(e) => setArea(e.target.value)}/><br />
            <div className='checkInp'>
                <label>Category</label>
                <div className="inputsContainer">
                <div className="regBoxContainer">
                    <label htmlFor="veg">Veg</label>
                    <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
                    </div>
                <div className="regBoxContainer">
                    <label htmlFor="non-veg">Non-veg</label>
                    <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
                </div>
            </div>
            </div>
            <div className='checkInp'>
                <label>Region</label>
                <div className="inputsContainer">
                <div className="regBoxContainer">
                    <label htmlFor="south-indian">South-Indian</label>
                    <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange}/>
                    </div>
                <div className="regBoxContainer">
                    <label>North-Indian</label>
                    <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange}/>
                </div>
                <div className="regBoxContainer">
                    <label>Chinese</label>
                    <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange}/>
                </div>
                <div className="regBoxContainer">
                    <label>Bakery</label>
                    <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange}/>
                </div>
            </div>
            </div>
            <label>Offer</label>
            <input type="text" placeholder='Enter offer' name="offer" value={offer} onChange={(e) => setOffer(e.target.value)}/><br />
            <label>Firm Image</label>
            <input type="file" onChange={handleImageHandle}/>
            <div className='btnSubmit'>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm
