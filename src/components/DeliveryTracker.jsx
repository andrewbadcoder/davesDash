import { useEffect } from 'react'
import { Car, MapPin, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { Link } from 'react-router-dom'

export default function DeliveryTracker() {
  const deliveryStatus = useStore((state) => state.deliveryStatus)
  const deliveryProgress = useStore((state) => state.deliveryProgress)
  const startDelivery = useStore((state) => state.startDelivery)
  const resetDelivery = useStore((state) => state.resetDelivery)

  useEffect(() => {
    if (!deliveryStatus) {
      startDelivery()
    }
  }, [])

  const getStatusText = () => {
    switch (deliveryStatus) {
      case 'dispatching':
        return 'Dispatching Waymo...'
      case 'en-route':
        return 'Chicken Agent En Route'
      case 'arriving':
        return 'Arriving at Curb'
      case 'delivered':
        return 'Delivery Complete!'
      default:
        return 'Preparing your order...'
    }
  }

  const getStatusIcon = () => {
    switch (deliveryStatus) {
      case 'delivered':
        return <CheckCircle size={32} className="text-green-500" />
      default:
        return <Car size={32} className="text-daves-red" />
    }
  }

  if (!deliveryStatus) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="card max-w-2xl mx-auto text-center">
          <p className="text-xl mb-4">No active delivery</p>
          <Link to="/" className="btn-primary">
            Start Ordering
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-graffiti font-black mb-8 text-center text-daves-red">
          WAYMO DELIVERY
        </h2>

        <div className="card mb-6">
          <div className="text-center mb-6">
            <motion.div
              animate={{
                scale: deliveryStatus === 'delivered' ? 1 : [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: deliveryStatus !== 'delivered' ? Infinity : 0,
              }}
              className="inline-block mb-4"
            >
              {getStatusIcon()}
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 text-daves-red">
              {getStatusText()}
            </h3>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Clock size={16} />
              <span>Estimated arrival: {Math.max(0, Math.ceil((100 - deliveryProgress) / 10))} min</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${deliveryProgress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-daves-red to-daves-yellow"
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Restaurant</span>
              <span className="font-bold">{deliveryProgress}%</span>
              <span>Your Location</span>
            </div>
          </div>

          {/* Map Visualization */}
          <div className="relative bg-gray-900 rounded-lg h-64 mb-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-2 text-daves-red" />
                <p className="text-gray-400">Waymo Autonomous Vehicle</p>
              </div>
            </div>
            
            {/* Animated car */}
            <motion.div
              className="absolute bottom-8"
              initial={{ left: '10%' }}
              animate={{ left: `${10 + (deliveryProgress * 0.8)}%` }}
              transition={{ duration: 0.3 }}
            >
              <Car size={32} className="text-daves-yellow" />
            </motion.div>

            {/* Start marker */}
            <div className="absolute bottom-8 left-[10%]">
              <MapPin size={24} className="text-daves-red" />
            </div>

            {/* End marker */}
            <div className="absolute bottom-8 right-[10%]">
              <MapPin size={24} className="text-green-500" />
            </div>
          </div>

          {deliveryStatus === 'delivered' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <p className="text-xl font-bold text-green-600">
                Your order has been delivered!
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/" className="btn-primary">
                  Order Again
                </Link>
                <button
                  onClick={resetDelivery}
                  className="btn-secondary"
                >
                  Track New Order
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

