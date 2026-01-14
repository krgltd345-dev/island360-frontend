import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import ReviewCard from './ReviewCard';
import StarRating from './StarRating';

export default function ReviewsList({ activityId }) {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', activityId],
    queryFn: () => base44.entities.Review.filter({
      activity_id: activityId,
      status: 'approved'
    }, '-created_date'),
  });

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-5">
            <div className="flex gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Summary */}
      {reviews.length > 0 && (
        <div className="bg-slate-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-slate-900">{averageRating.toFixed(1)}</p>
              <StarRating rating={Math.round(averageRating)} size="sm" />
              <p className="text-sm text-slate-500 mt-1">{reviews.length} reviews</p>
            </div>
            <div className="flex-1 pl-6 border-l border-slate-200">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(r => r.rating === star).length;
                const percent = (count / reviews.length) * 100;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-slate-600">{star}</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-slate-500">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
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
  );
}