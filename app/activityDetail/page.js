'use client';
import ActivityDetailReview from "@/components/activitySection/ActivityDetailReview";
import MultiStepBookingForm from "@/components/activitySection/MultiStepForm";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ConvertCentToDollar } from "@/lib/utils";
import { useGetActivityByIdQuery } from "@/services/activityApi";
import { useGetActivityReviewsQuery, useGetUserRoleQuery } from "@/services/userApi";
import { ArrowLeft, Clock, Heart, Star, Users } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";


export default function ActivityDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const activityId = searchParams.get('id');
  const { data: Activity, isLoading } = useGetActivityByIdQuery({ id: activityId }, { skip: !activityId })
  const { data: reviews, isLoading: reviewsLoading } = useGetActivityReviewsQuery({ id: activityId }, { skip: !activityId })
  const { data: userRoleInfo, isLoading: userRoleInfoFetching } = useGetUserRoleQuery()





  if (isLoading || userRoleInfoFetching || reviewsLoading) {
    return (
      <LayoutWrapper>
        <div className="min-h-[calc(100vh - 154px)] mt-12 bg-slate-50 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="h-96 rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  if (!Activity) {
    return (
      <LayoutWrapper>
        <div className=" bg-slate-50 flex flex-1 items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Activity not found</h2>
            <Link href={('/')}>
              <Button>Back to Activities</Button>
            </Link>
          </div>
        </div>
      </LayoutWrapper>
    );
  }
  return (
    <LayoutWrapper>
      <div className="container mt-10 mx-auto sm:px-4 py-8">
        <div className="">
          <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-0 sm:py-2">
            <Link href={'/'}>
              <Button variant="ghost" className="text-slate-600 cursor-pointer hover:text-slate-900 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Activities
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
            {/* Left Column - Details */}
            <div
            >
              {/* Image Gallery */}
              <div className="space-y-4 mb-6">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={Activity?.data?.imageUrls?.[0] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'}
                    alt={Activity?.data?.name}
                    className="w-full h-50  sm:h-80 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800">
                    {Activity?.data?.category?.name}
                  </Badge>
                </div>

                {(Activity?.data?.imageUrls?.[1] || Activity?.data?.imageUrls?.[2]) && (
                  <div className="grid grid-cols-2 gap-4">
                    {Activity?.data?.imageUrls?.[1] && (
                      <div className="relative rounded-xl overflow-hidden">
                        <img
                          src={Activity?.data?.imageUrls?.[1]}
                          alt={`${Activity?.data?.name}-2`}
                          className="w-full h-30 sm:h-48 object-cover"
                        />
                      </div>
                    )}
                    {Activity?.data?.imageUrls?.[2] && (
                      <div className="relative rounded-xl overflow-hidden">
                        <img
                          src={Activity?.data?.imageUrls?.[2]}
                          alt={`${Activity?.data?.name}-3`}
                          className="w-full h-30 sm:h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {Activity?.data?.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                {Activity?.data?.durationMinutes && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span>{Activity?.data?.durationMinutes > 60 ? `${(Activity?.data?.durationMinutes / 60).toFixed(1)} h` : `${Activity?.data?.durationMinutes} min`}</span>
                  </div>
                )}
                {Activity?.data?.maxGuests && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-5 h-5 text-slate-400" />
                    <span>Up to {Activity?.data?.maxGuests} guests</span>
                  </div>
                )}
                {Activity?.data?.type && (
                  <Badge variant="outline" className="text-slate-700 border-slate-300">
                    {Activity?.data?.type === 'GUIDED_TOUR' ? '👨‍🏫 Guided' : '🗺️ Self-Guided'}
                  </Badge>
                )}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {Activity?.data?.description || 'Experience an unforgettable adventure with our professional team. Perfect for all skill levels, this Activity?.data? offers a unique way to explore and create lasting memories.'}
              </p>
              <ActivityDetailReview reviews={reviews} hideClass="sm:block hidden" />
            </div>

            {/* Right Column - Booking Form */}
            <div
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 sticky top-8">
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      {Activity?.data?.is_donation_based ? (
                        <div className="flex items-center gap-2">
                          <Heart className="w-6 h-6 text-green-600" />
                          <span className="text-2xl font-bold text-green-600">Donation-Based</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-slate-900">
                            ${ConvertCentToDollar(Activity?.data?.price)}
                          </span>
                          <span className="text-slate-500 ml-1">
                            {Activity?.data?.billingType === 'PER_HOUR'
                              && '/ hour'}
                            {Activity?.data?.billingType === 'PER_UNIT'
                              && `/ ${Activity?.data?.unit_name || 'unit'}`}
                            {
                              Activity?.data?.billingType === 'PER_PERSON' && '/ person'
                            }

                          </span>
                          {Activity?.data?.billingType === 'PER_HOUR' && Activity?.data?.minDurationMinutes && (
                            <p className="text-xs text-slate-600 mt-1">
                              Min. {Activity?.data?.minDurationMinutes} {Activity?.data?.minDurationMinutes === 1 ? 'hour' : 'hours'}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    {/* {false && (
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{(4).toFixed(1)}</span>
                        <span className="text-slate-400 text-sm">({10})</span>
                      </div>
                    )} */}
                  </div>
                  {/* {vendor?.vendor_business_name && (
                      <p className="text-sm text-slate-600">
                        Offered by: <span className="font-medium text-slate-900">{vendor.vendor_business_name}</span>
                      </p>
                    )} */}
                </div>
                {
                  userRoleInfo?.data?.user ?
                    <MultiStepBookingForm Activity={Activity} />
                    :
                    <Button
                      onClick={() => {
                        const currentPath = `/activityDetail?id=${activityId}`;
                        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
                      }}
                      type="button"
                      className="flex-1 bg-slate-900">
                      Login to Continue Booking
                    </Button>
                }


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
            <ActivityDetailReview reviews={reviews} hideClass="block sm:hidden" />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}

