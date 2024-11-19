import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
    <nav className="sticky top-0 z-50 bg-gray-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold hover:text-gray-300">
                        Data Analysis App
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link
                        to="/"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Home
                    </Link>
                    {/* <Link
                        to="/eda-results"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        EDA Results
                    </Link>
                    <Link
                        to="/ml-results"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        ML Results
                    </Link> */}
                    <Link
                        to="/dt-model"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Decision Tree
                    </Link>
                    <Link
                        to="/rf-model"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Random Forest
                    </Link>
                    <Link
                        to="/lr-model"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Logistic Regression
                    </Link>
                    <Link
                        to="/xg-model"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        XGBoost
                    </Link>
                    <Link
                        to="/svm-model"
                        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        SVM
                    </Link>
                    <Link
                        to="/input-form"
                        className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Input Form
                    </Link>
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar;
