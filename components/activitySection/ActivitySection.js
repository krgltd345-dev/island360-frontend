'use client';
import React, { useState } from 'react'
import CategoryFilter from '../category/Filters';
import { Sparkles, Waves } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import ActivityCard from './ActivityCard';


const data = [
    {
        "name": "Mountain Climbing",
        "category": "nature_trails",
        "description": "Fun",
        "price": 150,
        "is_donation_based": false,
        "billing_type": "per_hour",
        "guided_type": "guided",
        "unit_name": null,
        "group_size": null,
        "duration": "2",
        "minimum_duration": 1,
        "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/c5bf3db90_nature.jpg",
        "image_url_2": "",
        "image_url_3": "",
        "max_guests": 2,
        "default_capacity": 1,
        "available": true,
        "vendor_id": "695b5d4d9e7a6d8e1b644ebd",
        "operational_days": [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday"
        ],
        "operational_hours_start": "09:00",
        "operational_hours_end": "17:00",
        "id": "695b72ec812c781af2aff0ba",
        "created_date": "2026-01-05T08:14:36.399000",
        "updated_date": "2026-01-05T12:18:56.318000",
        "created_by_id": "695b5d4d9e7a6d8e1b644ebd",
        "is_sample": false
    },
    {
        "name": "Guided Tours ",
        "category": "scooter",
        "description": "Full guided scooter tours",
        "price": 65,
        "billing_type": "per_person",
        "guided_type": "self_guided",
        "unit_name": null,
        "group_size": null,
        "duration": "2 hours ",
        "minimum_duration": null,
        "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/10216ec02_0F1250E3-8B9E-4AE7-AADB-C26C4DF390DE.jpeg",
        "image_url_2": null,
        "image_url_3": null,
        "max_guests": 10,
        "default_capacity": 10,
        "available": true,
        "vendor_id": "6937608791802e673f7e8b4b",
        "operational_days": [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ],
        "operational_hours_start": "09:00",
        "operational_hours_end": "17:00",
        "id": "6938b281afe54abb13fb53ea",
        "created_date": "2025-12-09T23:36:33.733000",
        "updated_date": "2025-12-14T00:10:24.615000",
        "created_by_id": "6937608791802e673f7e8b4b",
        "is_sample": false
    },
    {
        "name": "Island Hopping Adventure",
        "category": "other",
        "description": "Experience true island adventure with our Cayman Brac Getaway. Enjoy seamless island hopping, an overnight stay in a cozy cottage, and your own rental car or Scooter to explore at your pace. We include a free GPS loaded with marked points of interest, hidden gems, and top activities—making your Brac escape effortless, exciting, and unforgettable.”\n********Packages include********\nAirfare & Airport pickup and drop (Brac)\nCottage rental\nCar or Scooter Rental\n",
        "price": 275,
        "billing_type": "per_person",
        "group_size": null,
        "duration": "2 Days 1 Night",
        "minimum_duration": null,
        "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/9d407e5a9_islandhoping.png",
        "image_url_2": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/ba993174b_Studio-Project.png",
        "image_url_3": "",
        "max_guests": 8,
        "default_capacity": null,
        "available": true,
        "vendor_id": "69366107c7d0c0c9b0d8fb7c",
        "operational_days": [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ],
        "operational_hours_start": "07:00",
        "operational_hours_end": "17:00",
        "id": "69378504d1f250f2a450257e",
        "created_date": "2025-12-09T02:10:12.103000",
        "updated_date": "2025-12-09T02:10:12.103000",
        "created_by_id": "69366107c7d0c0c9b0d8fb7c",
        "is_sample": false
    },
    {
        "name": "Horseback ridding ",
        "category": "other",
        "description": "Come and Enjoy this great beach ride and stop to swim and enjoy the beauty of the warm Caribbean waters. ",
        "price": 95,
        "billing_type": "per_person",
        "guided_type": "guided",
        "unit_name": null,
        "group_size": null,
        "duration": "4 hours",
        "minimum_duration": 4,
        "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/f133100a7_horseridding.png",
        "image_url_2": "",
        "image_url_3": "",
        "max_guests": null,
        "default_capacity": null,
        "available": true,
        "vendor_id": "69366107c7d0c0c9b0d8fb7c",
        "operational_days": [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ],
        "operational_hours_start": "09:00",
        "operational_hours_end": "17:00",
        "id": "69376f9a0204514dc393baf1",
        "created_date": "2025-12-09T00:38:50.925000",
        "updated_date": "2025-12-13T23:55:59.726000",
        "created_by_id": "69366107c7d0c0c9b0d8fb7c",
        "is_sample": false
    },
    {
        "name": "Private Boat Charter ",
        "category": "boating",
        "description": "Experience luxury and relaxation with our 3 Hour Charter services. Enjoy Reef Snorkeling, Starfish point and swimming with the Stingray,",
        "price": 350,
        "billing_type": "per_hour",
        "guided_type": "guided",
        "unit_name": null,
        "group_size": null,
        "duration": "3 Hours",
        "minimum_duration": 3,
        "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/f1a3c1c4b_RLLCboat.png",
        "image_url_2": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/f8cf0ae3d_STINGRAY_CITY-6.jpg",
        "image_url_3": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/10b841062_8d.jpg",
        "max_guests": 8,
        "default_capacity": 1,
        "available": true,
        "vendor_id": "69366107c7d0c0c9b0d8fb7c",
        "operational_days": [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ],
        "operational_hours_start": "09:00",
        "operational_hours_end": "20:00",
        "id": "69366bfc48655942149af007",
        "created_date": "2025-12-08T06:11:08.446000",
        "updated_date": "2025-12-14T00:19:54.986000",
        "created_by_id": "69366107c7d0c0c9b0d8fb7c",
        "is_sample": false
    },
    {
        "name": "Kayak Eco Tours",
        "category": "kayak_paddleboard",
        "description": "Nature- Using glass bottom kayaks, we launch directly from the Cayman Islands Yacht Club into a vast network of mangroves and waterways. You'll be introduced to local plants, wildlife, culture, and history as we navigate through the crystal-clear water of Grand Cayman.Small Group- We keep our group sizes small and will have one guide for every six participants, the majority of our tours are 4-6 participants. This allows for an interactive experience where you will be able to ask many questions and have the guide offer a more tailored experience.Safety- All participants will receive guidance on the usage of the kayaks and a personal flotation device to assist them should they enter the water.Options- We offer single and double kayaks to participants, but numbers are limited so we cannot guarantee your preferred option.\nRead more about - Small Group Glass Bottom Kayak Adventure- Cayman Islands - ",
        "price": 75,
        "billing_type": "per_unit",
        "unit_name": "Kayak",
        "group_size": null,
        "duration": "3 Hours",
        "minimum_duration": 3,
        "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/886758fa0_kayaktour.png",
        "image_url_2": "",
        "image_url_3": "",
        "max_guests": 2,
        "default_capacity": 8,
        "available": true,
        "vendor_id": "69366107c7d0c0c9b0d8fb7c",
        "operational_days": [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ],
        "operational_hours_start": "09:00",
        "operational_hours_end": "17:00",
        "id": "69366720e3f100c5df8f5725",
        "created_date": "2025-12-08T05:50:24.128000",
        "updated_date": "2025-12-09T03:10:54.003000",
        "created_by_id": "69366107c7d0c0c9b0d8fb7c",
        "is_sample": false
    },
    {
        "name": "Scooter Rental",
        "category": "scooter",
        "description": "Enjoy a day of island fun on your own scooter with free preprogramed GPS to help you find all the spots to enjoy. ",
        "price": 55,
        "billing_type": "per_unit",
        "guided_type": "self_guided",
        "unit_name": "Scooter",
        "group_size": null,
        "duration": "9 hours",
        "minimum_duration": 4,
        "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/b5e9bbe88_Scooterrental.png",
        "image_url_2": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/da105cde0_Scooterrental2.png",
        "image_url_3": "",
        "max_guests": 2,
        "default_capacity": 15,
        "available": true,
        "vendor_id": "69366107c7d0c0c9b0d8fb7c",
        "operational_days": [
            "saturday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "sunday"
        ],
        "operational_hours_start": "09:00",
        "operational_hours_end": "17:00",
        "id": "6936664a1c5c4561873d9efd",
        "created_date": "2025-12-08T05:46:50.825000",
        "updated_date": "2025-12-09T03:15:32.813000",
        "created_by_id": "69366107c7d0c0c9b0d8fb7c",
        "is_sample": false
    }
]

const ActivitySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className='text-center mb-12'>
        <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide uppercase">Our Offerings</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Explore Activities
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Choose from our curated selection of exciting activities and create memories that last a lifetime.
        </p>
      </div>
      <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
      {false ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-56 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Waves className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No activities found</h3>
          <p className="text-slate-600">Check back soon for new adventures!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ActivitySection