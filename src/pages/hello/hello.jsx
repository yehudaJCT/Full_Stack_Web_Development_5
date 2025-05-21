import React from 'react';
import { Link } from 'react-router-dom';

const Hello = () => {
    return (
        <div>
            <h1>Hello Page</h1>
            <p>
                Welcome to the Hello page! This project is a full stack web application designed to demonstrate modern web development techniques using React for the frontend and a backend of your choice. 
                You can register a new account or log in to access more features.
            </p>           <div style={{ marginTop: '20px' }}>
                <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default Hello;