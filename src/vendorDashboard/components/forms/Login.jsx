import React, {useState} from 'react'
import { API_URL } from '../../helpers/ApiPath';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);  

  const loginHandler = async (e) => {
    console.log("Login handler called");
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log("Login response:", data);
        if (response.ok) {
        console.log(data);
        localStorage.setItem('vendorToken', data.token);
        setEmail("");
        setPassword("");
        alert("Login successful");
        showWelcomeHandler(); 
      } 
      const vendorId = data.vendorId; // Assuming the response contains the vendorId
      console.log("checking vendorId:", vendorId);
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponse.json();
      console.log("Vendor data:", vendorData);
      const vendorFirmName = vendorData.vendor.firm[0].firmName;
        console.log("Vendor firm name:", vendorFirmName);
      if( vendorResponse.ok) {
        
        console.log("Vendor res:", vendorResponse);
        localStorage.setItem('vendorFirmName', vendorFirmName); // Store the vendorFirm
        localStorage.setItem('vendorFirmId', vendorData.vendorFirmId); // Store the vendorId in local storage
        
        window.location.reload(); // Reload the page to reflect the changes
      }
    } catch (error) {
      console.error(error);
      alert("Login failed, please try again later");
    }
  }
  return (
    <div className="loginSection">
      
      <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label>Email:</label>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your Email' /><br />
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' /><br />
        <div className='btnSubmit'>
            <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login
