// components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
    title: string;
    content: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, content }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default MyComponent;
