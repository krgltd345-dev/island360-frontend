'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, DollarSign, Calendar, Shield, Clock, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
// import VendorAnalytics from '@/components/vendor/VendorAnalytics';
// import VendorBookingManagement from '@/components/vendor/VendorBookingManagement';
// import VendorReviewsManagement from '@/components/vendor/VendorReviewsManagement';
// import VendorPayoutManagement from '@/components/vendor/VendorPayoutManagement';
// import VendorScheduleManagement from '@/components/vendor/VendorScheduleManagement';
// import VendorEarnings from '@/components/vendor/VendorEarnings';
// import VendorNotificationPanel from '@/components/vendor/VendorNotificationPanel';
// import VendorPromotions from '@/components/vendor/VendorPromotions';
// import VendorCalendarSync from '@/components/vendor/VendorCalendarSync';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useUploadImageMutation } from '@/services/upload';
import { useCreateActivityMutation, useGetAllActivitiesQuery, useGetCategoryQuery, useRemoveActivityMutation, useUpdateActivityMutation } from '@/services/activityApi';
import { useGetUserRoleQuery } from '@/services/userApi';
import Link from 'next/link';


const user = {
  "profile_photo_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/9773e46e9_borrower4.jpg",
  "is_vendor": true,
  "vendor_approved": true,
  "is_non_profit": false,
  "verification_documents": [],
  "verification_status": "verified",
  "vendor_business_name": "Oodles Adventures",
  "vendor_phone": "+91 6397288879",
  "vendor_email": "yakshap.tyagi@oodles.io",
  "vendor_address": "117-120, welldone, Delhi",
  "vendor_business_license": "12",
  "vendor_tax_id": "1234567",
  "vendor_insurance_doc_url": "",
  "vendor_license_doc_url": "",
  "vendor_verified": true,
  "vendor_description": "",
  "payment_method": "paypal",
  "bank_account": "",
  "routing_number": "",
  "paypal_email": "yakshap.tyagi@oodles.io",
  "onboarding_completed": true,
  "verification_notes": "",
  "verified_at": "2026-01-05T08:09:39.619Z",
  "verified_by": "mohd.yasar@oodles.io",
  "id": "695b5d4d9e7a6d8e1b644ebd",
  "created_date": "2026-01-05T06:42:21.514000",
  "updated_date": "2026-01-13T11:47:24.481000",
  "email": "yakshap.tyagi@oodles.io",
  "full_name": "Yakshap Tyagi",
  "disabled": null,
  "is_verified": true,
  "app_id": "692d3a33918f94eb9f4221f4",
  "is_service": false,
  "granted_by_support_access": false,
  "support_access_expires_at": null,
  "_app_role": "admin",
  "role": "admin"
}

const myActivities = [
  {
    "name": "Mountain Climbing",
    "category": "nature_trails",
    "description": "Fun",
    "price": 150,
    "is_donation_based": false,
    "billing_type": "per_hour",
    "guided_type": "guided",
    "unit_name": null,
    "group_size": null,
    "duration": "2",
    "minimum_duration": 1,
    "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/c5bf3db90_nature.jpg",
    "image_url_2": "",
    "image_url_3": "",
    "max_guests": 2,
    "default_capacity": 1,
    "available": true,
    "vendor_id": "695b5d4d9e7a6d8e1b644ebd",
    "operational_days": [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ],
    "operational_hours_start": "09:00",
    "operational_hours_end": "17:00",
    "id": "695b72ec812c781af2aff0ba",
    "created_date": "2026-01-05T08:14:36.399000",
    "updated_date": "2026-01-05T12:18:56.318000",
    "created_by_id": "695b5d4d9e7a6d8e1b644ebd",
    "is_sample": false
  }
]

const bookings = [
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
    "is_group_booking": false,
    "group_organizer_id": null,
    "share_code": null,
    "id": "695baeb8dfb8438b5c070388",
    "created_date": "2026-01-05T12:29:44.436000",
    "updated_date": "2026-01-05T12:29:44.436000",
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

const scale = {
  m: "Minutes",
  h: "Hours",
}

export default function VendorDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [timeScale, setTimeScale] = useState('m');
  const { data: categories } = useGetCategoryQuery()
  const [images, setImages] = useState({
    image_url: '',
    image_url_2: '',
    image_url_3: '',
  })
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    type: 'SELF_GUIDED_TOUR',  // GUIDED_TOUR, SELF_GUIDED_TOUR 
    billingType: 'PER_PERSON', //PER_UNIT, 
    price: '', //number
    maxGuests: '', //number
    availableSpots: '', //n
    durationMinutes: '', //n
    minDurationMinutes: '', //n
    imageUrls: [], //
    operationalDays: [],
    operationalHoursStart: '09:00',
    operationalHoursEnd: '17:00',
    availableForBooking: true,
    allowGroupBookings: true,
  });
  const { data: userRoleInfo, isLoading: userRoleInfoFetching } = useGetUserRoleQuery()
  const { data: Actiities } = useGetAllActivitiesQuery({
    vendorId: userRoleInfo?.data?.user?.vendorId
  }, { skip: !userRoleInfo?.data?.user?.vendorId })
  const [Create] = useCreateActivityMutation()
  const [Update] = useUpdateActivityMutation()
  const [Remove] = useRemoveActivityMutation()
  const [UploadImage] = useUploadImageMutation();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const authenticated = await base44.auth.isAuthenticated();
  //     setIsAuthenticated(authenticated);
  //     setCheckingAuth(false);
  //     if (!authenticated) {
  //       base44.auth.redirectToLogin(window.location.href);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // const { data: myBookings = [] } = useQuery({
  //   queryKey: ['vendor-bookings'],
  //   queryFn: async () => {
  //     const bookings = await base44.entities.Booking.list();
  //     const activityIds = myActivities.map(a => a.id);
  //     return bookings.filter(b => activityIds.includes(b.activity_id));
  //   },
  //   enabled: myActivities.length > 0,
  // });

  const myBookings = useMemo(() => {
    const activityIds = myActivities.map(a => a.id);
    return bookings.filter(b => activityIds.includes(b.activity_id));
  }, [])

  // const createActivityMutation = useMutation({
  //   mutationFn: (data) => base44.entities.Activity.create(data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['vendor-activities'] });
  //     toast.success('Activity created successfully');
  //     setDialogOpen(false);
  //     resetForm();
  //   },
  // });

  // const updateActivityMutation = useMutation({
  //   mutationFn: ({ id, data }) => base44.entities.Activity.update(id, data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['vendor-activities'] });
  //     toast.success('Activity updated successfully');
  //     setDialogOpen(false);
  //     resetForm();
  //   },
  // });

  // const deleteActivityMutation = useMutation({
  //   mutationFn: (id) => base44.entities.Activity.delete(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['vendor-activities'] });
  //     toast.success('Activity deleted successfully');
  //   },
  // });

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      type: 'SELF_GUIDED_TOUR',  // GUIDED_TOUR, SELF_GUIDED_TOUR 
      billingType: 'PER_PERSON', //PER_UNIT, 
      price: '', //number
      maxGuests: '', //number
      availableSpots: '', //n
      durationMinutes: '', //n
      minDurationMinutes: '', //n
      imageUrls: [], //
      operationalDays: [],
      operationalHoursStart: '09:00',
      operationalHoursEnd: '17:00',
      availableForBooking: true,
      allowGroupBookings: true,
    });
    setTimeScale("m")
    setEditingActivity(null);
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImages(true);
    try {
      const formData = new FormData()
      formData.append("image", file)
      const res = await UploadImage({ formData }).unwrap()
      setImages({ ...images, [fieldName]: res?.data?.url });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.log(error, "error");
      toast.error('Failed to upload image');
    }
    setUploadingImages(false);
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormData(activity);
    setImages({
      image_url: activity?.imageUrls?.[0] || '',
      image_url_2: activity?.imageUrls?.[1] || '',
      image_url_3: activity?.imageUrls?.[2] || '',
    })
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        maxGuests: formData.maxGuests ? parseInt(formData.maxGuests) : null,
        availableSpots: formData.availableSpots ? parseInt(formData.availableSpots) : null,
        ...(formData?.allowGroupBookings && { maxGroupSize: parseInt(formData.maxGroupSize) }),
        minDurationMinutes: (formData.minDurationMinutes && timeScale == "h") ? formData.minDurationMinutes * 60 : (formData.minDurationMinutes && timeScale == "d") ? formData.minDurationMinutes * 60 * 24 : parseFloat(formData.minDurationMinutes),
        durationMinutes: (formData.durationMinutes && timeScale == "h") ? formData.durationMinutes * 60 : (formData.durationMinutes && timeScale == "d") ? formData.durationMinutes * 60 * 24 : parseFloat(formData.durationMinutes),
        imageUrls: Object.values(images).filter(Boolean),
        ...(editingActivity && formData?.category?.name && { category: formData?.category?._id }),
      };

      console.log(data, "Create");
      let res;
      if (editingActivity) {
        res = await Update(data).unwrap()
      } else {
        res = await Create(data).unwrap()
      }
      toast.success(res?.message)
      setDialogOpen(false);
      setTimeScale("m")
    } catch (error) {
      toast.error(error?.data?.message)
      console.log(error);
    }
  };

  const handleUpdateActivityStatus = async (status, _id) => {
    try {
      const res = await Update({ availableForBooking: !status, _id }).unwrap();
      toast.success(res?.message)
    } catch (error) {
      toast.error(error?.data?.message)
      console.log(error);
    }
  }

  const handleRemove = async () => {
    try {
      const res = await Remove({ id: formData?._id }).unwrap();
      toast.success(res?.message)
      resetForm()
    } catch (error) {
      toast.error(error?.data?.message)
      console.log(error);
    }
  }

  const toggleDay = (day) => {
    const days = formData.operationalDays || [];
    if (days.includes(day)) {
      setFormData({ ...formData, operationalDays: days.filter(d => d !== day) });
    } else {
      setFormData({ ...formData, operationalDays: [...days, day] });
    }
  };

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const totalRevenue = myBookings.reduce((sum, b) => sum + (b.total_price || 0), 0);

  // Check if user is approved vendor
  if (
    // checkingAuth || !user
    false
  ) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-slate-600">Loading...</p>
        </Card>
      </div>
    );
  }

  if (
    !userRoleInfo?.data?.user?.vendorId
  ) {
    return (
      <LayoutWrapper>
        <div className="flex-1 bg-slate-50 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <Shield className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Vendor Access Required</h2>
            <p className="text-slate-600 mb-6">
              {userRoleInfo?.data?.user?.vendorStatus == 'pending'
                ? 'Your vendor application is pending approval'
                : 'You need to apply for vendor access to use this portal'}
            </p>
            {!userRoleInfo?.data?.user?.vendorStatus && (
              <Link href={'/vendorsignup'}>
                <Button className="bg-slate-900">Apply as Vendor</Button>
              </Link>
            )}
          </Card>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen mt-12 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Vendor Dashboard</h1>
            <Button onClick={() => setDialogOpen(true)} className="bg-slate-900">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Total Activities</p>
                      <p className="text-3xl font-bold text-slate-900">{Actiities?.pagination?.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-sky-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Total Bookings</p>
                      <p className="text-3xl font-bold text-slate-900">{myBookings.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold text-slate-900">${totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* <div>
            <VendorNotificationPanel user={user} />
          </div> */}
          </div>

          <Tabs defaultValue="activities" className="mb-8">
            <TabsList className="grid w-full max-w-6xl grid-cols-8">
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">My Activities</h2>
              {Actiities?.pagination?.total === 0 ? (
                <Card className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No Activities Yet</h3>
                  <p className="text-slate-600 mb-4">Start by creating your first activity</p>
                  <Button onClick={() => setDialogOpen(true)} className="bg-slate-900">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Activity
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Actiities?.data?.map((activity) => (
                    <Card key={activity?._id} className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
                      <img
                        src={activity?.imageUrls[0] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'}
                        alt={activity?.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-slate-900 mb-2">{activity.name}</h3>
                        <p className="text-slate-600 text-sm mb-3 h-10 line-clamp-2">{activity.description}</p>
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-slate-900">${activity.price}</span>
                          </div>
                          {activity.availableSpots && (
                            <p className="text-xs text-slate-500">
                              {activity.availableSpots} {activity.billingType === 'PER_UNIT' ? 'units' : 'spots'} per time slot
                            </p>
                          )}
                          <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-medium text-slate-700">
                              {activity.availableForBooking ? 'Active' : 'Inactive'}
                            </span>
                            <button
                              onClick={() => {
                                handleUpdateActivityStatus(activity.availableForBooking, activity?._id)
                              }}
                              className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors ${activity.availableForBooking ? 'bg-green-600' : 'bg-slate-300'
                                }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${activity.availableForBooking ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(activity)}
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setDeleteDialogOpen(true)
                              setFormData(activity);
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Availability & Schedules</h2>
              {/* <VendorScheduleManagement activities={myActivities} /> */}

              <div className="pt-8 border-t">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Calendar Sync</h2>
                {/* <VendorCalendarSync user={user} /> */}
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Booking Management</h2>
              {/* <VendorBookingManagement bookings={myBookings} activities={myActivities} /> */}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Customer Reviews</h2>
              {/* <VendorReviewsManagement activities={myActivities} /> */}
            </TabsContent>

            <TabsContent value="promotions" className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Promotions & Deals</h2>
              {/* <VendorPromotions activities={myActivities} user={user} /> */}
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">My Earnings</h2>
              {/* <VendorEarnings bookings={myBookings} user={user} /> */}
            </TabsContent>

            <TabsContent value="payouts" className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Payout Management</h2>
              {/* <VendorPayoutManagement bookings={myBookings} user={user} /> */}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Analytics & Insights</h2>
              {/* <VendorAnalytics activities={myActivities} bookings={myBookings} /> */}
            </TabsContent>
          </Tabs>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Activity Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={editingActivity && formData.category?._id ? formData.category?._id : formData?.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          categories?.data?.map((item) => {
                            return (
                              <SelectItem key={item?._id} value={item?._id}>{item?.name}</SelectItem>
                            )
                          })
                        }
                        {/* <SelectItem value="boating">Boating</SelectItem>
                        <SelectItem value="scooter">Scooter</SelectItem>
                        <SelectItem value="kayak_paddleboard">Kayak/Paddleboard</SelectItem>
                        <SelectItem value="nature_trails">Nature Trails</SelectItem>
                        <SelectItem value="jet_ski">Jet Ski</SelectItem>
                        {false && (
                          <SelectItem value="non_profit">Non-Profit/Community Service</SelectItem>
                        )}
                        <SelectItem value="other">Other</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Activity Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GUIDED_TOUR">Guided (with instructor/guide)</SelectItem>
                      <SelectItem value="SELF_GUIDED_TOUR">Self-Guided (rental/independent)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Billing Type *</Label>
                  <Select value={formData.billingType} onValueChange={(value) => setFormData({ ...formData, billingType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PER_PERSON">Per Person</SelectItem>
                      {/* <SelectItem value="per_group">Per Group (Fixed Price)</SelectItem> */}
                      <SelectItem value="PER_HOUR">Per Hour</SelectItem>
                      <SelectItem value="PER_UNIT">Per Unit (Car/Scooter/Kayak/etc.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.allowGroupBookings}
                    onChange={(e) => setFormData({ ...formData, allowGroupBookings: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label>Allow Group Bookings</Label>
                </div>
                {formData?.allowGroupBookings && (
                  <div className="space-y-2">
                    <Label>Maximum Group Size *</Label>
                    <Input
                      type="number"
                      value={formData?.maxGroupSize || ''}
                      onChange={(e) => setFormData({ ...formData, maxGroupSize: e.target.value })}
                      required
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price {'*'}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Guests</Label>
                    <Input
                      type="number"
                      value={formData.maxGuests}
                      onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Available Spots</Label>
                    <Input
                      type="number"
                      value={formData.availableSpots}
                      onChange={(e) => setFormData({ ...formData, availableSpots: e.target.value })}
                    />
                  </div>
                </div>



                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration ( in {scale[timeScale]} )</Label>
                    <div className='flex gap-2 items-center'>
                      <Select value={timeScale} onValueChange={(value) => setTimeScale(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m">Minutes</SelectItem>
                          {/* <SelectItem value="per_group">Per Group (Fixed Price)</SelectItem> */}
                          <SelectItem value="h">Hours</SelectItem>
                          {/* <SelectItem value="d">Days</SelectItem> */}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        value={formData.durationMinutes}
                        onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                        placeholder={timeScale == "m" ? "e.g., 60, 120" : "e.g., 1,2,4.."}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Min Duration ( in {scale[timeScale]} )</Label>
                    <Input
                      type="number"
                      // step="0.5"
                      placeholder={timeScale == "m" ? "e.g., 60, 120" : "e.g., 1,2,4.."}
                      value={formData.minDurationMinutes}
                      onChange={(e) => setFormData({ ...formData, minDurationMinutes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Activity Photos</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {['image_url', 'image_url_2', 'image_url_3'].map((field, idx) => (
                      <div key={field} className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, field)}
                          disabled={uploadingImages}
                          className="text-sm"
                        />
                        {images[field] && (
                          <img src={images[field]} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Operational Days
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => {
                      const isSelected = (formData.operationalDays || []).includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isSelected
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Operating Hours Start</Label>
                    <Input
                      type="time"
                      value={formData.operationalHoursStart}
                      onChange={(e) => setFormData({ ...formData, operationalHoursStart: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Operating Hours End</Label>
                    <Input
                      type="time"
                      value={formData.operationalHoursEnd}
                      onChange={(e) => setFormData({ ...formData, operationalHoursEnd: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.availableForBooking}
                    onChange={(e) => setFormData({ ...formData, availableForBooking: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label>Available for booking</Label>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-slate-900">
                    {editingActivity ? 'Update' : 'Create'} Activity
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className=" max-w-80! overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{'Remove Activity'}</DialogTitle>
              </DialogHeader>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="button" onClick={() => handleRemove()} className="flex-1 bg-slate-900">
                  Remove
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </LayoutWrapper>
  );
}