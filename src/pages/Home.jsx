import { motion } from 'framer-motion'
import MenuCard from '../components/MenuCard'
import { MENU_ITEMS } from '../store/useStore'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-graffiti font-black mb-4 text-daves-red">
          DAVES<span className="text-daves-yellow">DASH</span>
        </h1>
        <p className="text-2xl md:text-3xl font-bold mb-2 text-white">
          HOT CHICKEN DELIVERED BY AI
        </p>
        <p className="text-lg text-gray-400">
          Autonomous delivery • Computer vision ordering
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {MENU_ITEMS.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

