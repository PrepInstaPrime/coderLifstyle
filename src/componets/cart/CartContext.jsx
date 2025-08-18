import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

function readCartFromStorage() {
  try {
    const raw = localStorage.getItem('cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCartToStorage(items) {
  try {
    localStorage.setItem('cart', JSON.stringify(items))
  } catch {
    // ignore
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readCartFromStorage())

  useEffect(() => {
    writeCartToStorage(items)
  }, [items])

  const addToCart = (product, qty = 1) => {
    // Require authentication
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
      if (!currentUser) return false
    } catch {
      return false
    }

    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id)
      if (idx !== -1) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, qty }]
    })
    return true
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  const updateQuantity = (id, qty) => {
    const normalized = Math.max(1, Math.floor(qty || 1))
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: normalized } : p)))
  }

  const increment = (id) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)))
  }

  const decrement = (id) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p)))
  }

  const clearCart = () => setItems([])

  const totalItems = useMemo(() => items.reduce((sum, p) => sum + p.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, p) => sum + p.price * p.qty, 0), [items])

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    increment,
    decrement,
    clearCart,
    totalItems,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


