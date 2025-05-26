import React from 'react';

const FeatureHighlights = () => {
    const highlights = [
        { icon: '📝', label: 'Posts' },
        { icon: '📸', label: 'Albums' },
        { icon: '✅', label: 'Todos' },
        { icon: '💬', label: 'Comments' }
    ];

    return (
        <div className="mt-3 pt-3">
            <div className="row text-center text-white-50">
                {highlights.map((highlight, index) => (
                    <div key={index} className="col-3 mb-2">
                        <div className="mb-1">
                            <span style={{ fontSize: '1.5rem' }}>{highlight.icon}</span>
                        </div>
                        <small style={{ fontSize: '0.75rem' }}>{highlight.label}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureHighlights;