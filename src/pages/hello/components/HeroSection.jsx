import React from 'react';

const HeroSection = () => {
    return (
        <div className="text-center text-white mb-4">
            <div className="mb-3">
                <div className="display-4 fw-bold mb-2" style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)'
                }}>
                    Welcome to UserHub
                </div>
                <div className="fs-5 mb-3 opacity-90" style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                    Your gateway to seamless user data management
                </div>
                <div className="fs-6 opacity-75 mx-auto" style={{ maxWidth: '500px' }}>
                    A modern full-stack web application built with React, featuring user authentication, 
                    profile management, and comprehensive data visualization tools.
                </div>
            </div>
        </div>
    );
};

export default HeroSection;