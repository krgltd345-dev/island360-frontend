import { MessageSquare } from 'lucide-react'
import React from 'react'
import ReviewCard from '../booking/ReviewCard'

const ActivityDetailReview = ({reviews, hideClass}) => {
  return (
    <div className={hideClass}>
      {reviews?.data?.length < 1 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">No reviews yet</h3>
          <p className="text-slate-500 text-sm">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-100 overflow-y-auto">
          {reviews?.data?.map((review, index) => (
            <ReviewCard key={review._id} review={review} index={index} />
          ))}
          {reviews?.data?.map((review, index) => (
            <ReviewCard key={review._id} review={review} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ActivityDetailReview