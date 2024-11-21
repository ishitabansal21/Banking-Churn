// src/pages/EdaResults.tsx
import React, { useEffect, useState } from 'react';
// import Card from '../components/Card';
import ImageDisplay from '../components/ImageDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EdaData {
    churn_risk_by_gender: string;
    churn_risk_by_geography: string;
    // summary: string; // JSON string containing summary statistics
    // histogram: string; // Base64 string for histogram image
    gender_distribution: string; // Base64 string for gender distribution image
    geography_distribution: string; // Base64 string for geography distribution image
    // correlation_heatmap: string; // Base64 string for correlation heatmap image
}

const EdaResults: React.FC = () => {
    const [edaData, setEdaData] = useState<EdaData | null>(null);

    useEffect(() => {
        const fetchEdaData = async () => {
            try {
                const response = await fetch('http://localhost:8000/run-eda');
                const data = await response.json();
                console.log(data);
                setEdaData(data);
            } catch (error) {
                console.error('Error fetching EDA data:', error);
            }
        };

        fetchEdaData();
    }, []);

    if (!edaData) {
        return <div className="text-center text-lg mt-8">Loading...</div>;
    }

    return (
        < Card >
            <CardHeader>
                <CardTitle className='text-3xl'>EDA Results</CardTitle>
                <CardDescription>Results of The Chruning Eda File</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-evenly flex-wrap'>
                {/* <Card title="Summary Statistics">
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{JSON.stringify(JSON.parse(edaData.summary), null, 2)}</pre>
            </Card> */}
                <ImageDisplay base64Image={edaData.churn_risk_by_gender} />
                <ImageDisplay base64Image={edaData.churn_risk_by_geography} />
                <div className='flex justify-evenly items-center'>
                    <ImageDisplay title="Gender Distribution" base64Image={edaData.gender_distribution} />
                    <ImageDisplay title="Geography Distribution" base64Image={edaData.geography_distribution} />
                </div>
                {/* <ImageDisplay title="Correlation Heatmap" base64Image={edaData.correlation_heatmap} /> */}
                {/* 
                <ImageDisplay title="Histogram" base64Image={edaData.histogram} />
            */}
            </CardContent>
        </Card >


    );
};

export default EdaResults;
