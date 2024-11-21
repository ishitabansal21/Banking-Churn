// src/pages/LogisticRegression.tsx
import ImageDisplay from '@/components/ImageDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState, } from 'react';

interface LogisticRegressionData {
    accuracy_plot: string;
    classification_report: string;
    confusion_matrix: string;
    feature_importance: string;
    precision_recall_curve: string;
    roc_curve: string;
}

const LogisticRegression: React.FC = () => {
    const [LRData, setLRData] = useState<LogisticRegressionData | null>(null);

    useEffect(() => {
        const fetchEdaData = async () => {
            try {
                const response = await fetch('http://localhost:8000/run-lr');
                const data = await response.json();
                console.log(data);
                setLRData(data);
            } catch (error) {
                console.error('Error fetching dt data:', error);
            }
        };

        fetchEdaData();
    }, []);

    if (!LRData) {
        return <div className="text-center text-lg mt-8">Loading...</div>;
    }

    return (
        < Card >
            <CardHeader>
                <CardTitle className='text-3xl'>Logistic Regression Results</CardTitle>
                <CardDescription>Results of The Logistic Regression File</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-evenly flex-wrap'>
                <ImageDisplay base64Image={LRData.accuracy_plot} />
                <ImageDisplay base64Image={LRData.classification_report} />
                <ImageDisplay base64Image={LRData.confusion_matrix} />
                <ImageDisplay base64Image={LRData.feature_importance} />
                <ImageDisplay base64Image={LRData.precision_recall_curve} />
                <ImageDisplay base64Image={LRData.roc_curve} />
            </CardContent>
        </Card >
    );
};

export default LogisticRegression;


