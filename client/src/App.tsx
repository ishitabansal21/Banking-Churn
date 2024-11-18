// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EdaResults from './pages/EdaResults';
import MlResults from './pages/MLResults';
import InputForm from './components/InputForm';
import { DecisionTree } from './pages/DecisionTree';
import RandomForest from './pages/RandomForest';
import LogisticRegression from './pages/LogisticRegression';
import XGBoost from './pages/XGBoost';
import { SVM } from './pages/SVM';

const App: React.FC = () => (
  <Router>
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eda-results" element={<EdaResults />} />
        <Route path="/dt-model" element={<DecisionTree />} />
        <Route path="/rm-model" element={<RandomForest />} />
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
