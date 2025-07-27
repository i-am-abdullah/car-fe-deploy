import React from 'react'

interface HeaderProps {
    title:string;
    description?:string;
  }
const Header: React.FC<HeaderProps> = ({title, description}) => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">{description ? description : ""}
        </p>
        <div className="h-1 w-32 bg-[#3D1703] rounded"></div>
      </div>
    </div>
    <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10 overflow-hidden hidden lg:block">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#3D1703" d="M41.4,-59.4C54.9,-51.4,67.8,-41.7,75.1,-28.2C82.3,-14.7,84,2.7,78.1,17.2C72.3,31.7,59,43.3,45.2,52.6C31.4,61.8,17.1,68.8,0.6,68C-15.9,67.1,-31.7,58.5,-45.4,47.8C-59.1,37.1,-70.6,24.4,-75.3,9.3C-80,-5.9,-77.9,-23.5,-69.1,-36.9C-60.2,-50.3,-44.7,-59.5,-30,-65.8C-15.3,-72.1,-1.5,-75.5,10.9,-72.6C23.3,-69.7,46.5,-60.4,41.4,-59.4Z" transform="translate(100 100)" />
      </svg>
    </div>
  </section>
  )
}

export default Header