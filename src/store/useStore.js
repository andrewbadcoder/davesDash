import { create } from 'zustand'

const SPICE_LEVELS = [
  'No Spice',
  'Lite Mild',
  'Mild',
  'Medium',
  'Hot',
  'Extra Hot',
  'Reaper'
]

const MENU_ITEMS = [
  { id: 1, name: 'Tenders', basePrice: 8.99, hasSpice: true, image: '🍗' },
  { id: 2, name: 'Sliders', basePrice: 6.99, hasSpice: true, image: '🍔' },
  { id: 3, name: 'Fries', basePrice: 4.99, hasSpice: false, image: '🍟' },
  { id: 4, name: 'Mac & Cheese', basePrice: 5.99, hasSpice: false, image: '🧀' },
  { id: 5, name: 'Kale Slaw', basePrice: 3.99, hasSpice: false, image: '🥗' },
]

export const useStore = create((set, get) => ({
  cart: [],
  deliveryStatus: null,
  deliveryProgress: 0,
  
  addToCart: (item, spiceLevel = 'Medium') => {
    const cartItem = {
      id: Date.now(),
      ...item,
      spiceLevel: item.hasSpice ? spiceLevel : null,
      quantity: 1,
    }
    set((state) => ({
      cart: [...state.cart, cartItem],
    }))
  },
  
  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }))
  },
  
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id)
      return
    }
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }))
  },
  
  clearCart: () => {
    set({ cart: [] })
  },
  
  startDelivery: () => {
    set({ 
      deliveryStatus: 'dispatching',
      deliveryProgress: 0 
    })
    
    // Simulate delivery progress
    const interval = setInterval(() => {
      const { deliveryProgress, deliveryStatus } = get()
      
      if (deliveryProgress < 100) {
        let newProgress = deliveryProgress + 2
        let newStatus = deliveryStatus
        
        if (newProgress >= 20 && deliveryStatus === 'dispatching') {
          newStatus = 'en-route'
        } else if (newProgress >= 80 && deliveryStatus === 'en-route') {
          newStatus = 'arriving'
        } else if (newProgress >= 100) {
          newStatus = 'delivered'
          clearInterval(interval)
        }
        
        set({ 
          deliveryProgress: newProgress,
          deliveryStatus: newStatus 
        })
      } else {
        clearInterval(interval)
      }
    }, 200)
  },
  
  resetDelivery: () => {
    set({ 
      deliveryStatus: null,
      deliveryProgress: 0 
    })
  },
}))

export { SPICE_LEVELS, MENU_ITEMS }

