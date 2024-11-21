import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import RandomForest from './pages/RandomForest';
import LogisticRegression from './pages/LogisticRegression';
import XGBoost from './pages/XGBoost';
import { SVM } from './pages/SVM';
import DecisionTree from './pages/DecisionTree';
import Navbar from './components/Navbar'; // Create Navbar as a separate component
import EdaResults from './components/EdaResults';
import MlResults from './components/MLResults';
import InputForm from './pages/InputForm';

const App: React.FC = () => (
  <Router>
    <div className=" bg-gray-50">
      {/* Navbar always visible */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eda-results" element={<EdaResults />} />
        <Route path="/dt-model" element={<DecisionTree />} />
        <Route path="/rf-model" element={<RandomForest />} />
        <Route path="/lr-model" element={<LogisticRegression />} />
        <Route path="/xg-model" element={<XGBoost />} />
        <Route path="/svm-model" element={<SVM />} />
        <Route path="/ml-results" element={<MlResults />} />
        <Route path="/input-form" element={<InputForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;
