'use Client';
import React from 'react';
import { Card } from "@/components/ui/card";
import { Star, MessageSquare } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useGetVendorReviewsQuery, useGetVendorStatsQuery } from '@/services/userApi';

export default function VendorReviewsManagement() {
  const { data: vendorReviews } = useGetVendorReviewsQuery()
  const { data: reviewStats } = useGetVendorStatsQuery()


  if (vendorReviews?.data?.length === 0) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Reviews Yet</h3>
        <p className="text-slate-600">Reviews will appear here once customers complete bookings</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-600">Average Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-slate-900">{reviewStats?.data?.averageRating}</p>
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Total Reviews</p>
          <p className="text-3xl font-bold text-slate-900">{reviewStats?.data?.total}</p>
        </Card>
      </div>

      <div className="space-y-4">
        {vendorReviews?.data?.map((review) => (
          <Card key={review._id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{review?.activityId?.name}</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review?.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                    />
                  ))}
                  <span className="text-sm text-slate-600">
                    by {review?.userId?.name} • {format(parseISO(review?.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                {review?.description && (
                  <p className="text-slate-700 mb-3">{review?.description}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}