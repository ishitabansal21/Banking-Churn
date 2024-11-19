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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    to="/dt-model"
                    className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
                >
                    View Decision Tree Model Results
                </Link>
                <Link
                    to="/rf-model"
                    className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
                >
                    View Random Forest Model Results
                </Link>
                <Link
                    to="/lr-model"
                    className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
                >
                    View Logistic Regression Model Results
                </Link>
                <Link
                    to="/xg-model"
                    className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
                >
                    View XGBoost Model Results
                </Link>
                <Link
                    to="/svm-model"
                    className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
                >
                    View SVM Model Results
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
