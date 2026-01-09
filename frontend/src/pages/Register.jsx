import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    return (
        <div className="container-lg pt-5">
            <div className="row d-flex justify-content-center flex-direction-center">
                <div className="col-10 col-md-6 col-sm-6 col-lg-4 shadow rounded p-4 bg-white">

                    <h5 className="text-center text-danger mb-4"><span>
                        <i class="bi icons-standard bi-person-plus me-3"></i>
                        Registeren
                    </span></h5>

                    {/* Username */}
                    <div className="mb-3">
                        <label className="form-label">Gebruikersnaam</label>
                        <input
                            type="text"
                            className="form-control login-input rounded-pill"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Herhaal wachtwoord</label>
                        <input
                            type="password"
                            className="form-control login-input rounded-pill"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}

                        />
                    </div>

                    {/* Button */}
                    <button className="btn btn-danger w-100 rounded-pill py-2">
                        Inloggen
                    </button>

                    <p className='text-center pt-3'>
                        Al een account?{" "}
                        <Link to="/login" className="login-link">
                            Inloggen
                        </Link>
                    </p>

                </div>
            </div>
        </div>

    )
}

