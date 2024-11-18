// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EdaResults from './pages/EdaResults';
import MlResults from './pages/MLResults';
import InputForm from './components/InputForm';

const App: React.FC = () => (
  <Router>
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eda-results" element={<EdaResults />} />
        <Route path="/ml-results" element={<MlResults />} />
        <Route path="/input-form" element={<InputForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;
