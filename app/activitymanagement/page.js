'use client';
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, TrendingUp, Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useGetActivityByIdQuery, useGetActivityMetricsQuery } from '@/services/activityApi';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import ActivityPerformanceMetrics from '@/components/activityManagement/ActivityMetrix';
import { useGetActivityReviewsQuery } from '@/services/userApi';
import LoadingScreen from '@/components/loader/Loading';
import { ConvertCentToDollar } from '@/lib/utils';

export default function ActivityManagement() {
  const searchParams = useSearchParams();
  const activityId = searchParams.get('id');

  const { data: Activity, isLoading } = useGetActivityByIdQuery({ id: activityId }, { skip: !activityId })
  const { data: reviews, isLoading: reviewsLoading } = useGetActivityReviewsQuery({ id: activityId }, { skip: !activityId })
  const { data: activityMetrics, isLoading: metricsLoading } = useGetActivityMetricsQuery({ id: activityId }, { skip: !activityId })

  if (isLoading || reviewsLoading || metricsLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen mt-12 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex max-sm:flex-col gap-4 sm:items-center justify-between mb-8">
            <div className="flex items-center sm:gap-4">
              <Link href={('/myactivities')}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{Activity?.data?.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{Activity?.data?.category?.name}</Badge>
                  <Badge variant={Activity?.data?.availableForBooking ? "default" : "secondary"}>
                    {Activity?.data?.availableForBooking ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/activityDetail?id=${Activity?.data?._id}`}>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Page
                </Button>
              </Link>
            </div>
          </div>

          {/* Activity Images */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {Activity?.data?.imageUrls.length > 0 && Activity?.data?.imageUrls.map((item, idx) => (
              <img key={idx} src={item} alt={'activity_image'} className="w-full h-48 object-cover rounded-lg" />
            ))}
          </div>

          {/* Activity Details */}
          <Card className="p-6 mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">Activity Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Price</p>
                <p className="font-medium text-slate-900">${ConvertCentToDollar(Activity?.data?.price)} {Activity?.data?.billingType === 'PER_HOUR' ? '/ hour' : Activity?.data?.billingType === 'PER_UNIT' ? `/ ${Activity?.data?.unitName || 'unit'}` : '/ person'}</p>
              </div>
              <div>
                <p className="text-slate-600">Duration {Activity?.data?.minDurationMinutes > 60 ? "( in Hours )" : "( in Mimutes )"}</p>
                <p className="font-medium text-slate-900">{Activity?.data?.minDurationMinutes > 60 ? Activity?.data?.minDurationMinutes / 60 : Activity?.data?.minDurationMinutes || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-600">Max Guests</p>
                <p className="font-medium text-slate-900">{Activity?.data?.maxGuests || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-600">Default Capacity</p>
                <p className="font-medium text-slate-900">{Activity?.data?.availableSpots || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-600">Activity Type</p>
                <p className="font-medium text-slate-900">{Activity?.data?.type === 'GUIDED_TOUR' ? 'Guided' : 'Self-Guided'}</p>
              </div>
              <div>
                <p className="text-slate-600">Operational Days</p>
                <p className="font-medium text-slate-900">
                  {Activity?.data?.operationalDays?.length > 0 ? Activity?.data?.operationalDays.join(', ') : 'All days'}
                </p>
              </div>
            </div>
            {Activity?.data?.description && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-slate-600 text-sm mb-1">Description</p>
                <p className="text-slate-900">{Activity?.data?.description}</p>
              </div>
            )}
          </Card>

          {/* Performance Metrics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-slate-700" />
              <h2 className="text-2xl font-bold text-slate-900">Performance Metrics</h2>
            </div>
            <ActivityPerformanceMetrics activityMetrics={activityMetrics} reviews={reviews} />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}