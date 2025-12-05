import { useState } from 'react'
import { Upload, Camera, Sparkles, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore, MENU_ITEMS, SPICE_LEVELS } from '../store/useStore'

export default function SnapToOrder() {
  const [image, setImage] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const addToCart = useStore((state) => state.addToCart)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!image) return

    setAnalyzing(true)
    setResult(null)

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI analysis - randomly pick a menu item and spice level
    const chickenItems = MENU_ITEMS.filter((item) => item.hasSpice)
    const randomItem = chickenItems[Math.floor(Math.random() * chickenItems.length)]
    const randomSpice = SPICE_LEVELS[Math.floor(Math.random() * SPICE_LEVELS.length)]

    setResult({
      item: randomItem,
      spiceLevel: randomSpice,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
    })

    setAnalyzing(false)
  }

  const handleAddToCart = () => {
    if (result) {
      addToCart(result.item, result.spiceLevel)
      setResult(null)
      setImage(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-graffiti font-black mb-4 text-center text-daves-red">
          SNAP TO ORDER
        </h2>
        <p className="text-center text-gray-400 mb-8 text-lg">
          Upload a photo of your food and let AI identify the perfect Dave's match!
        </p>

        <div className="card mb-6">
          {!image ? (
            <div className="border-4 border-dashed border-daves-red rounded-xl p-12 text-center">
              <Camera size={64} className="mx-auto mb-4 text-daves-red" />
              <label className="btn-primary cursor-pointer inline-flex items-center gap-2">
                <Upload size={20} />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={image}
                  alt="Uploaded food"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setImage(null)
                    setResult(null)
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  ×
                </button>
              </div>
              {!analyzing && !result && (
                <button onClick={analyzeImage} className="btn-primary w-full">
                  <Sparkles size={20} className="inline mr-2" />
                  Analyze Image
                </button>
              )}
            </div>
          )}

          <AnimatePresence>
            {analyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-4 p-6 bg-yellow-50 rounded-lg border-2 border-daves-yellow"
              >
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-daves-yellow" size={24} />
                  <span className="font-bold text-lg text-gray-800">
                    AI is analyzing your food...
                  </span>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-6 bg-green-50 rounded-lg border-2 border-green-500"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{result.item.image}</div>
                  <h3 className="text-2xl font-bold text-daves-red mb-2">
                    {result.item.name}
                  </h3>
                  <p className="text-lg font-bold mb-1">
                    Spice Level: <span className="text-daves-red">{result.spiceLevel}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Confidence: {result.confidence}%
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary flex-1"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      setResult(null)
                      setImage(null)
                    }}
                    className="btn-secondary flex-1"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

