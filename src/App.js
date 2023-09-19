import { Routes, Route } from 'react-router-dom';
import ProductionScreen from './screens/production/ProductionScreen';
import ElectricScreen from './screens/electric/ElectricScreen.js';


function App() {
  return (
    <Routes>
      <Route path="/" element={<ElectricScreen />} />
      <Route path="/product/*" element={<ProductionScreen />} />
    </Routes>
  );
}

export default App;
