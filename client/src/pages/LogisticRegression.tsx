// src/pages/LogisticRegression.tsx
import React, { useEffect, } from 'react';

// interface LogisticRegressionData {

// }

const LogisticRegression: React.FC = () => {
    // const [LRData, setLRData] = useState<any | null>(null);

    useEffect(() => {
        const fetchEdaData = async () => {
            try {
                const response = await fetch('http://localhost:8000/run-lr');
                const data = await response.json();
                console.log(data);
                // setLRData(data);
            } catch (error) {
                console.error('Error fetching LR data:', error);
            }
        };

        fetchEdaData();
    }, []);

    // if (!LRData) {
    //     return <div className="text-center text-lg mt-8">Loading...</div>;
    // }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Logistic Regression Results</h1>

        </div>
    );
};

export default LogisticRegression;
