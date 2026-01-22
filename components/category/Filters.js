import React from 'react';
import { Button } from "@/components/ui/button";
import { Anchor, Bike, Sparkles, LayoutGrid, Waves, Heart } from 'lucide-react';
import { motion } from 'framer-motion';


const iconMap = {
  "all":
    LayoutGrid,
  "Boating":
    Anchor,
  "Scooter":
    Bike,
  "Kayak/Paddleboard":
    Waves,
  "Nature Trails":
    Sparkles,
  "Jet Ski":
    Anchor,
  "Other":
    Sparkles,
};

export default function CategoryFilter({ categories, selected, onChange }) {

  return (
    <div className="flex flex-wrap gap-3 mb-12 justify-center">
      <Button
        variant={selected?.name == "all" ? "default" : "outline"}
        onClick={() => onChange({
          name: "all",
          _id: null
        })}
        className={`
                rounded-full px-6 py-5 font-medium transition-all duration-300
                ${selected?.name == "all"
            ? 'bg-slate-900 text-white shadow-lg'
            : 'bg-white/80 backdrop-blur border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
          }
              `}
      >
        <LayoutGrid className="w-4 h-4 mr-2" />
        {"All Activities"}
      </Button>
      {categories.map((cat) => {
        const Icon = iconMap[cat.name];
        const isActive = selected?._id === cat._id;

        return (
          <div
            key={cat._id}
          >
            <Button
              variant={isActive ? "default" : "outline"}
              onClick={() => onChange(cat)}
              className={`
                rounded-full px-6 py-5 font-medium transition-all duration-300
                ${isActive
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }
              `}
            >
              <Icon className="w-4 h-4 mr-2" />
              {cat.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
}