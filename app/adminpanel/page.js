'use client'
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Store } from 'lucide-react';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import AdminUserManagement from '@/components/admin/UserManagement';
import AdminVendorApprovals from '@/components/admin/VendorApprovals';
import AdminBookingOversight from '@/components/admin/BookingsManagement';
import AdminActivityOversight from '@/components/admin/ActivityManagement';
import { useGetAllUserQuery, useGetUserRoleQuery } from '@/services/userApi';
import { useGetAdminsQuery, useGetVendorRequestsQuery, useGetVendorsQuery } from '@/services/adminApi';
import AdminSiteSettings from '@/components/admin/AdminSiteSettings';
import LoadingScreen from '@/components/loader/Loading';

export default function AdminPanel() {
  const [userFilter, setUserFilter] = useState();
  const limit = 20;
  const [userPage, setUserPage] = useState(1)
  const { data: userRoleInfo, isLoading: userRoleInfoFetching } = useGetUserRoleQuery()
  const { data: vendorRequest, isLoading: vendorRequestLoading } = useGetVendorRequestsQuery()
  const { data: vendors, isLoading: vendorsLoading } = useGetVendorsQuery()
  const { data: users, isLoading: usersLoading } = useGetAllUserQuery({
    ...(userFilter && { key: userFilter }),
    page: userPage,
    limit,
  })
  const { data: admins, isLoading: adminsLoading } = useGetAdminsQuery({
    ...(userFilter && { key: userFilter })
  }, { skip: userRoleInfo?.data?.user?.role !== "SUPER_ADMIN" })
  const [activeTab, setActiveTab] = useState('vendors');



  if (
    userRoleInfoFetching || vendorRequestLoading || usersLoading || vendorsLoading || adminsLoading
  ) {
    return (
      <LoadingScreen/>
    );
  }

  if (!(userRoleInfo?.data?.user?.role === 'SUPER_ADMIN' || userRoleInfo?.data?.user?.role === 'ADMIN')) {
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
    );
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
          {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 mb-8">
            <Card
              className="p-4 cursor-pointer hover:shadow-lg max-sm:gap-2 transition-shadow"
              onClick={() => {
                setActiveTab('users');
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-slate-600">Total Users</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{users?.pagination?.total}</p>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:shadow-lg max-sm:gap-2 transition-shadow"
              onClick={() => {
                setActiveTab('users');
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-4 h-4 text-purple-600" />
                <p className="text-xs text-slate-600">Vendors</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{vendors?.pagination?.total}</p>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:shadow-lg max-sm:gap-2 transition-shadow"
              onClick={() => setActiveTab('bookings')}
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <p className="text-xs text-slate-600">Bookings</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{50}</p>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:shadow-lg max-sm:gap-2 transition-shadow"
              onClick={() => setActiveTab('settings')}
            >
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-amber-600" />
                <p className="text-xs text-slate-600">Platform Fee</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">${4000}</p>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:shadow-lg max-sm:gap-2 transition-shadow"
              onClick={() => setActiveTab('payouts')}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <p className="text-xs text-slate-600">Pending Payouts</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{2}</p>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:shadow-lg max-sm:gap-2 transition-shadow"
              onClick={() => setActiveTab('activities')}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <p className="text-xs text-slate-600">Avg Rating</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{4.5}</p>
            </Card>
          </div> */}

          {/* Pending Vendor Alerts */}
          {vendorRequest?.data?.length > 0 && (
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
                    {vendorRequest?.data?.length} vendor application{vendorRequest?.data?.length !== 1 ? 's' : ''} pending approval
                  </p>
                  <p className="text-sm text-slate-600">Click to review applications</p>
                </div>
              </div>
            </Card>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className='scrollbar-hide overflow-x-scroll'>
              <TabsList className={`grid w-full max-md:w-3xl ${userRoleInfo?.data?.user?.role === 'SUPER_ADMIN' ? 'grid-cols-6' : 'grid-cols-5'} text-sm`}>
                <TabsTrigger value="vendors">
                  Approvals
                  {vendorRequest?.data?.length > 0 && (
                    <Badge className="ml-2 bg-amber-500 text-xs">{vendorRequest?.data?.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
                {
                  userRoleInfo?.data?.user?.role === 'SUPER_ADMIN' && 
                <TabsTrigger value="settings">Settings</TabsTrigger>
                }
              </TabsList>
            </div>
            <TabsContent value="vendors">
              <AdminVendorApprovals vendors={vendors} vendorRequest={vendorRequest} />
            </TabsContent>
            <TabsContent value="users">
              <AdminUserManagement userRoleInfo={userRoleInfo} admins={admins} user={users} page={userPage} setPage={setUserPage} limit={limit} vendors={vendors} userFilter={userFilter} setUserFilter={setUserFilter} />
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
              <AdminSiteSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </LayoutWrapper>
  );
}