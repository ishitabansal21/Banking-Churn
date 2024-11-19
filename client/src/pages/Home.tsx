import EdaResults from "./EdaResults";
import MlResults from "./MLResults";

const Home: React.FC = () => (
    <div className="mx-auto text-center p-6 bg-gray-700 bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold mb-6">
            Welcome to the Data Analysis App
        </h1>
        <p className="text-lg font-light mb-8">
            Explore customer churn predictions and insights with interactive data
            analysis tools.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
            <EdaResults />
            <MlResults />
        </div>
    </div>
);

export default Home;
