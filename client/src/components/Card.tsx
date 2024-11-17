// src/components/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
    title: string;
    children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {children}
    </div>
);

export default Card;
