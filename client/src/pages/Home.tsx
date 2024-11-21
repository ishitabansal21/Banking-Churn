import EdaResults from "@/components/EdaResults";
import MlResults from "@/components/MLResults";
// import image_1 from "@/assets/image_1.jpg";
import image_2 from "@/assets/image_2.jpg";
import image_3 from "@/assets/image_3.jpg";

const Home: React.FC = () => (
    <div className="mx-auto p-8 bg-opacity-90 backdrop-blur-md ">
        <div className="text-3xl mb-6 text-gray-700 leading-relaxed">
            <p className="text-4xl font-bold mb-4"> Welcome to our Customer Churn Analysis Dashboard - </p>
            <ul className="list-disc list-inside mb-4 text-left mx-auto ">
                <li>A powerful tool designed to help banking professionals make data-driven decisions.</li>
                <li>Explore trends, compare machine learning models, and predict customer churn with ease.</li>
                <li>Empower your strategies with actionable insights and real-time analytics.</li>
                <li>Your one-stop solution for understanding and predicting customer behavior.</li>
                <li>Discover how data can drive better customer retention.</li>
                <li>Understand, Predict, Retain - Dive into customer churn analysis.</li>
            </ul>
            <div className="flex justify-evenly items-center">
                <img
                    src={image_2}
                    alt="Customer Retention Insights"
                    className="mx-auto rounded-lg shadow-md w-1/3"
                />
                <img
                    src={image_3}
                    alt="Analytics Dashboard"
                    className="mx-auto mb-12 rounded-lg shadow-md w-1/3"
                />
            </div>
        </div>




        {/* Results Section */}
        <div className="flex flex-wrap justify-center items-center gap-8">
            <EdaResults />
            <MlResults />
        </div>
    </div>
);

export default Home;
