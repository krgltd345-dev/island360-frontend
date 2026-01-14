import React from 'react';
import { Button } from "@/components/ui/button";
import { Anchor, Bike, Sparkles, LayoutGrid, Waves, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All Activities', icon: 'LayoutGrid' },
  { id: 'boating', label: 'Boating', icon: 'Anchor' },
  { id: 'scooter', label: 'Scooters', icon: 'Bike' },
  { id: 'kayak_paddleboard', label: 'Kayak/Paddleboard', icon: 'Waves' },
  { id: 'nature_trails', label: 'Nature Trails', icon: 'Sparkles' },
  { id: 'jet_ski', label: 'Jet Ski', icon: 'Anchor' },
  { id: 'non_profit', label: 'Non-Profit/Community', icon: 'Heart' },
  { id: 'other', label: 'Other', icon: 'Sparkles' },
];

const iconMap = {
  LayoutGrid,
  Anchor,
  Bike,
  Waves,
  Sparkles,
  Heart,
};

export default function CategoryFilter({ selected, onChange }) {
  
  return (
    <div className="flex flex-wrap gap-3 mb-12 justify-center">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon];
        const isActive = selected === cat.id;
        
        return (
          <div
          key={cat.id}
          >
            <Button
              variant={isActive ? "default" : "outline"}
              onClick={() => onChange(cat.id)}
              className={`
                rounded-full px-6 py-5 font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'bg-white/80 backdrop-blur border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }
              `}
            >
              <Icon className="w-4 h-4 mr-2" />
              {cat.label}
            </Button>
          </div>
        );
      })}
    </div>
  );
}