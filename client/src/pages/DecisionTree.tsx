// src/pages/DecisionTree.tsx
import React, { useEffect, } from 'react';

// interface DecisionTreeData {

// }

const DecisionTree: React.FC = () => {
    // const [DTData, setDTData] = useState<any | null>(null);

    useEffect(() => {
        const fetchEdaData = async () => {
            try {
                const response = await fetch('http://localhost:8000/run-dt');
                const data = await response.json();
                console.log(data);
                // setDTData(data);
            } catch (error) {
                console.error('Error fetching dt data:', error);
            }
        };

        fetchEdaData();
    }, []);

    // if (!DTData) {
    //     return <div className="text-center text-lg mt-8">Loading...</div>;
    // }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Decision Tree Results</h1>

        </div>
    );
};

export default DecisionTree;
