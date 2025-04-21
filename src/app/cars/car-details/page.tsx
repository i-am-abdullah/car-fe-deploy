import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import carMockData from '@/constants'
import CarDetailsPage from '@/components/CarDetails/CarDetails'

function page() {
  const title = "BMW M5"
  return (
    <main className="main-content">
        <Navbar/>
        <Header title={title}/>
    <CarDetailsPage carData={carMockData[0]} />
    <Footer/>
  </main>
  )
}

export default page