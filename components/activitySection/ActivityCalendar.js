'use client';
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { cn } from "@/lib/utils";
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';

export default function ActivityCalendar({ activity, onSelectSlot, viewMode = 'customer' }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch all schedules for this activity
  // const { data: schedules = [] } = useQuery({
  //   queryKey: ['activity-calendar-schedules', activity.id, format(currentMonth, 'yyyy-MM')],
  //   queryFn: async () => {
  //     const start = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  //     const end = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  //     // const allSchedules = await base44.entities.ActivitySchedule.list();
  //     // return allSchedules.filter(s =>
  //     //   s.activity_id === activity.id &&
  //     //   s.date >= start &&
  //     //   s.date <= end
  //     // );
  //   },
  // });

  // Generate default time slots if activity has operational hours
  const generateDefaultSlots = (date) => {
    if (!activity.operational_hours_start || !activity.operational_hours_end) return [];

    const dayName = format(date, 'EEEE').toLowerCase();
    const isOperational = !activity.operational_days ||
      activity.operational_days.length === 0 ||
      activity.operational_days.includes(dayName);

    if (!isOperational) return [];

    const [startHour] = activity.operational_hours_start.split(':').map(Number);
    const [endHour] = activity.operational_hours_end.split(':').map(Number);
    const defaultSlots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
      defaultSlots.push({
        time_slot: timeSlot,
        capacity: activity.default_capacity || activity.max_guests || 10,
        booked_count: 0,
        available: true,
        blocked: false,
        isDefault: true
      });
    }
    return defaultSlots;
  };

  // Get slots for selected date
  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const existingSlots = schedules.filter(s => s.date === dateStr);

    if (existingSlots.length > 0) {
      return existingSlots.sort((a, b) => a.time_slot.localeCompare(b.time_slot));
    }

    // Generate default slots if no schedules exist
    return generateDefaultSlots(selectedDate);
  }, [selectedDate, schedules, activity]);

  // Calculate availability stats for each day
  const dayStats = useMemo(() => {
    const stats = {};
    schedules.forEach(schedule => {
      if (!stats[schedule.date]) {
        stats[schedule.date] = { total: 0, available: 0, blocked: 0, booked: 0 };
      }
      stats[schedule.date].total += 1;
      if (schedule.blocked) {
        stats[schedule.date].blocked += 1;
      } else if (schedule.booked_count >= schedule.capacity) {
        stats[schedule.date].booked += 1;
      } else {
        stats[schedule.date].available += 1;
      }
    });
    return stats;
  }, [schedules]);

  // Custom day renderer for calendar
  const renderDay = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const stats = dayStats[dateStr];

    if (!stats) {
      // Check if day is operational
      const dayName = format(date, 'EEEE').toLowerCase();
      const isOperational = !activity.operational_days ||
        activity.operational_days.length === 0 ||
        activity.operational_days.includes(dayName);

      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <span className={cn(
            "text-sm",
            !isOperational && "text-slate-300"
          )}>
            {format(date, 'd')}
          </span>
        </div>
      );
    }

    const hasAvailable = stats.available > 0;
    const allBooked = stats.booked === stats.total;
    const someBlocked = stats.blocked > 0;

    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <span className="text-sm font-medium">{format(date, 'd')}</span>
        <div className="flex gap-0.5 mt-1">
          {hasAvailable && (
            <div className="w-1 h-1 rounded-full bg-green-500" title="Available slots" />
          )}
          {allBooked && (
            <div className="w-1 h-1 rounded-full bg-red-500" title="Fully booked" />
          )}
          {someBlocked && (
            <div className="w-1 h-1 rounded-full bg-gray-500" title="Some slots blocked" />
          )}
        </div>
      </div>
    );
  };

  const formatTimeSlot = (timeSlot) => {
    const [hour, minute] = timeSlot.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const getSlotStatus = (slot) => {
    if (slot.blocked) return 'blocked';
    if (slot.booked_count >= slot.capacity) return 'full';
    if (slot.booked_count > 0) return 'partial';
    return 'available';
  };

  const getSlotColor = (status) => {
    switch (status) {
      case 'blocked': return 'bg-red-100 border-red-300 text-red-700';
      case 'full': return 'bg-slate-100 border-slate-300 text-slate-500';
      case 'partial': return 'bg-amber-50 border-amber-300 text-amber-700';
      case 'available': return 'bg-green-50 border-green-300 text-green-700';
      default: return 'bg-white border-slate-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar View */}
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          disabled={(date) => date < new Date()}
          className="rounded-md border"
          components={{
            Day: ({ date, ...props }) => (
              <button
                {...props}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  "h-16 w-full p-1 hover:bg-slate-50 rounded-lg transition-colors",
                  isSameDay(date, selectedDate) && "bg-slate-100 ring-2 ring-slate-900"
                )}
              >
                {renderDay(date)}
              </button>
            )
          }}
        />

        {/* Legend */}
        <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-slate-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-slate-600">Fully Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-500" />
            <span className="text-slate-600">Blocked</span>
          </div>
        </div>
      </Card>

      {/* Time Slots View */}
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">
          {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
        </h3>

        {!selectedDate ? (
          <div className="text-center py-8 text-slate-500">
            <Clock className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p className="text-sm">Select a date to view time slots</p>
          </div>
        ) : slotsForDate.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <XCircle className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p className="text-sm">No time slots available</p>
            <p className="text-xs mt-1">This date is not operational</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {slotsForDate.map((slot, index) => {
              const status = getSlotStatus(slot);
              const availableSpots = slot.capacity - slot.booked_count;
              const canSelect = status === 'available' || status === 'partial';

              return (
                <button
                  key={index}
                  onClick={() => canSelect && onSelectSlot && onSelectSlot(selectedDate, slot)}
                  disabled={!canSelect || !onSelectSlot}
                  className={cn(
                    "w-full p-3 rounded-lg border-2 transition-all text-left",
                    getSlotColor(status),
                    canSelect && onSelectSlot && "hover:shadow-md cursor-pointer",
                    !canSelect && "cursor-not-allowed opacity-75"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{formatTimeSlot(slot.time_slot)}</span>
                    </div>
                    {status === 'available' && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    {status === 'blocked' && (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    {status === 'blocked' ? (
                      <span className="text-red-600">
                        {slot.block_reason || 'Blocked'}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>
                          {availableSpots} of {slot.capacity} available
                        </span>
                      </div>
                    )}

                    {viewMode === 'vendor' && slot.booked_count > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {slot.booked_count} booked
                      </Badge>
                    )}
                  </div>

                  {slot.isDefault && (
                    <p className="text-xs mt-1 opacity-75">
                      Default availability
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}