import React, {useState} from 'react'
import { API_URL } from '../../helpers/ApiPath';

const Register = ({showLogInHandler}) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      console.log(response, "response");
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUserName("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLogInHandler();
      } else {
        setError(data.error);
        alert("Registration Failed, Contact Admin")
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    } finally {
      setLoading(false); 
    }
  }
  return (
    <div className='registerSection'>
      <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label>UserName</label>
        <input type="text" placeholder='Enter your UserName' value= {username} onChange={(e) => setUserName(e.target.value)}/><br />
        <label>Email:</label>
        <input type="text" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}/><br />
        <label>Password:</label>
        <input type="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)}/><br />
        <div className='btnSubmit'>
            <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register
