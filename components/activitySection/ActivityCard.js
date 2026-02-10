'use client';
import React from 'react';
import { Clock, Users, Star, Anchor, Bike, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ConvertCentToDollar } from '@/lib/utils';

const categoryIcons = {
  Boating: Anchor,
  Scooter: Bike,
  "kayak/Paddleboard": Anchor,
  "Nature Trails": Sparkles,
  "Jet Ski": Anchor,
  other: Sparkles
};

const categoryColors = {
  Boating: "bg-sky-100 text-sky-700",
  Scooter: "bg-amber-100 text-amber-700",
  "kayak/Paddleboard": "bg-teal-100 text-teal-700",
  "Nature Trails": "bg-green-100 text-green-700",
  "Jet Ski": "bg-blue-100 text-blue-700",
  other: "bg-violet-100 text-violet-700"
};

export default function ActivityCard({ activity, index = 0 }) {
  const Icon = categoryIcons[activity?.category?.name] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 py-0">
        <div className="relative h-56 overflow-hidden">
          <img
            src={activity?.imageUrls?.[0] || `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800`}
            alt={activity?.name}
            className="w-full h-full object-cover group-hover:scale-120 opacity-90 bg-black transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={`${categoryColors[activity?.category?.name]} border-0 font-medium`}>
              <Icon className="w-3 h-3 mr-1" />
              {activity.category?.name}
            </Badge>
            {
              activity?.nonProfitStatus &&
              <Badge className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700  border-0 font-medium`}>
                {"Non-Profit"}
              </Badge>
            }
          </div>
          {false && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium text-slate-800">{average.toFixed(1)}</span>
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-semibold text-white mb-1">{activity?.name}</h3>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              {activity?.durationMinutes && (
                <motion.span
                  className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Clock className="w-4 h-4" />
                  {activity?.durationMinutes} min
                </motion.span>
              )}
              {activity?.maxGuests && (
                <motion.span
                  className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.25 }}
                >
                  <Users className="w-4 h-4" />
                  Up to {activity?.maxGuests}
                </motion.span>
              )}
            </div>
          </div>
        </div>

        <div className="p-5">
          {false && (
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                {vendor.profile_photo_url ? (
                  <img src={vendor.profile_photo_url} alt={vendor.vendor_business_name || vendor.full_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-slate-500">
                    {(vendor.vendor_business_name || vendor.full_name)?.charAt(0)?.toUpperCase() || 'V'}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {vendor.vendor_business_name || vendor.full_name}
              </span>
              {vendor.vendor_verified && (
                <ShieldCheck className="w-4 h-4 text-blue-600 ml-auto" />
              )}
            </div>
          )}

          <p className="text-slate-600 text-sm line-clamp-2 mb-2 min-h-[40px]">
            {activity.description || "Experience an unforgettable adventure with us."}
          </p>

          <div className="flex flex-col items-start gap-2 ">
            <div>
              {activity.is_donation_based ? (
                <span className="text-xl font-bold text-green-600">Donation-Based</span>
              ) : (
                <>
                  <span className="text-2xl font-bold text-slate-900">
                    ${ConvertCentToDollar(activity?.price)}
                  </span>
                  <span className="text-slate-500 text-sm ml-1">
                    {activity?.billingType === 'PER_HOUR'
                      ? '/ hour'
                      : activity.billingType === 'PER_UNIT'
                        ? `/ ${activity.unit_name || 'unit'}`
                        : '/ person'}
                  </span>
                </>
              )}
            </div>
            <Link href={`activityDetail?id=${activity._id}`} className="shrink-0 w-full cursor-pointer">
              <Button
                className={`
                  ${"bg-gradient-to-r from-slate-900 w-full to-slate-800 hover:from-green-600 hover:to-emerald-600"
                  } 
                  text-white rounded-xl px-6 py-2.5 cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn
                `}
              >
                <span className="flex items-center gap-2">
                  {'Book Now'}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}