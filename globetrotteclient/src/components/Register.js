import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { username });
            console.log('response.data._id',response.data._id);
            sessionStorage.setItem('userId', response.data._id); // Store user ID in session storage
            alert('Registration successful!');
        } catch (error) {
            setError('Failed to register user');
            console.error(error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter your username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <button onClick={handleRegister}>Register</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Register; 