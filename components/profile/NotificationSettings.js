import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageSquare, Calendar, Star, Megaphone } from 'lucide-react';
import { toast } from 'sonner';
import { useGetNotificationsQuery, useUpdateNotificationsMutation } from '@/services/userApi';
import { Skeleton } from '../ui/skeleton';

export default function NotificationSettings() {
  const { data: notifications, isLoading } = useGetNotificationsQuery();
  const [UpdateNotifications] = useUpdateNotificationsMutation()

  const notificationOptions = [
    {
      key: 'emailNotifications',
      icon: Mail,
      label: 'Email Notifications',
      description: 'Receive notifications via email',
    },
    {
      key: 'bookingUpdates',
      icon: Calendar,
      label: 'Booking Updates',
      description: 'Get notified about booking confirmations and changes',
    },
    {
      key: 'newMessages',
      icon: MessageSquare,
      label: 'New Messages',
      description: 'Receive alerts when you get new messages',
    },
    {
      key: 'reviewReminders',
      icon: Star,
      label: 'Review Reminders',
      description: 'Reminders to leave reviews after activities',
    },
    {
      key: 'marketingPromotions',
      icon: Megaphone,
      label: 'Marketing & Promotions',
      description: 'Receive updates about special offers and new features',
    },
  ];

  if (
    isLoading
  ) {
    return (
      <div className=" bg-slate-50 py-8">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }


  const handleSaveSetting = async (checked, option) => {
    try {
      const res = await UpdateNotifications({ [option]: checked }).unwrap()
      console.log(res, "res");
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-slate-700" />
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Notification Preferences</h3>
          <p className="text-sm text-slate-600">Manage how you receive notifications</p>
        </div>
      </div>

      <div className="space-y-6">
        {notificationOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.key} className="flex items-start justify-between gap-4 pb-6 border-b last:border-b-0 last:pb-0">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <Label htmlFor={option.key} className="text-base font-medium text-slate-900 cursor-pointer">
                    {option.label}
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">{option.description}</p>
                </div>
              </div>
              <Switch
                className={"cursor-pointer"}
                id={option.key}
                checked={notifications?.data[option.key]}
                onCheckedChange={(checked) => handleSaveSetting(checked, option.key)}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}