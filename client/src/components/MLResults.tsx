// src/pages/MlResults.tsx
import React, { useEffect, useState } from 'react';
import ImageDisplay from '../components/ImageDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';



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
    accuracy_pie: string;
    model_performance_metrics: string;
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
                console.log(data);
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
        < Card >
            <CardHeader>
                <CardTitle className=' text-3xl'>ML Model Results</CardTitle>
                <CardDescription>Results of The Churning Model Files</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-evenly items-center flex-wrap'>

                <ImageDisplay base64Image={mlData.accuracy_pie} />
                <ImageDisplay base64Image={mlData.model_performance_metrics} />

                {/* <Card title='Model Metrics'>
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
            </Card> */}
            </CardContent>
        </Card >


    );
};

export default MlResults;
