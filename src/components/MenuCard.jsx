import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore, SPICE_LEVELS } from '../store/useStore'

export default function MenuCard({ item }) {
  const [spiceLevel, setSpiceLevel] = useState('Medium')
  const addToCart = useStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart(item, spiceLevel)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="card"
    >
      <div className="text-6xl mb-4 text-center">{item.image}</div>
      <h3 className="text-2xl font-bold mb-2 text-daves-red">{item.name}</h3>
      <p className="text-xl font-bold mb-4">${item.basePrice.toFixed(2)}</p>

      {item.hasSpice && (
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-gray-700">
            Spice Level:
          </label>
          <div className="flex flex-wrap gap-2">
            {SPICE_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setSpiceLevel(level)}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${
                  spiceLevel === level
                    ? 'bg-daves-red text-white scale-110'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add to Cart
      </button>
    </motion.div>
  )
}

