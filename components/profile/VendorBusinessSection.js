import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, DollarSign, Calendar, TrendingUp, Edit, Save, X, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function VendorBusinessSection({ vendor }) {


  return (
    <div className="space-y-6">
      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">{"NA"}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Bookings</p>
              <p className="text-2xl font-bold text-slate-900">{vendor?.bookingsCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Activities</p>
              <p className="text-2xl font-bold text-slate-900">{vendor?.activeActivities}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Business Details */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-slate-900">Business Details</h3>
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-medium">Verified</span>
              </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label>Business Name</Label>
            
              <p className="text-slate-900 font-medium">{vendor?.vendor?.businessName || 'Not provided'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Business Phone</Label>
                <p className="text-slate-900 font-medium">{vendor?.vendor?.phoneNumber || 'Not provided'}</p>
            </div>

            <div className="space-y-2">
              <Label>Business Email</Label>
                <p className="text-slate-900 font-medium">{vendor?.vendor?.email || 'Not provided'}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Business Address</Label>
              <p className="text-slate-900 font-medium">{vendor?.vendor?.address || 'Not provided'}</p>
          </div>
        </form>
      </Card>
    </div>
  );
}