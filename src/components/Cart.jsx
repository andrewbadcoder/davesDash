import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'

export default function Cart() {
  const navigate = useNavigate()
  const cart = useStore((state) => state.cart)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const updateQuantity = useStore((state) => state.updateQuantity)
  const clearCart = useStore((state) => state.clearCart)
  const startDelivery = useStore((state) => state.startDelivery)

  const subtotal = cart.reduce(
    (sum, item) => sum + item.basePrice * item.quantity,
    0
  )
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleCheckout = () => {
    if (cart.length > 0) {
      startDelivery()
      clearCart()
      navigate('/delivery')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="card max-w-2xl mx-auto text-center py-12">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-3xl font-bold mb-4 text-daves-red">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some hot chicken to get started!</p>
          <Link to="/" className="btn-primary inline-block">
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-graffiti font-black mb-8 text-center text-daves-red">
        YOUR CART
      </h2>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="card"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-daves-red mb-1">
                          {item.name}
                        </h3>
                        {item.spiceLevel && (
                          <p className="text-sm text-gray-600 mb-2">
                            Spice: <span className="font-bold">{item.spiceLevel}</span>
                          </p>
                        )}
                        <p className="text-lg font-bold">
                          ${item.basePrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-lg w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="md:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-2xl font-bold mb-4 text-daves-red">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span className="font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-daves-red pt-2 mt-2">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-daves-red">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="btn-primary w-full mb-3"
              >
                Checkout & Track Delivery
              </button>
              <Link
                to="/"
                className="block text-center text-daves-red hover:underline font-bold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

