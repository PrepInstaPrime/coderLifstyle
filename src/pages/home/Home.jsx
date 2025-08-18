import React from 'react'
import NavBar from '../../componets/navbar/NavBar'
import Banner from '../../componets/banner/Banner'
import Footer from '../../componets/footer/Footer'
import ProductList from '../../componets/productlist/ProductList'
import { PRODUCTS } from '../../componets/productlist/productsData'
export default function Home() {
  return (
    <>
     <NavBar />
     <Banner /> 
     <div style={{ padding: '24px 16px', background: '#0b0b0b', color: '#eaeaea' }}>
       <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gap: '24px' }}>
         <ProductList
           title="True Wireless"
           products={PRODUCTS.filter(p => p.category === 'True Wireless').slice(0, 6)}
           showViewAllLink
           viewAllHref="/products?category=True%20Wireless"
         />
         <ProductList
           title="Smart Watches"
           products={PRODUCTS.filter(p => p.category === 'Smart Watches').slice(0, 6)}
           showViewAllLink
           viewAllHref="/products?category=Smart%20Watches"
         />
         <ProductList
           title="Speakers"
           products={PRODUCTS.filter(p => p.category === 'Speakers').slice(0, 6)}
           showViewAllLink
           viewAllHref="/products?category=Speakers"
         />
       </div>
     </div>
     <Footer/>
    </>
  )
}
