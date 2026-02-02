'use client'
import React, { useState, useEffect } from 'react';
import { CalendarIcon, Users, Clock, Loader2, ShoppingCart, ChevronRight, ChevronLeft, Check, User } from 'lucide-react';
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
import { useCreateBookingMutation, useCreatePaymentMutation, useGetAvailableSlotsQuery } from '@/services/bookingApi';
import { useGetFeeQuery } from '@/services/adminApi';
import { toast } from 'sonner';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../payments/Checkout';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Date & Time', icon: CalendarIcon },
  { id: 2, name: 'Details', icon: Users },
  { id: 3, name: 'Contact', icon: Check },
];

export default function MultiStepBookingForm({ Activity }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGroupBooking, setIsGroupBooking] = useState(false);

  const [formData, setFormData] = useState({
    activityId: '',
    bookingDate: null,
    slotStartTime: '',
    slotEndTime: '',
    specialRequests: '',
    quantity: 1,
    groupBooking: false,
  });
  const { data: slots } = useGetAvailableSlotsQuery({ id: Activity?.data?._id, date: formData?.bookingDate ? format(formData?.bookingDate, 'yyyy-MM-dd') : formData?.bookingDate }, { skip: !formData?.bookingDate })
  const { data: fee, isLoading: feesLoading } = useGetFeeQuery()
  const [createBooking] = useCreateBookingMutation()
  const [Payment] = useCreatePaymentMutation()
  const canProceedToStep = (step) => {
    if (step === 2) {
      return formData?.bookingDate && formData?.slotStartTime;
    }
    // if (step === 3 && isGroupBooking && !Activity?.data?.billingType == "PER_PERSON") {
    //   return formData?.quantity;
    // }
    if (step === 3 && isGroupBooking && Activity?.data?.billingType !== "PER_PERSON") {
      return formData?.numberOfPersons;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (!formData.bookingDate || !formData?.slotStartTime) {
        toast.error('Please select a date and time');
        return;
      }
      const timeArr = formData?.slotStartTime.split("-")

      console.log(timeArr, "timeArr");
      const data = {
        ...formData,
        activityId: Activity?.data?._id,
        bookingDate: format(formData?.bookingDate, 'yyyy-MM-dd'),
        groupBooking: isGroupBooking,
        slotStartTime: timeArr[0],
        slotEndTime: timeArr[1],

      }
      const res = await createBooking(data).unwrap()
      console.log(res, "booking res");
      if (res?.data?.bookingId) {
        const payData = await Payment({ id: res?.data?.bookingId }).unwrap();
        router.push(`/checkout?id=${payData?.data?.clientSecret}`)
      }
      toast.success('Please Wait, redirecting to payment.');
      // navigate(createPageUrl('MyBookings'));
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (Activity?.data?.billingType === 'PER_PERSON' && isGroupBooking) {
      setFormData({ ...formData, numberOfPersons: formData?.quantity })
    }
  }, [isGroupBooking, Activity, formData?.quantity])

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
                      {formData.bookingDate ? format(formData.bookingDate, 'PPP') : <span className="text-slate-500">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData?.bookingDate}
                      onSelect={(date) => setFormData({ ...formData, bookingDate: date })}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const selectedDate = new Date(date);
                        selectedDate.setHours(0, 0, 0, 0);
                        if (selectedDate < today) return true;
                        // const dateStr = format(date, 'yyyy-MM-dd');
                        // const daySchedules = allActivitySchedules.filter(s => s.date === dateStr);
                        // if (daySchedules.length === 0) return false;
                        // const allBlocked = daySchedules.every(s => s.blocked || !s.available);
                        // return allBlocked;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Select Time</Label>
                <Select
                  value={formData.slotStartTime}
                  onValueChange={(value) => setFormData({ ...formData, slotStartTime: value })}
                  disabled={!formData?.bookingDate}
                >
                  <SelectTrigger className="h-12 border-slate-200">
                    <Clock className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue placeholder={formData?.bookingDate ? "Pick a time" : "Select a date first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      slots && slots?.data?.slots.map((item, idx) => {
                        return (
                          <SelectItem key={idx} value={`${item?.startTime}-${item?.endTime}-${item?.remainingCapacity}`}>
                            <div className="flex items-center justify-between w-full">
                              <span>{item?.startTime}</span>
                              <Badge variant="outline" className="ml-2 text-xs">{item?.remainingCapacity} left</Badge>
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

            {/* {activity.is_donation_based && (
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
            )} */}

            {(Activity?.data?.billingType === 'PER_HOUR' || Activity?.data?.billingType === 'PER_UNIT') && (
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">
                  {Activity?.data?.billingType === 'PER_HOUR' ? 'Number of Hours' : `Number of Units`}
                </Label>
                <Select
                  value={formData?.quantity?.toString()}
                  onValueChange={(value) => setFormData({ ...formData, quantity: parseInt(value) })}
                >
                  <SelectTrigger className="h-12 border-slate-200">
                    <Clock className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Activity?.data?.billingType === 'PER_UNIT' ? [...Array(Activity?.data?.availableSpots)].map((_, i) => {
                        const count = i + 1;
                        return (
                          <SelectItem key={count} value={count.toString()}>
                            {count} {(count === 1 ? 'Unit' : 'Units')}
                          </SelectItem>
                        );
                      }) : [...Array(10)].map((_, i) => {
                        const count = i + 1;
                        return (
                          <SelectItem key={count} value={count.toString()}>
                            {count} {(count === 1 ? 'Hour' : 'Hours')}
                          </SelectItem>
                        );
                      })
                    }
                  </SelectContent>
                </Select>
              </div>
            )}

            {Activity?.data?.billingType === 'PER_PERSON' && (
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Number of Guests</Label>
                <Select
                  value={formData?.quantity?.toString()}
                  onValueChange={(value) => setFormData({ ...formData, quantity: parseInt(value) })}
                >
                  <SelectTrigger className="h-12 border-slate-200">
                    <Users className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(Activity?.data?.maxGuests || 10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {
              Activity?.data?.allowGroupBookings &&
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-600" />
                  <div>
                    <Label className="text-slate-700 font-medium">Group Booking</Label>
                    <p className="text-xs text-slate-500">Invite others and split the booking</p>
                  </div>
                </div>
                <Switch className={"cursor-pointer"} checked={isGroupBooking} onCheckedChange={setIsGroupBooking} />
              </div>
            }

            {isGroupBooking && Activity?.data?.allowGroupBookings && Activity?.data?.billingType !== "PER_PERSON" &&
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">
                  {`Number of Prsons in Group`}
                </Label>
                <Select
                  value={formData?.numberOfPersons?.toString() || Activity?.data?.maxGroupSize}
                  onValueChange={(value) => setFormData({ ...formData, numberOfPersons: parseInt(value) })}
                >
                  <SelectTrigger className="h-12 border-slate-200">
                    <User className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      [...Array(Activity?.data?.maxGroupSize - 1)].map((_, i) => {
                        const count = i + 2;
                        return (
                          <SelectItem key={count} value={count.toString()}>
                            {count} {'Persons'}
                          </SelectItem>
                        );
                      })
                    }
                  </SelectContent>
                </Select>
              </div>
            }

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button type="button" onClick={nextStep} disabled={!canProceedToStep(3)}>
                Next <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-semibold text-slate-900">Billing Summary</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Special Requests (Optional)</Label>
                <Textarea
                  value={formData?.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="border-slate-200 min-h-[100px]"
                  placeholder="Any special requirements or notes..."
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
              <>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${formData?.numberOfPersons && isGroupBooking ? ((Activity?.data?.price * formData?.quantity) / formData?.numberOfPersons).toFixed(2) : (Activity?.data?.price * formData?.quantity).toFixed(2)}</span>
                </div>
                {
                  !Activity?.data?.nonProfitStatus && <div className="flex justify-between text-slate-600">
                    <span>Fees {`(${fee?.data?.fee}%)`}</span>
                    <span>${formData?.numberOfPersons && isGroupBooking ? (((Activity?.data?.price * formData?.quantity) * (fee?.data?.fee / 100)) / formData?.numberOfPersons).toFixed(2) : ((Activity?.data?.price * formData?.quantity) * (fee?.data?.fee / 100)).toFixed(2)}</span>
                  </div>
                }
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  {
                    Activity?.data?.nonProfitStatus ?
                      <span className="text-2xl font-bold text-slate-900">
                        ${formData?.numberOfPersons && isGroupBooking ? ((Activity?.data?.price * formData?.quantity) / formData?.numberOfPersons).toFixed(2) : ((Activity?.data?.price * formData?.quantity)).toFixed(2)}
                      </span> : <span className="text-2xl font-bold text-slate-900">
                        ${formData?.numberOfPersons && isGroupBooking ? (((Activity?.data?.price * formData?.quantity) + ((Activity?.data?.price * formData?.quantity) * (fee?.data?.fee / 100))) / formData?.numberOfPersons).toFixed(2) : ((Activity?.data?.price * formData?.quantity) + ((Activity?.data?.price * formData?.quantity) * (fee?.data?.fee / 100))).toFixed(2)}
                      </span>
                  }
                </div>
              </>
            </div>

            <div className="flex justify-between gap-3">
              <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-slate-900">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Book Now'
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}