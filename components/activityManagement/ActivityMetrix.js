'use Client';
import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calendar, Star } from 'lucide-react';


export default function ActivityPerformanceMetrics({ reviews, activityMetrics }) {

  const [avgRating, setAverageRating] = useState(0)


  useEffect(() => {
    if (reviews?.data?.length > 0) {
      const sum = reviews?.data?.reduce((acc, curr) => acc + curr?.rating, 0)
      const avg = sum / reviews?.data?.length
      setAverageRating(avg)
    }

  }, [reviews])



  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">{"NA"}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Bookings</p>
              <p className="text-2xl font-bold text-slate-900">{activityMetrics?.data?.totalBookings}</p>
              <p className="text-xs text-slate-500 mt-1">
                {activityMetrics?.data?.completedBookings} completed
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Rating</p>
              <p className="text-2xl font-bold text-slate-900">
                {avgRating > 0 ? avgRating?.toFixed(1) : 'N/A'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {reviews?.data?.length} reviews
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-slate-900">Completion Rate</h4>
            {activityMetrics?.data?.completionRate >= 80 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className="text-3xl font-bold text-slate-900">{activityMetrics?.data?.completionRate.toFixed(1)}%</p>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${activityMetrics?.data?.completionRate}%` }}
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-slate-900">Cancellation Rate</h4>
            {activityMetrics?.data?.cancellationRate <= 10 ? (
              <TrendingDown className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingUp className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className="text-3xl font-bold text-slate-900">{activityMetrics?.data?.cancellationRate.toFixed(1)}%</p>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${activityMetrics?.data?.cancellationRate}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Revenue Trend Chart */}
      {/* {metrics.revenueData.length > 0 && (
        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Revenue Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )} */}

      {/* Recent Reviews */}
      {reviews?.data?.length > 0 && (
        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Recent Reviews</h4>
          <div className="space-y-3">
            {reviews?.data?.slice(0, 5).map((review) => (
              <div key={review._id} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review?.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{review?.description}</p>
                  <p className="text-xs text-slate-500 mt-1">by {review?.userId?.name}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}