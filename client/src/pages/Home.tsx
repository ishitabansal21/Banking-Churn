import { Link } from "react-router-dom";

const Home: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center p-6 bg-gray-700 bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
            <h1 className="text-5xl font-extrabold mb-6">
                Welcome to the Data Analysis App
            </h1>
            <p className="text-lg font-light mb-8">
                Explore customer churn predictions and insights with interactive data
                analysis tools.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <Link
                    to="/eda-results"
                    className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
                >
                    View EDA Results
                </Link>
                <Link
                    to="/ml-results"
                    className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
                >
                    View ML Model Results
                </Link>
                <Link
                    to="/input-form"
                    className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
                >
                    View Input Form
                </Link>
            </div>
        </div>
    </div>
);

export default Home;
