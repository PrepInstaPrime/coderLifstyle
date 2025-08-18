import React, { useEffect, useState } from 'react'
import styles from './NavBar.module.css'
import { useCart } from '../cart/CartContext'
import { useNavigate } from 'react-router-dom'

const CATEGORY_ITEMS = [
  { label: 'True Wireless', href: '#' },
  { label: 'Neckbands', href: '#' },
  { label: 'Smart Watches', href: '#' },
  { label: 'Headphones', href: '#' },
  { label: 'Speakers', href: '#' },
  { label: 'Soundbars', href: '#' },
  { label: 'Gaming', href: '#' },
  { label: 'Limited Edition', href: '#' },
  { label: 'Trebel', href: '#' },
  { label: 'Misfit', href: '#' },
]

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const { totalItems } = useCart()
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const stored = localStorage.getItem('currentUser')
      setCurrentUser(stored ? JSON.parse(stored) : null)
    } catch {
      setCurrentUser(null)
    }
  }, [])

  return (
    <header className={styles.navWrapper}>
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <span className={styles.topBarText}>
            Mega Savings Live: Up to 75% OFF + Extra Offers
          </span>
          <nav className={styles.topLinks} aria-label="Quick links">
            <a href="#" className={styles.topLink}>Track Order</a>
            <a href="#" className={styles.topLink}>Store Locator</a>
            <a href="#" className={styles.topLink}>Support</a>
          </nav>
        </div>
      </div>

      <div className={styles.mainBar}>
        <div className={styles.mainBarInner}>
          <button
            className={styles.menuButton}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            <svg
              className={styles.menuIcon}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <a href="/" className={styles.logoLink} aria-label="boAt Clone Home">
            <img src="/logotitle.png" alt="Brand" className={styles.logoImage} loading="lazy" />
          </a>

          <form
            className={styles.searchContainer}
            onSubmit={(e) => {
              e.preventDefault()
              const term = searchText.trim()
              navigate(term ? `/products?search=${encodeURIComponent(term)}` : '/products')
            }}
          >
            <svg
              className={styles.searchIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search products, categories..."
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>

          <div className={styles.actions}>
            {currentUser ? (
              <a href="/profile" className={styles.actionLink} aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 21a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className={styles.actionText}>Hi, {currentUser.name.split(' ')[0]}</span>
              </a>
            ) : (
              <a href="/signin" className={styles.actionLink} aria-label="Login">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 21a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className={styles.actionText}>Login</span>
              </a>
            )}
            <a href="/cart" className={styles.actionLink} aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M6 6 5 3H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="9.5" cy="20" r="1.5" fill="currentColor" />
                <circle cx="17.5" cy="20" r="1.5" fill="currentColor" />
              </svg>
              <span className={styles.actionText}>Cart</span>
              <span className={styles.badge} aria-label="Items in cart">{totalItems}</span>
            </a>
          </div>
        </div>
      </div>

      <nav className={styles.primaryNav} aria-label="Primary">
        <ul className={styles.primaryList} data-open={isMobileMenuOpen || undefined}>
          {CATEGORY_ITEMS.map((item) => (
            <li key={item.label} className={styles.primaryItem}>
              <a href={item.href} className={styles.primaryLink}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}


