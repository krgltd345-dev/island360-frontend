import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import StarRating from './StarRating';
import { useSubmitReviewMutation } from '@/services/userApi';

export default function ReviewForm({ booking, onSuccess, onCancel }) {
  const [SubmitReview, { isLoading }] = useSubmitReviewMutation()
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(booking, "bookingbooking");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (rating === 0) {
        toast.error('Please select a rating');
        return;
      }

      setIsSubmitting(true);
      await SubmitReview({
        id: booking?.activityId?._id,
        bookingId: booking?._id,
        rating,
        ...(reviewText?.length > 2 && { description: reviewText })
      }).unwrap()
      toast.success('Review submitted!');
      onSuccess?.();
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3">
        <Label className="text-slate-700 font-medium">Your Rating</Label>
        <div className="flex items-center gap-3">
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            interactive
            size="lg"
          />
          <span className="text-sm text-slate-500">
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent'}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Your Review (Optional)</Label>
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience with others..."
          className="min-h-[120px] border-slate-200"
        />
      </div>

      <div className="flex gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-slate-900 hover:bg-slate-800"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Review
            </>
          )}
        </Button>
      </div>
    </form>
  );
}