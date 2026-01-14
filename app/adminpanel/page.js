'use client'
import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Users, Store, Calendar, DollarSign, Star, Settings, CheckCircle, XCircle, Search, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import AdminUserManagement from '@/components/admin/UserManagement';
import AdminVendorApprovals from '@/components/admin/VendorApprovals';
import AdminBookingOversight from '@/components/admin/BookingsManagement';
import AdminActivityOversight from '@/components/admin/ActivityManagement';
// import AdminVendorApprovals from '@/components/admin/AdminVendorApprovals';
// import AdminVendorVerification from '@/components/admin/AdminVendorVerification';
// import AdminUserManagement from '@/components/admin/AdminUserManagement';
// import AdminActivityOversight from '@/components/admin/AdminActivityOversight';
// import AdminBookingOversight from '@/components/admin/AdminBookingOversight';
// import AdminPayoutManagement from '@/components/admin/AdminPayoutManagement';
// import AdminSiteSettings from '@/components/admin/AdminSiteSettings';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('vendors');
  const [userFilter, setUserFilter] = useState('all');

  // const { data: currentUser } = useQuery({
  //   queryKey: ['current-user'],
  //   queryFn: () => base44.auth.me(),
  // });

  // const { data: users = [] } = useQuery({
  //   queryKey: ['all-users'],
  //   queryFn: () => base44.entities.User.list(),
  // });

  // const { data: activities = [] } = useQuery({
  //   queryKey: ['all-activities'],
  //   queryFn: () => base44.entities.Activity.list(),
  // });

  // const { data: bookings = [] } = useQuery({
  //   queryKey: ['all-bookings'],
  //   queryFn: () => base44.entities.Booking.list('-created_date'),
  // });

  // const { data: payouts = [] } = useQuery({
  //   queryKey: ['all-payouts'],
  //   queryFn: () => base44.entities.Payout.list('-created_date'),
  // });

  // const { data: reviews = [] } = useQuery({
  //   queryKey: ['all-reviews'],
  //   queryFn: () => base44.entities.Review.list('-created_date'),
  // });

  // const stats = useMemo(() => {
  //   const vendors = users.filter(u => u.is_vendor && u.vendor_approved);
  //   const pendingVendors = users.filter(u => u.is_vendor && !u.vendor_approved);
  //   const customers = users.filter(u => !u.is_vendor);
  //   const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_price || 0), 0);
  //   const pendingPayouts = payouts.filter(p => p.status === 'pending' || p.status === 'processing');
  //   const avgRating = reviews.length > 0 
  //     ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
  //     : 0;

  //   return {
  //     totalUsers: users.length,
  //     vendors: vendors.length,
  //     pendingVendors: pendingVendors.length,
  //     customers: customers.length,
  //     totalActivities: activities.length,
  //     totalBookings: bookings.length,
  //     totalRevenue,
  //     platformRevenue: totalRevenue * 0.10,
  //     pendingPayouts: pendingPayouts.length,
  //     totalReviews: reviews.length,
  //     avgRating,
  //   };
  // }, [users, activities, bookings, payouts, reviews]);

  // Check if user is admin
  if (false) {
    return (
      <LayoutWrapper>
      <div className="flex-1 bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-600">You need administrator privileges to access this panel</p>
        </Card>
      </div>
      </LayoutWrapper>
    );!currentUser || currentUser.role !== 'admin'
  }

  return (
    <LayoutWrapper>
    <div className="min-h-screen bg-slate-50 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
              <p className="text-slate-600">Platform management and oversight</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setActiveTab('users');
              setUserFilter('all');
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-slate-600">Total Users</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{10}</p>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setActiveTab('users');
              setUserFilter('vendors');
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Store className="w-4 h-4 text-purple-600" />
              <p className="text-xs text-slate-600">Vendors</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{2}</p>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab('bookings')}
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <p className="text-xs text-slate-600">Bookings</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{50}</p>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab('settings')}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-amber-600" />
              <p className="text-xs text-slate-600">Platform Fee</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">${4000}</p>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab('payouts')}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <p className="text-xs text-slate-600">Pending Payouts</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{2}</p>
          </Card>

          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab('activities')}
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <p className="text-xs text-slate-600">Avg Rating</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{4.5}</p>
          </Card>
        </div>

        {/* Pending Vendor Alerts */}
        {false && (
          <Card 
            className="p-4 mb-8 bg-amber-50 border-amber-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab('vendors')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">
                  {stats.pendingVendors} vendor application{stats.pendingVendors !== 1 ? 's' : ''} pending approval
                </p>
                <p className="text-sm text-slate-600">Click to review applications</p>
              </div>
            </div>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 text-sm">
            <TabsTrigger value="vendors">
              Approvals
              {false && (
                <Badge className="ml-2 bg-amber-500 text-xs">{stats.pendingVendors}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors">
            <AdminVendorApprovals />
          </TabsContent>
          <TabsContent value="users">
            <AdminUserManagement filterType={userFilter} onFilterChange={setUserFilter} />
          </TabsContent>

          <TabsContent value="activities">
            <AdminActivityOversight />
          </TabsContent>

          <TabsContent value="bookings">
            <AdminBookingOversight />
          </TabsContent>

          <TabsContent value="payouts">
            {/* <AdminPayoutManagement payouts={payouts} /> */}
          </TabsContent>

          <TabsContent value="settings">
            {/* <AdminSiteSettings /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </LayoutWrapper>
  );
}