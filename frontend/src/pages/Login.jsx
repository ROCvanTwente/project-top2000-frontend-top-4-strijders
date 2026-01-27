import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState([]);
    const { login } = useAuth();

    const [fetchErrorMessage, setFetchErrorMessage] = useState('');

    return (
        <div className="container-lg pt-5">
            <div className="row d-flex justify-content-center flex-direction-center">
                <div className="col-10 col-md-6 col-sm-6 col-lg-4 shadow rounded p-4 bg-white">
                    <h5 className="text-center text-danger mb-4"><span>
                        <i class="bi icons-standard bi-box-arrow-in-right me-3"></i>
                        Inloggen
                    </span></h5>
                    {fetchErrorMessage && (
                        <div className=" mt-3 alert alert-danger alert-dismissible fade show" role="alert">
                            {fetchErrorMessage}
                        </div>
                    )}
                    {/* Username */}
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="text"
                            className="form-control login-input rounded-pill"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {console.log(errorMessage)}
                        {errorMessage[0] == null ? (
                            <p></p>
                        ) : (
                            <p className='m-0 text-danger'>{errorMessage[0][0]}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="form-label">Wachtwoord</label>
                        <input
                            type="password"
                            className="form-control login-input rounded-pill"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage[1] == null ? (
                            <p></p>
                        ) : (
                            <p className='m-0 text-danger'>{errorMessage[1]}</p>
                        )}
                    </div>

                    {/* Button */}
                    <button onClick={async () => {
                        const resErrorMessage = await login(email, password);
                        if (typeof resErrorMessage != 'string') {
                            setErrorMessage(resErrorMessage);
                            setFetchErrorMessage('')
                        } else {
                            setFetchErrorMessage(resErrorMessage);
                            setErrorMessage('');
                        }
                    }} className="btn figma-red text-white w-100 rounded-pill py-2">
                        Inloggen
                    </button>

                    <p className='text-center pt-3'>
                        Nog geen account?{" "}
                        <Link to="/register" className="register-link">
                            Registreer hier
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

