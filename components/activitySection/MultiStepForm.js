'use client'
import React, { useState, useEffect } from 'react';
import { CalendarIcon, Users, Clock, Loader2, ShoppingCart, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';

const steps = [
  { id: 1, name: 'Date & Time', icon: CalendarIcon },
  { id: 2, name: 'Details', icon: Users },
  { id: 3, name: 'Contact', icon: Check },
];

export default function MultiStepBookingForm({ activity }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGroupBooking, setIsGroupBooking] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);

  const [formData, setFormData] = useState({
    booking_date: null,
    booking_time: '',
    guests: 1,
    hours: activity.minimum_duration || 1,
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    special_requests: '',
    donation_amount: activity.is_donation_based ? 0 : null,
  });

  // const { data: currentUser } = useQuery({
  //   queryKey: ['current-user-booking'],
  //   queryFn: async () => {
  //     const isAuth = await base44.auth.isAuthenticated();
  //     if (!isAuth) return null;
  //     return base44.auth.me();
  //   },
  // });

  // const { data: cartItems = [] } = useQuery({
  //   queryKey: ['cart-items-conflict'],
  //   queryFn: () => base44.entities.Cart.list(),
  //   enabled: !!currentUser,
  // });

  // const { data: userBookings = [] } = useQuery({
  //   queryKey: ['user-bookings-conflict'],
  //   queryFn: () => base44.entities.Booking.list(),
  //   enabled: !!currentUser,
  // });

  // const { data: allActivitySchedules = [] } = useQuery({
  //   queryKey: ['all-activity-schedules', activity.id],
  //   queryFn: async () => {
  //     const allSchedules = await base44.entities.ActivitySchedule.list();
  //     return allSchedules.filter(s => s.activity_id === activity.id);
  //   },
  // });

  // const { data: schedules = [] } = useQuery({
  //   queryKey: ['activity-schedules', activity.id, formData.booking_date],
  //   queryFn: async () => {
  //     if (!formData.booking_date) return [];
  //     const allSchedules = await base44.entities.ActivitySchedule.list();
  //     const dateStr = format(formData.booking_date, 'yyyy-MM-dd');
  //     const existingSchedules = allSchedules.filter(s =>
  //       s.activity_id === activity.id &&
  //       s.date === dateStr &&
  //       s.available &&
  //       !s.blocked
  //     );

  //     if (existingSchedules.length === 0 && activity.operational_hours_start && activity.operational_hours_end) {
  //       const dayName = format(formData.booking_date, 'EEEE').toLowerCase();
  //       const isOperational = !activity.operational_days || activity.operational_days.length === 0 || activity.operational_days.includes(dayName);

  //       if (isOperational) {
  //         const [startHour] = activity.operational_hours_start.split(':').map(Number);
  //         const [endHour] = activity.operational_hours_end.split(':').map(Number);
  //         const defaultSlots = [];

  //         for (let hour = startHour; hour < endHour; hour++) {
  //           const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
  //           defaultSlots.push({
  //             time_slot: timeSlot,
  //             capacity: activity.default_capacity || activity.max_guests || 10,
  //             booked_count: 0,
  //             available: true,
  //             blocked: false
  //           });
  //         }
  //         return defaultSlots;
  //       }
  //     }

  //     return existingSchedules;
  //   },
  //   enabled: !!formData.booking_date,
  // });

  // React.useEffect(() => {
  //   if (currentUser && !formData.customer_name) {
  //     setFormData(prev => ({
  //       ...prev,
  //       customer_name: currentUser.full_name || '',
  //       customer_email: currentUser.email || '',
  //       customer_phone: currentUser.phone || '',
  //     }));
  //   }
  // }, [currentUser]);

  React.useEffect(() => {
    if (isGroupBooking) {
      setFormData(prev => ({ ...prev, guests: groupMembers.length + 1 }));
    }
  }, [groupMembers.length, isGroupBooking]);

  const canProceedToStep = (step) => {
    if (step === 2) {
      return formData.booking_date && formData.booking_time;
    }
    if (step === 3) {
      return true; // Details step is optional
    }
    return true;
  };

  const nextStep = () => {
    if (canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error('Please complete the required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const checkAuthAndProceed = async (action) => {
    const isAuthenticated = await base44.auth.isAuthenticated();
    if (!isAuthenticated) {
      base44.auth.redirectToLogin(window.location.href);
      return false;
    }
    return true;
  };

  // const handleAddToCart = async () => {
  //   if (!formData.booking_date || !formData.booking_time) {
  //     toast.error('Please select a date and time');
  //     return;
  //   }

  //   const canProceed = await checkAuthAndProceed();
  //   if (!canProceed) return;

  //   await base44.entities.Cart.create({
  //     activity_id: activity.id,
  //     activity_name: activity.name,
  //     activity_price: activity.is_donation_based ? formData.donation_amount : activity.price,
  //     booking_date: format(formData.booking_date, 'yyyy-MM-dd'),
  //     booking_time: formData.booking_time,
  //     guests: (activity.billing_type === 'per_hour' || activity.billing_type === 'per_unit' || activity.is_donation_based) ? 1 : formData.guests,
  //     subtotal: activity.is_donation_based ? formData.donation_amount : (activity.billing_type === 'per_group' ? activity.price :
  //       (activity.billing_type === 'per_hour' || activity.billing_type === 'per_unit') ? activity.price * formData.hours :
  //         activity.price * formData.guests),
  //   });

  //   toast.success('Added to cart!');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.booking_date || !formData.booking_time) {
      toast.error('Please select a date and time');
      return;
    }

    if (!formData.customer_name || !formData.customer_email) {
      toast.error('Please fill in your contact details');
      return;
    }

    const canProceed = await checkAuthAndProceed();
    if (!canProceed) return;

    setIsSubmitting(true);

    const shareCode = isGroupBooking ? `BOOK-${Math.random().toString(36).substring(2, 10).toUpperCase()}` : null;

    const bookingData = {
      activity_id: activity.id,
      activity_name: activity.name,
      booking_date: format(formData.booking_date, 'yyyy-MM-dd'),
      booking_time: formData.booking_time,
      guests: (activity.billing_type === 'per_hour' || activity.billing_type === 'per_unit' || activity.is_donation_based) ? 1 : formData.guests,
      total_price: activity.is_donation_based ? formData.donation_amount : (activity.billing_type === 'per_group' ? activity.price :
        (activity.billing_type === 'per_hour' || activity.billing_type === 'per_unit') ? activity.price * formData.hours :
          activity.price * formData.guests),
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      special_requests: formData.special_requests,
      status: 'confirmed',
      is_group_booking: isGroupBooking,
      group_organizer_id: currentUser?.id,
      share_code: shareCode
    };

    const booking = await base44.entities.Booking.create(bookingData);

    if (isGroupBooking) {
      await base44.entities.BookingParticipant.create({
        booking_id: booking.id,
        user_id: currentUser?.id,
        user_email: currentUser?.email,
        user_name: currentUser?.full_name,
        status: 'accepted',
        is_organizer: true,
        payment_status: 'paid',
        amount_paid: bookingData.total_price,
        booking_number: `BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      });

      for (const member of groupMembers) {
        await base44.entities.BookingParticipant.create({
          booking_id: booking.id,
          user_email: member.email,
          user_name: member.name,
          status: 'pending',
          is_organizer: false,
          payment_status: 'unpaid'
        });

        const shareLink = `${window.location.origin}?join_booking=${shareCode}`;
        await base44.integrations.Core.SendEmail({
          to: member.email,
          subject: `You're invited to join a booking - ${activity.name}`,
          body: `Hi ${member.name},\n\n${currentUser?.full_name} has invited you to join their booking for "${activity.name}".\n\nDate: ${format(formData.booking_date, 'MMMM d, yyyy')}\nTime: ${formData.booking_time}\n\nClick here to accept and pay your share: ${shareLink}\n\nOr use this code: ${shareCode}\n\nThank you!\nIsland 360`
        });
      }
    }

    const user = await base44.auth.me();
    if (user.notifications_booking) {
      await base44.entities.Notification.create({
        user_id: user.id,
        type: 'booking_confirmed',
        title: 'Booking Confirmed!',
        message: `Your booking for "${activity.name}" on ${format(formData.booking_date, 'MMM d, yyyy')} has been confirmed.`,
        link_url: '/MyBookings',
        related_id: booking.id,
      });
    }

    if (user.notifications_email && user.notifications_booking) {
      await base44.integrations.Core.SendEmail({
        to: formData.customer_email,
        subject: `Booking Confirmation - ${activity.name}`,
        body: `Hi ${formData.customer_name},\n\nYour booking for "${activity.name}" has been confirmed!\n\nDate: ${format(formData.booking_date, 'MMM d, yyyy')}\nTime: ${formData.booking_time}\nGuests: ${formData.guests}\n\nTotal: $${bookingData.total_price}\n\nThank you for booking with Island 360!`,
      });
    }

    if (activity.vendor_id) {
      const allUsers = await base44.entities.User.list();
      const vendor = allUsers.find(u => u.id === activity.vendor_id);

      if (vendor) {
        if (vendor.notifications_booking) {
          await base44.entities.Notification.create({
            user_id: vendor.id,
            type: 'vendor_new_booking',
            title: 'New Booking!',
            message: `${formData.customer_name} booked "${activity.name}" for ${format(formData.booking_date, 'MMM d, yyyy')} at ${formData.booking_time}`,
            link_url: '/VendorDashboard',
            related_id: booking.id,
          });
        }

        if (vendor.notifications_email && vendor.notifications_booking) {
          await base44.integrations.Core.SendEmail({
            to: vendor.email,
            subject: `New Booking - ${activity.name}`,
            body: `Hi ${vendor.vendor_business_name || vendor.full_name},\n\nYou have a new booking!\n\nActivity: ${activity.name}\nCustomer: ${formData.customer_name}\nEmail: ${formData.customer_email}\nPhone: ${formData.customer_phone}\nDate: ${format(formData.booking_date, 'MMM d, yyyy')}\nTime: ${formData.booking_time}\nGuests: ${formData.guests}\nTotal: $${bookingData.total_price}\n\n${formData.special_requests ? `Special Requests: ${formData.special_requests}\n\n` : ''}Manage your bookings at: ${window.location.origin}/VendorDashboard\n\nThank you!\nIsland 360`
          });
        }
      }
    }

    toast.success('Booking submitted successfully!');
    navigate(createPageUrl('MyBookings'));
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${isCompleted ? 'bg-green-600 text-white' :
                    isActive ? 'bg-slate-900 text-white' :
                      'bg-slate-200 text-slate-400'
                    }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <p className={`text-xs font-medium ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded transition-all ${isCompleted ? 'bg-green-600' : 'bg-slate-200'
                    }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Date & Time */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-semibold text-slate-900">Select Date & Time</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-12 border-slate-200"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                      {formData.booking_date ? format(formData.booking_date, 'PPP') : <span className="text-slate-500">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.booking_date}
                      onSelect={(date) => setFormData({ ...formData, booking_date: date })}
                      // disabled={(date) => {
                      //   if (date < new Date()) return true;
                      //   const dateStr = format(date, 'yyyy-MM-dd');
                      //   const daySchedules = allActivitySchedules.filter(s => s.date === dateStr);
                      //   if (daySchedules.length === 0) return false;
                      //   const allBlocked = daySchedules.every(s => s.blocked || !s.available);
                      //   return allBlocked;
                      // }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Select Time</Label>
                <Select
                  value={formData.booking_time}
                  onValueChange={(value) => setFormData({ ...formData, booking_time: value })}
                  disabled={!formData.booking_date}
                >
                  <SelectTrigger className="h-12 border-slate-200">
                    <Clock className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue placeholder={formData.booking_date ? "Pick a time" : "Select a date first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      [1, 2, 3, 4, 5, 6].map((item) => {
                        return (
                          <SelectItem key={item} value={item}>
                            <div className="flex items-center justify-between w-full">
                              <span>{"10:00 AM"}</span>
                              <Badge variant="outline" className="ml-2 text-xs">{1} left</Badge>
                            </div>
                          </SelectItem>
                        )
                      })

                    }
                    {/* {schedules.map((schedule) => {
                      const availableSpots = schedule.capacity - schedule.booked_count;
                      const [hour, minute] = schedule.time_slot.split(':').map(Number);
                      const period = hour >= 12 ? 'PM' : 'AM';
                      const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                      const timeDisplay = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;

                      return (
                        <SelectItem key={schedule.time_slot} value={timeDisplay} disabled={availableSpots === 0}>
                          <div className="flex items-center justify-between w-full">
                            <span>{timeDisplay}</span>
                            <Badge variant="outline" className="ml-2 text-xs">{availableSpots} left</Badge>
                          </div>
                        </SelectItem>
                      );
                    })} */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={nextStep} disabled={!canProceedToStep(2)}>
                Next <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Booking Details */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-semibold text-slate-900">Booking Details</h3>

            {activity.is_donation_based && (
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Your Donation Amount</Label>
                <Input
                  type="number"
                  step="1"
                  min="0"
                  value={formData.donation_amount}
                  onChange={(e) => setFormData({ ...formData, donation_amount: parseFloat(e.target.value) || 0 })}
                  className="h-12 border-slate-200"
                  placeholder="Enter donation amount"
                />
                <p className="text-xs text-green-600">Your contribution supports this community service.</p>
              </div>
            )}

            {!activity.is_donation_based && (activity.billing_type === 'per_hour' || activity.billing_type === 'per_unit') && (
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">
                  {activity.billing_type === 'per_hour' ? 'Number of Hours' : `Number of ${activity.unit_name || 'Units'}s`}
                </Label>
                <Select
                  value={formData.hours.toString()}
                  onValueChange={(value) => setFormData({ ...formData, hours: parseInt(value) })}
                >
                  <SelectTrigger className="h-12 border-slate-200">
                    <Clock className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(activity.billing_type === 'per_unit' ? 20 : 12)].map((_, i) => {
                      const count = i + 1;
                      return (
                        <SelectItem key={count} value={count.toString()}>
                          {count} {activity.billing_type === 'per_unit'
                            ? (count === 1 ? (activity.unit_name || 'unit') : `${activity.unit_name || 'unit'}s`)
                            : (count === 1 ? 'Hour' : 'Hours')}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}

            {!activity.is_donation_based && activity.billing_type !== 'per_hour' && activity.billing_type !== 'per_unit' && !isGroupBooking && (
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Number of Guests</Label>
                <Select
                  value={formData.guests.toString()}
                  onValueChange={(value) => setFormData({ ...formData, guests: parseInt(value) })}
                >
                  <SelectTrigger className="h-12 border-slate-200">
                    <Users className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(activity.max_guests || 10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-600" />
                <div>
                  <Label className="text-slate-700 font-medium">Group Booking</Label>
                  <p className="text-xs text-slate-500">Invite others and split the booking</p>
                </div>
              </div>
              <Switch checked={isGroupBooking} onCheckedChange={setIsGroupBooking} />
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button type="button" onClick={nextStep}>
                Next <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Full Name</Label>
                <Input
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="h-12 border-slate-200"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Email</Label>
                  <Input
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    className="h-12 border-slate-200"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Phone</Label>
                  <Input
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    className="h-12 border-slate-200"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Special Requests (Optional)</Label>
                <Textarea
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  className="border-slate-200 min-h-[100px]"
                  placeholder="Any special requirements or notes..."
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
              {activity.is_donation_based ? (
                <>
                  <div className="flex justify-between text-green-700">
                    <span>Your Donation</span>
                    <span className="text-2xl font-bold">${formData.donation_amount?.toFixed(2) || '0.00'}</span>
                  </div>
                  <p className="text-xs text-green-600">100% goes to the organization - no platform fee</p>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>${((activity.billing_type === 'per_hour' || activity.billing_type === 'per_unit') ? activity.price * formData.hours : activity.price * formData.guests).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-slate-900">
                      ${((activity.billing_type === 'per_hour' || activity.billing_type === 'per_unit') ? activity.price * formData.hours : activity.price * formData.guests).toFixed(2)}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between gap-3">
              <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button type="button"  variant="outline" className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-slate-900">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  activity.is_donation_based ? 'Confirm Participation' : 'Book Now'
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}