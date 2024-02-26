import React, { useState } from 'react';

export default function SignUp({ onBackToLogin }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement sign-up logic here
        // For testing purposes, let's just log the entered data
        console.log({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            userType,
            agreeTerms
        });
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Welcome!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
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
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userType">User Type:</label>
                        <select 
                            id="userType" 
                            name="userType" 
                            value={userType} 
                            onChange={(e) => setUserType(e.target.value)} 
                            required 
                        >
                            <option value="">Select User Type</option>
                            <option value="student">Student</option>
                            <option value="professional"> Industry Professional</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input 
                            type="checkbox" 
                            id="agreeTerms" 
                            name="agreeTerms" 
                            checked={agreeTerms} 
                            onChange={(e) => setAgreeTerms(e.target.checked)} 
                            required 
                        />
                        <label htmlFor="agreeTerms">I agree to the terms and conditions</label>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                {/* <div className="back-to-login">
                    <button onClick={onBackToLogin}>Back to Login</button>
                </div> */}
            </div>
        </div>
    );
}
