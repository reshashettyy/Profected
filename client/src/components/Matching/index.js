import React, { useState } from 'react';
import './Matching.css'; // Import CSS file for styling

export default function Matching() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const hardcodedUsername = "testuser";
        const hardcodedPassword = "testpassword";

        if (username.trim() === hardcodedUsername && password === hardcodedPassword) {
            if (rememberMe) {
                localStorage.setItem('username', username);
            } else {
                localStorage.removeItem('username');
            }
            alert("Login successful!");
        } else {
            alert("Invalid username or password.");
        }
    };

    return (
        <div className="login-container"> {/* Apply styling for centering */}
            <div className="login-box"> {/* Apply styling for box */}
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="checkbox" 
                            id="rememberMe" 
                            name="rememberMe" 
                            checked={rememberMe} 
                            onChange={(e) => setRememberMe(e.target.checked)} 
                        />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
