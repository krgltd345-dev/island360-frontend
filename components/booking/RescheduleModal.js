import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import ReviewForm from './ReviewForm';
import { useGetUserActivityReviewsQuery, useRemoveReviewMutation } from '@/services/userApi';
import StarRating from './StarRating';
import { Card } from '../ui/card';
import { addMinutes, format } from 'date-fns';
import { CalendarIcon, Clock, Delete, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { useGetAvailableSlotsQuery, useRescheduleBookingMutation } from '@/services/bookingApi';

const RescheduleDialog = ({ rescheduleDialogOpen, setRescheduleDialogOpen, booking }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    bookingDate: null,
    slotStartTime: '',
    slotEndTime: '',
  });
  const { data: slots } = useGetAvailableSlotsQuery({ id: booking?.activityId?._id, date: formData?.bookingDate ? format(formData?.bookingDate, 'yyyy-MM-dd') : formData?.bookingDate }, { skip: !formData?.bookingDate })
  const [updateBooking, { isLoading }] = useRescheduleBookingMutation()
  function addMinutesToTime(time, minutesToAdd) {
    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return format(addMinutes(date, minutesToAdd), "HH:mm");
  }

  const handleSave = async (reviewId) => {
    try {
      // toast.success(res?.message)
      if (!formData.bookingDate || !formData?.slotStartTime) {
        toast.error('Please select a date and time');
        return;
      }
      const timeArr = formData?.slotStartTime.split("-")
      const endTime = booking?.activityId?.billingType !== "PER_HOUR" ? addMinutesToTime(timeArr[0], booking?.activityId?.minDurationMinutes) : addMinutesToTime(timeArr[0], booking?.quantity * 60)

      const data = {
        bookingId: booking?._id,
        bookingDate: format(formData?.bookingDate, 'yyyy-MM-dd'),
        slotStartTime: timeArr[0],
        slotEndTime: endTime,

      }
      const res = await updateBooking(data).unwrap()
      toast.success(res?.message)
      setRescheduleDialogOpen(false)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  }


  return (
    <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Your Booking</DialogTitle>
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-semibold text-slate-900">Select Date & Time</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Select Date</Label>
                <Popover open={open} onOpenChange={setOpen} >
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
                      onSelect={(date) => {
                        setFormData({ ...formData, bookingDate: date })
                        // const params = new URLSearchParams(searchParams.toString());
                        // params.set('date', format(date, 'yyyy-MM-dd'));
                        // router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                        setOpen(false);
                      }}
                      modifiers={{
                        originalBooking: booking?.bookingDate ? new Date(booking.bookingDate) : null,
                      }}
                      modifiersClassNames={{
                        originalBooking: ' bg-blue-300 rounded-full',
                      }}
                      disabled={(date) => {
                        const DAY_MAP = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const selectedDate = new Date(date);
                        selectedDate.setHours(0, 0, 0, 0);
                        if (selectedDate < today) return true;
                        const operationalDays = booking?.activityId?.operationalDays || [];
                        if (!operationalDays.length) return true;
                        const selectedDay = DAY_MAP[selectedDate.getDay()];
                        return !operationalDays.includes(selectedDay);
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
                  onValueChange={(value) => {
                    setFormData({ ...formData, slotStartTime: value })
                  }}
                  disabled={!formData?.bookingDate}
                >
                  <SelectTrigger className="h-12 border-slate-200">
                    <Clock className="mr-2 h-4 w-4 text-slate-500" />
                    <SelectValue placeholder={"Pick a time"} />
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
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button disabled={isLoading || !formData.bookingDate || !formData?.slotStartTime} onClick={handleSave} type="button" >
                Save
              </Button>
            </div>
          </div>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
}

export default RescheduleDialog