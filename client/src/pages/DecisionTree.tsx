// src/pages/DecisionTree.tsx
import ImageDisplay from '@/components/ImageDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState, } from 'react';

interface DecisionTreeData {
    accuracy_plot: string;
    classification_report: string;
    confusion_matrix: string;
    feature_importance: string;
    precision_recall_curve: string;
    roc_curve: string;
}

const DecisionTree: React.FC = () => {
    const [DTData, setDTData] = useState<DecisionTreeData | null>(null);

    useEffect(() => {
        const fetchEdaData = async () => {
            try {
                const response = await fetch('http://localhost:8000/run-dt');
                const data = await response.json();
                console.log(data);
                setDTData(data);
            } catch (error) {
                console.error('Error fetching dt data:', error);
            }
        };

        fetchEdaData();
    }, []);

    if (!DTData) {
        return <div className="text-center text-lg mt-8">Loading...</div>;
    }

    return (
        < Card >
            <CardHeader>
                <CardTitle className='text-3xl'>Decision Tree Results</CardTitle>
                <CardDescription>Results of The Descision Tree File</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-evenly flex-wrap'>
                <ImageDisplay base64Image={DTData.accuracy_plot} />
                <ImageDisplay base64Image={DTData.classification_report} />
                <ImageDisplay base64Image={DTData.confusion_matrix} />
                <ImageDisplay base64Image={DTData.feature_importance} />
                <ImageDisplay base64Image={DTData.precision_recall_curve} />
                <ImageDisplay base64Image={DTData.roc_curve} />
            </CardContent>
        </Card >
    );
};

export default DecisionTree;


