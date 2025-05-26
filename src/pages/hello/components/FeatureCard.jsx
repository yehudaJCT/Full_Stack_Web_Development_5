import React from 'react';

const FeatureCard = ({ icon, title, description, bgColor = 'bg-primary' }) => {
    return (
        <div className="col-md-4">
            <div className="card h-100 border-0 shadow" style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease',
                cursor: 'default'
            }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="card-body text-center p-3">
                    <div className="mb-2">
                        <div className={`d-inline-flex align-items-center justify-content-center rounded-circle ${bgColor} text-white`} 
                             style={{ width: '45px', height: '45px', fontSize: '18px' }}>
                            {icon}
                        </div>
                    </div>
                    <h6 className="card-title text-dark fw-bold mb-2">{title}</h6>
                    <p className="card-text text-muted small">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;