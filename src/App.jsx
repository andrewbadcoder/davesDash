import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Cart from './components/Cart'
import SnapToOrder from './components/SnapToOrder'
import DeliveryTracker from './components/DeliveryTracker'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/snap-order" element={<SnapToOrder />} />
          <Route path="/delivery" element={<DeliveryTracker />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

