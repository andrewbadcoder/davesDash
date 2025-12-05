import { ShoppingCart, Camera } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'

export default function Header() {
  const cart = useStore((state) => state.cart)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-daves-red text-white sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-graffiti font-black tracking-tight">
              DAVES<span className="text-daves-yellow">DASH</span>
            </h1>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link
              to="/snap-order"
              className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-black/20 hover:bg-black/30 transition-colors"
            >
              <Camera size={20} />
              <span className="hidden sm:inline">Snap to Order</span>
            </Link>
            
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-black/20 hover:bg-black/30 transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-daves-yellow text-black 
                                rounded-full w-6 h-6 flex items-center justify-center 
                                text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

