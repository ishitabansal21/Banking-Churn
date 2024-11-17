// src/pages/MlResults.tsx
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import ImageDisplay from '../components/ImageDisplay';



// Define types for the ML results structure
interface Metrics {
    precision: number;
    recall: number;
    f1_macro: number;
    accuracy: number;
}

interface ConfusionMatrix {
    normal: string; // Base64 string for the normal confusion matrix image
    normalized: string; // Base64 string for the normalized confusion matrix image
}

interface MLData {
    model_metrics: Record<string, Metrics>;
    svm_metrics: Record<string, Metrics>;
    confusion_matrices: Record<string, ConfusionMatrix>;
}

const MlResults: React.FC = () => {
    const [mlData, setMlData] = useState<MLData | null>(null);

    useEffect(() => {
        const fetchMlData = async () => {
            try {
                const response = await fetch('http://localhost:8000/run-ml');
                const data = await response.json();
                console.log(data)
                setMlData(data);
            } catch (error) {
                console.error('Error fetching ML data:', error);
            }
        };

        fetchMlData();
    }, []);

    if (!mlData) {
        return <div className="text-center text-lg mt-8">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">ML Model Results</h1>
            <Card title='Model Metrics'>
                {Object.entries(mlData.model_metrics).map(([model, metrics]) => (
                    <Card key={model} title={`${model} Metrics`}>
                        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{JSON.stringify(metrics, null, 2)}</pre>
                    </Card>
                ))}
            </Card>
            <Card title='SVM Metrics'>
                {Object.entries(mlData.svm_metrics).map(([model, metrics]) => (
                    <Card key={model} title={`${model} Metrics`}>
                        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{JSON.stringify(metrics, null, 2)}</pre>
                    </Card>
                ))}
            </Card>
            <Card title="Confusion Matrices">
                {Object.entries(mlData.confusion_matrices).map(([model, matrices]) => (
                    <div key={model} className="mb-4">
                        <h3 className="font-semibold">{model}</h3>
                        <ImageDisplay title={`${model} Confusion Matrix`} base64Image={matrices.normal} />
                        <ImageDisplay title={`${model} Normalized Confusion Matrix`} base64Image={matrices.normalized} />
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default MlResults;
