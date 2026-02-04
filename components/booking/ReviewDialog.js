import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import ReviewForm from './ReviewForm';
import { useGetUserActivityReviewsQuery, useRemoveReviewMutation } from '@/services/userApi';
import StarRating from './StarRating';
import { Card } from '../ui/card';
import { format } from 'date-fns';
import { Delete, Loader2, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const ReviewDialog = ({ reviewDialogOpen, setReviewDialogOpen, bookingToReview }) => {
  const { data, isLoading } = useGetUserActivityReviewsQuery({ id: bookingToReview?.activityId?._id }, { skip: !bookingToReview?.activityId?._id })
  const [Remove, { isLoading: removeWait }] = useRemoveReviewMutation()

  const handleRemove = async (reviewId) => {
    try {
      const res = await Remove({ id: reviewId }).unwrap()
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  }

  return (
    <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
      {
        data?.data ?
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Your Review</DialogTitle>
            </DialogHeader>
            {data?.data && (
              <Card className="p-5 bg-white border-0 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-xs text-slate-500">
                          {format(new Date(data?.data?.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <StarRating rating={data?.data?.rating} size="sm" />
                    </div>
                    {data?.data?.description && (
                      <p className="text-slate-600 text-sm leading-relaxed mb-3">
                        {data?.data.description}
                      </p>
                    )}
                    <div className='flex justify-end'>
                      <Button
                        type="button"
                        variant='destructive'
                        onClick={() => handleRemove(data?.data?._id)}
                        disabled={removeWait}
                        className="flex-1 w-fit mt-4"
                      >
                        {removeWait ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Removing...
                          </>
                        ) : (
                          <>
                            <Delete className="w-4 h-4 mr-2" />
                            Remove Review
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </DialogContent>
          :
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Leave a Review</DialogTitle>
            </DialogHeader>
            {bookingToReview && (
              <div>
                <p className="text-sm text-slate-500 mb-4">
                  Share your experience with <span className="font-medium text-slate-700">{bookingToReview?.activityId?.name}</span>
                </p>
                <ReviewForm
                  booking={bookingToReview}
                  onSuccess={() => {
                    setReviewDialogOpen(false);
                  }}
                  onCancel={() => setReviewDialogOpen(false)}
                />
              </div>
            )}
          </DialogContent>
      }
    </Dialog>
  )
}

export default ReviewDialog