import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <div className="text-center mb-3">
            <div className="row justify-content-center g-2">
                <div className="col-auto">
                    <Link 
                        to="/login" 
                        className="btn btn-light btn-lg px-4 py-2 fw-bold text-primary border-0 shadow"
                        style={{
                            transition: 'all 0.3s ease',
                            transform: 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                        }}
                    >
                        <span className="me-2">🔑</span>
                        Sign In
                    </Link>
                </div>
                <div className="col-auto">
                    <Link 
                        to="/register" 
                        className="btn btn-outline-light btn-lg px-4 py-2 fw-bold border-2"
                        style={{
                            transition: 'all 0.3s ease',
                            transform: 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        <span className="me-2">🚀</span>
                        Get Started
                    </Link>
                </div>
            </div>
            
            <div className="mt-3">
                <small className="text-white-50">
                    New to UserHub? Registration takes less than 2 minutes
                </small>
            </div>
        </div>
    );
};

export default CTASection;