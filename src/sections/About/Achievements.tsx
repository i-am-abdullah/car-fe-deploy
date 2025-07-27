import AchievementCard from '@/components/ui/AchievementCard';
import { CardProps } from '@/types/cards'
import React from 'react'

interface AchievementProps{
    achievements:CardProps[];
}

const Achievements:React.FC<AchievementProps> = ({achievements}) => {
  return (
    <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[#3D1703] font-semibold text-sm uppercase tracking-wider">Our Impact</span>
        <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
          Milestones & Achievements
        </h2>
        <p className="text-gray-600">
          Numbers that reflect our commitment to excellence and customer satisfaction
        </p>values
      </div>

      {/* Achievements in Cards with Enhanced Design */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Cards */}
        {achievements.map((card, i)=>(
            <AchievementCard key={i} icon={card.icon} title={card.title} description={card.description}/>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Achievements