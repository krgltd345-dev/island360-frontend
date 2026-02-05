'use Client';
import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Calendar, Star, Users, Eye } from 'lucide-react';


const bookings = [
  {
    "activity_id": "6936664a1c5c4561873d9efd",
    "activity_name": "Scooter Rental",
    "booking_date": "2026-01-22",
    "booking_time": "10:00 AM",
    "guests": 1,
    "total_price": 55,
    "status": "confirmed",
    "customer_name": "Sumit Kumar",
    "customer_email": "sumit.kumar6@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "69664904882c878bcad7393f",
    "share_code": "BOOK-G04KBXTG",
    "id": "6970c3a24e8275af9d1ae397",
    "created_date": "2026-01-21T12:16:34.059000",
    "updated_date": "2026-01-21T12:16:34.059000",
    "created_by_id": "69664904882c878bcad7393f",
    "is_sample": false
  },
  {
    "activity_id": "69366720e3f100c5df8f5725",
    "activity_name": "Kayak Eco Tours",
    "booking_date": "2026-01-22",
    "booking_time": "10:00 AM",
    "guests": 1,
    "total_price": 225,
    "status": "confirmed",
    "customer_name": "Sumit Kumar",
    "customer_email": "sumit.kumar6@oodles.io",
    "customer_phone": "987654387",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "69664904882c878bcad7393f",
    "share_code": "BOOK-LYQ8W3J9",
    "id": "6970b0f354008232eac96fb9",
    "created_date": "2026-01-21T10:56:51.561000",
    "updated_date": "2026-01-21T10:56:51.561000",
    "created_by_id": "69664904882c878bcad7393f",
    "is_sample": false
  },
  {
    "activity_id": "69376f9a0204514dc393baf1",
    "activity_name": "Horseback ridding ",
    "booking_date": "2026-01-29",
    "booking_time": "10:00 AM",
    "guests": 1,
    "total_price": 95,
    "status": "confirmed",
    "customer_name": "Sumit Kumar",
    "customer_email": "sumit.kumar6@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": false,
    "group_organizer_id": "69664904882c878bcad7393f",
    "share_code": null,
    "id": "696f3c96308210d7c40c6c2c",
    "created_date": "2026-01-20T08:28:06.993000",
    "updated_date": "2026-01-20T08:28:06.993000",
    "created_by_id": "69664904882c878bcad7393f",
    "is_sample": false
  },
  {
    "activity_id": "69378504d1f250f2a450257e",
    "activity_name": "Island Hopping Adventure",
    "booking_date": "2026-01-22",
    "booking_time": "08:00 AM",
    "guests": 3,
    "total_price": 275,
    "status": "confirmed",
    "customer_name": "Sumit Kumar",
    "customer_email": "sumit.kumar6@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "69664904882c878bcad7393f",
    "share_code": "BOOK-JORUR4CA",
    "id": "696f3a9e55a3c45effe4211b",
    "created_date": "2026-01-20T08:19:42.949000",
    "updated_date": "2026-01-20T08:32:20.588000",
    "created_by_id": "69664904882c878bcad7393f",
    "is_sample": false
  },
  {
    "activity_id": "6938b281afe54abb13fb53ea",
    "activity_name": "Guided Tours ",
    "booking_date": "2026-01-20",
    "booking_time": "10:00 AM",
    "guests": 1,
    "total_price": 65,
    "status": "confirmed",
    "customer_name": "Mohd Yasar",
    "customer_email": "mohd.yasar@oodles.io",
    "customer_phone": "",
    "special_requests": null,
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "695b5e0f96e04eb587d04581",
    "share_code": "BOOK-BDDNXJPZ",
    "id": "696e2a7f41edaf18815979cc",
    "created_date": "2026-01-19T12:58:39.630000",
    "updated_date": "2026-01-20T07:22:58.030000",
    "created_by_id": "695b5e0f96e04eb587d04581",
    "is_sample": false
  },
  {
    "activity_id": "69366bfc48655942149af007",
    "activity_name": "Private Boat Charter ",
    "booking_date": "2026-01-21",
    "booking_time": "10:00 AM",
    "guests": 1,
    "total_price": 1050,
    "status": "confirmed",
    "customer_name": "Mohd Yasar",
    "customer_email": "mohd.yasar@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "695b5e0f96e04eb587d04581",
    "share_code": "BOOK-TBFD5TZ9",
    "id": "696e1b3c570734d46e6dde22",
    "created_date": "2026-01-19T11:53:32.649000",
    "updated_date": "2026-01-19T11:53:32.649000",
    "created_by_id": "695b5e0f96e04eb587d04581",
    "is_sample": false
  },
  {
    "activity_id": "6938b281afe54abb13fb53ea",
    "activity_name": "Guided Tours ",
    "booking_date": "2026-01-21",
    "booking_time": "10:00 AM",
    "guests": 1,
    "total_price": 65,
    "status": "confirmed",
    "customer_name": "Sumit Kumar",
    "customer_email": "sumit.kumar6@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "69664904882c878bcad7393f",
    "share_code": "BOOK-IVQPG636",
    "id": "696e1a07f8956e7ef7a68719",
    "created_date": "2026-01-19T11:48:23.013000",
    "updated_date": "2026-01-19T11:48:23.013000",
    "created_by_id": "69664904882c878bcad7393f",
    "is_sample": false
  },
  {
    "activity_id": "695b72ec812c781af2aff0ba",
    "activity_name": "Mountain Climbing",
    "booking_date": "2026-01-21",
    "booking_time": "12:00 PM",
    "guests": 1,
    "total_price": 100,
    "status": "confirmed",
    "customer_name": "yogesh.sahu",
    "customer_email": "yogesh.sahu@oodles.io",
    "customer_phone": "",
    "special_requests": null,
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "695b5e0f96e04eb587d04581",
    "share_code": "BOOK-Z63W1166",
    "id": "695baeb8dfb8438b5c070388",
    "created_date": "2026-01-05T12:29:44.436000",
    "updated_date": "2026-01-19T11:42:06.716000",
    "created_by_id": "693ae5d7a333edaf661db503",
    "is_sample": false
  },
  {
    "activity_id": "6938b281afe54abb13fb53ea",
    "activity_name": "Guided Tours ",
    "booking_date": "2026-01-08",
    "booking_time": "09:00 AM",
    "guests": 1,
    "total_price": 65,
    "status": "confirmed",
    "customer_name": "Mohd Yasar",
    "customer_email": "mohd.yasar@oodles.io",
    "customer_phone": "122322333",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "695b5e0f96e04eb587d04581",
    "share_code": "BOOK-Z4T88ORO",
    "id": "695ba5dc0c34e929ac71e28b",
    "created_date": "2026-01-05T11:51:56.216000",
    "updated_date": "2026-01-05T11:51:56.216000",
    "created_by_id": "695b5e0f96e04eb587d04581",
    "is_sample": false
  },
  {
    "activity_id": "695b72ec812c781af2aff0ba",
    "activity_name": "Mountain Climbing",
    "booking_date": "2026-01-21",
    "booking_time": "12:00 PM",
    "guests": 1,
    "total_price": 100,
    "status": "confirmed",
    "customer_name": "yogesh.sahu",
    "customer_email": "yogesh.sahu@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "693ae5d7a333edaf661db503",
    "share_code": "BOOK-PLDLO6BZ",
    "id": "695ba5b63add22b90c491f4c",
    "created_date": "2026-01-05T11:51:18.068000",
    "updated_date": "2026-01-05T11:51:18.068000",
    "created_by_id": "693ae5d7a333edaf661db503",
    "is_sample": false
  },
  {
    "activity_id": "695b72ec812c781af2aff0ba",
    "activity_name": "Mountain Climbing",
    "booking_date": "2026-01-10",
    "booking_time": "09:00 AM",
    "guests": 1,
    "total_price": 100,
    "status": "cancelled",
    "customer_name": "yogesh.sahu",
    "customer_email": "yogesh.sahu@oodles.io",
    "customer_phone": "+918287940985",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": false,
    "group_organizer_id": "693ae5d7a333edaf661db503",
    "share_code": null,
    "id": "695b7516399c8e7d89f116ec",
    "created_date": "2026-01-05T08:23:50.621000",
    "updated_date": "2026-01-05T08:24:19.280000",
    "created_by_id": "693ae5d7a333edaf661db503",
    "is_sample": false
  },
  {
    "activity_id": "695b72ec812c781af2aff0ba",
    "activity_name": "Mountain Climbing",
    "booking_date": "2026-01-07",
    "booking_time": "10:00 AM",
    "guests": 1,
    "total_price": 200,
    "status": "completed",
    "customer_name": "Mohd Yasar",
    "customer_email": "mohd.yasar@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": "thanks for your booking",
    "is_group_booking": false,
    "group_organizer_id": "695b5e0f96e04eb587d04581",
    "share_code": null,
    "id": "695b73246c61b503d6c8b736",
    "created_date": "2026-01-05T08:15:32.454000",
    "updated_date": "2026-01-05T09:28:20.539000",
    "created_by_id": "695b5e0f96e04eb587d04581",
    "is_sample": false
  },
  {
    "activity_id": "69366bfc48655942149af007",
    "activity_name": "Private Boat Charter ",
    "booking_date": "2026-01-10",
    "booking_time": "11:00 AM",
    "guests": 1,
    "total_price": 1050,
    "status": "confirmed",
    "customer_name": "Yakshap Tyagi",
    "customer_email": "yakshap.tyagi@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": false,
    "group_organizer_id": "695b5d4d9e7a6d8e1b644ebd",
    "share_code": null,
    "id": "695b6db73e8f573ee2f2d56d",
    "created_date": "2026-01-05T07:52:23.176000",
    "updated_date": "2026-01-05T07:52:23.176000",
    "created_by_id": "695b5d4d9e7a6d8e1b644ebd",
    "is_sample": false
  },
  {
    "activity_id": "69366720e3f100c5df8f5725",
    "activity_name": "Kayak Eco Tours",
    "booking_date": "2026-01-10",
    "booking_time": "11:00 AM",
    "guests": 1,
    "total_price": 75,
    "status": "cancelled",
    "customer_name": "Mohd Yasar",
    "customer_email": "mohd.yasar@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": false,
    "group_organizer_id": "695b5e0f96e04eb587d04581",
    "share_code": null,
    "id": "695b67adaefda376e641405f",
    "created_date": "2026-01-05T07:26:37.451000",
    "updated_date": "2026-01-05T07:27:23.970000",
    "created_by_id": "695b5e0f96e04eb587d04581",
    "is_sample": false
  }
]

const reviews = [
  {
    "activity_id": "695b72ec812c781af2aff0ba",
    "booking_id": "695b73246c61b503d6c8b736",
    "activity_name": "Mountain Climbing",
    "rating": 5,
    "review_text": "good very good experience\n",
    "reviewer_name": "Mohd Yasar",
    "vendor_response": null,
    "vendor_rating": 5,
    "vendor_review_text": "asdsscsz",
    "status": "pending",
    "id": "6960e7b8665043313ec8403b",
    "created_date": "2026-01-09T11:34:16.119000",
    "updated_date": "2026-01-09T11:34:16.119000",
    "created_by_id": "695b5d4d9e7a6d8e1b644ebd",
    "is_sample": false
  }
]

export default function ActivityPerformanceMetrics({ reviews }) {




  const metrics = useMemo(() => {
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_price || 0), 0);
    const totalGuests = bookings.reduce((sum, b) => sum + (b.guests || 0), 0);
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    const cancellationRate = totalBookings > 0 ? (cancelledBookings / totalBookings) * 100 : 0;
    const completionRate = totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0;

    // Monthly revenue trend
    const monthlyData = {};
    bookings.forEach(booking => {
      const month = booking.booking_date?.substring(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = { month, revenue: 0, bookings: 0 };
      }
      monthlyData[month].revenue += booking.total_price || 0;
      monthlyData[month].bookings += 1;
    });

    const revenueData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

    return {
      totalBookings,
      completedBookings,
      cancelledBookings,
      totalRevenue,
      totalGuests,
      avgRating,
      cancellationRate,
      completionRate,
      revenueData,
      avgBookingValue: totalBookings > 0 ? totalRevenue / totalBookings : 0,
    };
  }, [bookings, reviews]);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">${metrics.totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-slate-500 mt-1">
                Avg: ${metrics.avgBookingValue.toFixed(2)}
              </p>
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
              <p className="text-2xl font-bold text-slate-900">{metrics.totalBookings}</p>
              <p className="text-xs text-slate-500 mt-1">
                {metrics.completedBookings} completed
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
              <p className="text-sm text-slate-600">Total Guests</p>
              <p className="text-2xl font-bold text-slate-900">{metrics.totalGuests}</p>
              <p className="text-xs text-slate-500 mt-1">
                Avg: {metrics.totalBookings > 0 ? (metrics.totalGuests / metrics.totalBookings).toFixed(1) : 0} per booking
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Rating</p>
              <p className="text-2xl font-bold text-slate-900">
                {metrics.avgRating > 0 ? metrics.avgRating.toFixed(1) : 'N/A'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {reviews.length} reviews
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
            {metrics.completionRate >= 80 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className="text-3xl font-bold text-slate-900">{metrics.completionRate.toFixed(1)}%</p>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${metrics.completionRate}%` }}
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-slate-900">Cancellation Rate</h4>
            {metrics.cancellationRate <= 10 ? (
              <TrendingDown className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingUp className="w-5 h-5 text-red-600" />
            )}
          </div>
          <p className="text-3xl font-bold text-slate-900">{metrics.cancellationRate.toFixed(1)}%</p>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${metrics.cancellationRate}%` }}
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