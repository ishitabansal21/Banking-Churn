// src/pages/RandomForest.tsx
import ImageDisplay from '@/components/ImageDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState, } from 'react';

interface RandomForestData {
    accuracy_plot: string;
    classification_report: string;
    confusion_matrix: string;
    feature_importance: string;
    precision_recall_curve: string;
    roc_curve: string;
}

const RandomForest: React.FC = () => {
    const [RFData, setRFData] = useState<RandomForestData | null>(null);

    useEffect(() => {
        const fetchEdaData = async () => {
            try {
                const response = await fetch('http://localhost:8000/run-rf');
                const data = await response.json();
                console.log(data);
                setRFData(data);
            } catch (error) {
                console.error('Error fetching dt data:', error);
            }
        };

        fetchEdaData();
    }, []);

    if (!RFData) {
        return <div className="text-center text-lg mt-8">Loading...</div>;
    }

    return (
        < Card >
            <CardHeader>
                <CardTitle className='text-3xl'>Random Forest Results</CardTitle>
                <CardDescription>Results of The Random Forest File</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-evenly flex-wrap'>
                <ImageDisplay base64Image={RFData.accuracy_plot} />
                <ImageDisplay base64Image={RFData.classification_report} />
                <ImageDisplay base64Image={RFData.confusion_matrix} />
                <ImageDisplay base64Image={RFData.feature_importance} />
                <ImageDisplay base64Image={RFData.precision_recall_curve} />
                <ImageDisplay base64Image={RFData.roc_curve} />
            </CardContent>
        </Card >
    );
};

export default RandomForest;