import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare, Calendar, Star, Megaphone } from 'lucide-react';
import { toast } from 'sonner';

export default function NotificationSettings({ user }) {
  const [settings, setSettings] = useState({
    notifications_email: user?.notifications_email ?? true,
    notifications_booking: user?.notifications_booking ?? true,
    notifications_messages: user?.notifications_messages ?? true,
    notifications_reviews: user?.notifications_reviews ?? true,
    notifications_marketing: user?.notifications_marketing ?? false,
  });

  const notificationOptions = [
    {
      key: 'notifications_email',
      icon: Mail,
      label: 'Email Notifications',
      description: 'Receive notifications via email',
    },
    {
      key: 'notifications_booking',
      icon: Calendar,
      label: 'Booking Updates',
      description: 'Get notified about booking confirmations and changes',
    },
    {
      key: 'notifications_messages',
      icon: MessageSquare,
      label: 'New Messages',
      description: 'Receive alerts when you get new messages',
    },
    {
      key: 'notifications_reviews',
      icon: Star,
      label: 'Review Reminders',
      description: 'Reminders to leave reviews after activities',
    },
    {
      key: 'notifications_marketing',
      icon: Megaphone,
      label: 'Marketing & Promotions',
      description: 'Receive updates about special offers and new features',
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-slate-700" />
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Notification Preferences</h3>
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
                checked={settings[option.key]}
                onCheckedChange={(checked) => setSettings({ ...settings, [option.key]: checked })}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t">
        <Button
          // onClick={handleSave}
          // disabled={saveSettingsMutation.isPending}
          className="w-full bg-slate-900 hover:bg-slate-800"
        >
          {'Save Preferences'}
        </Button>
      </div>
    </Card>
  );
}