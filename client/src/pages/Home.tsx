import EdaResults from "@/components/EdaResults";
import MlResults from "@/components/MLResults";
import image_1 from "@/assets/image_1.jpg";
import image_2 from "@/assets/image_2.jpg";
import image_3 from "@/assets/image_3.jpg";

const Home: React.FC = () => (
    <div className="mx-auto text-center p-8 bg-opacity-90 backdrop-blur-md ">
        {/* Header Section */}
        {/* <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
            Welcome to the Data Analysis App
        </h1> */}

        {/* Welcome Section */}
        <div className="mb-12 text-2xl text-gray-700 leading-relaxed">
            <p className="text-3xl">
                Welcome to our Customer Churn Analysis Dashboard -
            </p>

            <p className="mb-2"> a powerful tool designed to help banking professionals make data-driven decisions.
                Explore trends, compare machine learning models, and predict customer churn with ease.Empower your strategies with actionable insights and real-time analytics.</p>
            <img
                src={image_1}
                alt="Data Analysis Illustration"
                className="mx-auto rounded-lg shadow-md max-w-xl"
            />
        </div>

        {/* Description Section */}
        <div className="mb-12 text-2xl font-light text-gray-700 leading-relaxed ">
            <p>
                Your one-stop solution for understanding and predicting customer
                behavior.
            </p>
            <p >
                Discover how data can drive better customer retention.
            </p>
            <p className="mb-2">
                Understand, Predict, Retain - Dive into customer churn analysis.
            </p>
            <div className="flex justify-evenly items-center">
                <img
                    src={image_2}
                    alt="Customer Retention Insights"
                    className="mx-auto rounded-lg shadow-md size-2/5"
                />
                <img
                    src={image_3}
                    alt="Analytics Dashboard"
                    className="mx-auto mb-12 rounded-lg shadow-md size-2/5"
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
