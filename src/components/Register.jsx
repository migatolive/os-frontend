import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';

const baseURL = "http://migato.live/register";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', password_confirmation: '' });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams = qs.stringify(formData);
            const fullURL = `${baseURL}?${queryParams}`;
            alert('Constructed URL: ' + fullURL); // Display the constructed URL
            const response = await axios.post(fullURL);
            console.log('Registration successful:', response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('An error occurred:', error);
            }
        }
    };

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <label htmlFor="text">
                        <span>Nombre del usuario</span>
                        <input type="text" id="text" name="name" value={formData.name} onChange={handleChange} required/>
                        {errors.name && <p>{errors.name[0]}</p>}
                    </label>
                    <label htmlFor="pass">
                        <span>Contraseña</span>
                        <input type="password" id="pass" name="password" value={formData.password} onChange={handleChange} required/>
                        {errors.password && errors.password.map((error, index) => <p key={index}>{error}</p>)}
                    </label>
                    <label htmlFor="email">
                        <span>Correo electronico</span>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                        {errors.email && <p>{errors.email[0]}</p>}
                    </label>
                    <label htmlFor="repetPass">
                        <span>Repita contraseña</span>
                        <input type="password" id="repetPass" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required/>
                    </label>
                </div>
                <input type="submit" value="Enviar" className="btn"/>

                <p>¿Ya tienes cuenta en Onyx? <a href="/login">Inicia sesión aquí</a></p>
            </form>
        </div>
    );
};

export default Register;
