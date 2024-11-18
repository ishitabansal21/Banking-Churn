// src/pages/EdaResults.tsx
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import ImageDisplay from '../components/ImageDisplay';

interface EdaData {
    churn_risk_by_gender: string;
    churn_risk_by_geography: string;
    summary: string; // JSON string containing summary statistics
    histogram: string; // Base64 string for histogram image
    gender_distribution: string; // Base64 string for gender distribution image
    geography_distribution: string; // Base64 string for geography distribution image
    correlation_heatmap: string; // Base64 string for correlation heatmap image
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
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">EDA Results</h1>
            <Card title="Summary Statistics">
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{JSON.stringify(JSON.parse(edaData.summary), null, 2)}</pre>
            </Card>
            <Card title="Churn risk By Gender">
                <ImageDisplay title="Gender" base64Image={edaData.churn_risk_by_gender} />
            </Card>
            <Card title="Churn risk By Geopgraphy">
                <ImageDisplay title="Geography" base64Image={edaData.churn_risk_by_geography} />
            </Card>
            <Card title="Histograms">
                <ImageDisplay title="Histogram" base64Image={edaData.histogram} />
            </Card>
            <Card title="Gender Distribution">
                <ImageDisplay title="Gender Distribution" base64Image={edaData.gender_distribution} />
            </Card>
            <Card title="Geography Distribution">
                <ImageDisplay title="Geography Distribution" base64Image={edaData.geography_distribution} />
            </Card>
            <Card title="Correlation Heatmap">
                <ImageDisplay title="Correlation Heatmap" base64Image={edaData.correlation_heatmap} />
            </Card>
        </div>
    );
};

export default EdaResults;
