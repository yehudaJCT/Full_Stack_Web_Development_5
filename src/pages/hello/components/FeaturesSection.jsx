import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
    const features = [
        {
            icon: '👤',
            title: 'User Management',
            description: 'Create accounts, manage profiles, and handle authentication.',
            bgColor: 'bg-primary'
        },
        {
            icon: '📊',
            title: 'Data Visualization',
            description: 'Manage posts, albums, todos, and comments easily.',
            bgColor: 'bg-success'
        },
        {
            icon: '⚡',
            title: 'Modern Tech Stack',
            description: 'Built with React, Bootstrap, and modern practices.',
            bgColor: 'bg-info'
        }
    ];

    return (
        <div className="row g-3 mb-4">
            {features.map((feature, index) => (
                <FeatureCard 
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    bgColor={feature.bgColor}
                />
            ))}
        </div>
    );
};

export default FeaturesSection;