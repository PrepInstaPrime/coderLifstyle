import React, { useMemo, useState } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    setMessage('')
    const trimmed = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setMessage('Please enter a valid email.')
      return
    }
    try {
      const existing = JSON.parse(localStorage.getItem('newsletterEmails') || '[]')
      if (existing.includes(trimmed)) {
        setMessage('You are already subscribed.')
      } else {
        localStorage.setItem('newsletterEmails', JSON.stringify([...existing, trimmed]))
        setMessage('Thanks for subscribing!')
      }
      setEmail('')
    } catch {
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <footer className={styles.footer}>
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Stay in the loop</h2>
          <p className={styles.ctaText}>Get exclusive offers, early access, and updates straight to your inbox.</p>
          <form className={styles.ctaForm} onSubmit={handleSubscribe}>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button className={styles.button} type="submit">Subscribe</button>
          </form>
          {message ? <div className={styles.note}>{message}</div> : null}
        </div>
      </section>

      <section className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <a href="/" className={styles.logoLink} aria-label="Home">
              <img className={styles.logo} src="/logotitle.png" alt="Brand" />
            </a>
            <p className={styles.brandText}>Premium audio, wearables and more designed for every moment.</p>
            <div className={styles.socials}>
              <a className={styles.social} href="#" aria-label="Instagram" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>
              <a className={styles.social} href="#" aria-label="Twitter" title="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.8-2.6 1-1.6-1.7-4.4-1.3-5.6.7-.6 1-.7 2.1-.4 3.2-3.3-.2-6.2-1.7-8.2-4.2-1.1 2-.5 4.5 1.3 5.7-.6 0-1.3-.2-1.8-.5 0 2.2 1.5 4.1 3.6 4.6-.6.2-1.3.2-1.9.1.6 1.9 2.4 3.3 4.5 3.4-1.7 1.3-3.8 2-6 2 3.7 2.4 8.4 2.1 11.8-.8 2.4-2 3.7-5 3.7-8.1v-.4c.8-.6 1.5-1.3 2-2.1z" fill="currentColor"/>
                </svg>
              </a>
              <a className={styles.social} href="#" aria-label="YouTube" title="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12s0-3.4-.4-5a3 3 0 0 0-2.1-2.1C17.9 4.4 12 4.4 12 4.4s-5.9 0-7.5.5A3 3 0 0 0 2.4 7C2 8.6 2 12 2 12s0 3.4.4 5a3 3 0 0 0 2.1 2.1c1.6.4 7.5.4 7.5.4s5.9 0 7.5-.5A3 3 0 0 0 21.6 17c.4-1.6.4-5 .4-5Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 9.75v4.5L15 12l-5-2.25Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.linkList}>
              <li><a className={styles.link} href="#">True Wireless</a></li>
              <li><a className={styles.link} href="#">Neckbands</a></li>
              <li><a className={styles.link} href="#">Smart Watches</a></li>
              <li><a className={styles.link} href="#">Headphones</a></li>
              <li><a className={styles.link} href="#">Speakers</a></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Help</h4>
            <ul className={styles.linkList}>
              <li><a className={styles.link} href="#">Support</a></li>
              <li><a className={styles.link} href="#">Track Order</a></li>
              <li><a className={styles.link} href="#">Warranty</a></li>
              <li><a className={styles.link} href="#">Return Policy</a></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li><a className={styles.link} href="#">About</a></li>
              <li><a className={styles.link} href="#">Careers</a></li>
              <li><a className={styles.link} href="#">Contact</a></li>
              <li><a className={styles.link} href="#">Press</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.copy}>© {year} boAt Clone</span>
          <nav className={styles.bottomLinks} aria-label="Legal">
            <a href="#" className={styles.bottomLink}>Terms</a>
            <a href="#" className={styles.bottomLink}>Privacy</a>
            <a href="#" className={styles.bottomLink}>Sitemap</a>
          </nav>
        </div>
      </section>
    </footer>
  )
}

