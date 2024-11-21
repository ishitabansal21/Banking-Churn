// src/pages/XGBoost.tsx
import ImageDisplay from '@/components/ImageDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState, } from 'react';

interface XGBoostData {
    accuracy_plot: string;
    classification_report: string;
    confusion_matrix: string;
    feature_importance: string;
    precision_recall_curve: string;
    roc_curve: string;
}

const XGBoost: React.FC = () => {
    const [XGData, setXGData] = useState<XGBoostData | null>(null);

    useEffect(() => {
        const fetchEdaData = async () => {
            try {
                const response = await fetch('http://localhost:8000/run-rf');
                const data = await response.json();
                console.log(data);
                setXGData(data);
            } catch (error) {
                console.error('Error fetching dt data:', error);
            }
        };

        fetchEdaData();
    }, []);

    if (!XGData) {
        return <div className="text-center text-lg mt-8">Loading...</div>;
    }

    return (
        < Card >
            <CardHeader>
                <CardTitle className='text-3xl'>XGBoost Results</CardTitle>
                <CardDescription>Results of The XGBoost File</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-evenly flex-wrap'>
                <ImageDisplay base64Image={XGData.accuracy_plot} />
                <ImageDisplay base64Image={XGData.classification_report} />
                <ImageDisplay base64Image={XGData.confusion_matrix} />
                <ImageDisplay base64Image={XGData.feature_importance} />
                <ImageDisplay base64Image={XGData.precision_recall_curve} />
                <ImageDisplay base64Image={XGData.roc_curve} />
            </CardContent>
        </Card >
    );
};

export default XGBoost;


