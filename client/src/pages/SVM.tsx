// src/pages/SVM.tsx
import ImageDisplay from '@/components/ImageDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState, } from 'react';

interface SVMData {
    accuracy_plot: string;
    classification_report: string;
    confusion_matrix: string;
}

export const SVM: React.FC = () => {
    const [SVMData, setSVMData] = useState<SVMData | null>(null);

    useEffect(() => {
        const fetchEdaData = async () => {
            try {
                const response = await fetch('http://localhost:8000/run-svm');
                const data = await response.json();
                console.log(data);
                setSVMData(data);
            } catch (error) {
                console.error('Error fetching svm data:', error);
            }
        };

        fetchEdaData();
    }, []);

    if (!SVMData) {
        return <div className="text-center text-lg mt-8">Loading...</div>;
    }

    return (
        < Card >
            <CardHeader>
                <CardTitle className='text-3xl'>Random Forest Results</CardTitle>
                <CardDescription>Results of The Random Forest File</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-evenly flex-wrap'>
                <ImageDisplay base64Image={SVMData.accuracy_plot} />
                <ImageDisplay base64Image={SVMData.classification_report} />
                <ImageDisplay base64Image={SVMData.confusion_matrix} />
            </CardContent>
        </Card >
    );
};