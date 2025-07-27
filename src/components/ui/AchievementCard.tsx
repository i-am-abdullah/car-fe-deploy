import React from 'react'
import { CardProps } from '@/types/cards'
import { Icon } from 'lucide-react'

const AchievementCard:React.FC<CardProps> = ({ icon: Icon, title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3D1703] text-white mb-4">
                <Icon size={24} strokeWidth={2} />
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{title}</p>
            <p className="text-gray-600 font-medium">{description}</p>
        </div>
    )
}

export default AchievementCard