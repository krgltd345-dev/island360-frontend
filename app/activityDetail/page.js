import ActivityCalendar from "@/components/activitySection/ActivityCalendar";
import MultiStepBookingForm from "@/components/activitySection/MultiStepForm";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, Heart, MessageSquare, Star, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "My Bookings - Island 360",
  description: "View your bookings",
};



const activity =
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
}

export default function ActivityDetailPage() {
  return (
    <LayoutWrapper>
      <div className="container mt-10 mx-auto px-4 py-8">
        <div className="">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href={'/'}>
              <Button variant="ghost" className="text-slate-600 cursor-pointer hover:text-slate-900 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Activities
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Details */}
            <div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image Gallery */}
              <div className="space-y-4 mb-6">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={activity.image_url || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'}
                    alt={activity.name}
                    className="w-full h-80 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800">
                    {activity.category}
                  </Badge>
                </div>

                {(activity.image_url_2 || activity.image_url_3) && (
                  <div className="grid grid-cols-2 gap-4">
                    {activity.image_url_2 && (
                      <div className="relative rounded-xl overflow-hidden">
                        <img
                          src={activity.image_url_2}
                          alt={`${activity.name} - Image 2`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    {activity.image_url_3 && (
                      <div className="relative rounded-xl overflow-hidden">
                        <img
                          src={activity.image_url_3}
                          alt={`${activity.name} - Image 3`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {activity.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                {activity.duration && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span>{activity.duration}</span>
                  </div>
                )}
                {activity.max_guests && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-5 h-5 text-slate-400" />
                    <span>Up to {activity.max_guests} guests</span>
                  </div>
                )}
                {activity.guided_type && (
                  <Badge variant="outline" className="text-slate-700 border-slate-300">
                    {activity.guided_type === 'guided' ? '👨‍🏫 Guided' : '🗺️ Self-Guided'}
                  </Badge>
                )}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {activity.description || 'Experience an unforgettable adventure with our professional team. Perfect for all skill levels, this activity offers a unique way to explore and create lasting memories.'}
              </p>
              <div>
                {true ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">No reviews yet</h3>
                    <p className="text-slate-500 text-sm">Be the first to share your experience!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <ReviewCard key={review.id} review={review} index={index} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 sticky top-8">
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      {activity.is_donation_based ? (
                        <div className="flex items-center gap-2">
                          <Heart className="w-6 h-6 text-green-600" />
                          <span className="text-2xl font-bold text-green-600">Donation-Based</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-slate-900">
                            ${activity.price}
                          </span>
                          <span className="text-slate-500 ml-1">
                            {activity.billing_type === 'per_hour'
                              ? '/ hour'
                              : activity.billing_type === 'per_group'
                                ? '/ group'
                                : activity.billing_type === 'per_unit'
                                  ? `/ ${activity.unit_name || 'unit'}`
                                  : '/ person'}
                          </span>
                          {activity.billing_type === 'per_hour' && activity.minimum_duration && (
                            <p className="text-xs text-slate-600 mt-1">
                              Min. {activity.minimum_duration} {activity.minimum_duration === 1 ? 'hour' : 'hours'}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    {false && (
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{average.toFixed(1)}</span>
                        <span className="text-slate-400 text-sm">({count})</span>
                      </div>
                    )}
                  </div>
                  {/* {vendor?.vendor_business_name && (
                      <p className="text-sm text-slate-600">
                        Offered by: <span className="font-medium text-slate-900">{vendor.vendor_business_name}</span>
                      </p>
                    )} */}
                </div>

                <MultiStepBookingForm activity={activity} />

                {/* {vendor && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      {vendor.vendor_verified && (
                        <div className="flex items-center gap-2 mb-3 text-sm text-blue-600">
                          <ShieldCheck className="w-4 h-4" />
                          <span className="font-medium">Verified Vendor</span>
                        </div>
                      )}
                      <StartConversationButton
                        vendorId={vendor.id}
                        vendorName={vendor.vendor_business_name || vendor.full_name}
                        vendorEmail={vendor.email}
                        activityId={activity.id}
                      />
                    </div>
                  )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}

