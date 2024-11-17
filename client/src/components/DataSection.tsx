// src/components/DataSection.tsx
import { ReactNode } from 'react';

interface DataSectionProps {
    title: string;
    data: any;
}

const DataSection: React.FC<DataSectionProps> = ({ title, data }) => (
    <div className="mb-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(data, null, 2)}
        </pre>
    </div>
);

export default DataSection;
