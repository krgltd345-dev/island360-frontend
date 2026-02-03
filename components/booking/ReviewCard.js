import React from 'react';
import { Card } from "@/components/ui/card";
import { format } from 'date-fns';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from './StarRating';

export default function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="p-5 bg-white border-0 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-slate-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="font-medium text-slate-900">
                  {review?.userId?.name || 'Anonymous'}
                </p>
                <p className="text-xs text-slate-500">
                  {format(new Date(review?.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              <StarRating rating={review?.rating} size="sm" />
            </div>
            {review?.description && (
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                {review.description}
              </p>
            )}
            {/* {review.vendor_response && (
              <div className="mt-3 pl-4 border-l-2 border-sky-500 bg-slate-50 p-3 rounded-r">
                <p className="text-xs font-medium text-slate-700 mb-1">Vendor Response:</p>
                <p className="text-sm text-slate-600">{review.vendor_response}</p>
              </div>
            )} */}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}