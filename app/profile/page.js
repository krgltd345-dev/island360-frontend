'use client'
import React from 'react';
import { User, Calendar, Store, Bell } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import PersonalInfoSection from '@/components/profile/PersonalInfo';
import BookingInfo from '@/components/profile/BookingInfo';
import NotificationSettings from '@/components/profile/NotificationSettings';
import { useGetUserProfileQuery, useGetUserRoleQuery, useGetVendorDetailsQuery } from '@/services/userApi';
import VendorBusinessSection from '@/components/profile/VendorBusinessSection';


export default function ProfilePage() {
  const { data: userData, isLoading: userDataFetching } = useGetUserProfileQuery()
  const { data: VendorData, isLoading: vendorDataFetching } = useGetVendorDetailsQuery()
  const { data: userRoleInfo, isLoading: userRoleInfoFetching } = useGetUserRoleQuery()

  if (
    userDataFetching || vendorDataFetching || userRoleInfoFetching
  ) {
    return (
      <LayoutWrapper>
        <div className=" bg-slate-50 mt-12 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-12 w-64 mb-8" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className=" mt-12 bg-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
            <p className="text-slate-600">Manage your account settings and preferences</p>
          </div>

          {/* Profile Header Card */}
          <Card className="p-4 sm:p-6 mb-8">
            <div className="flex items-center sm:justify-between max-sm:flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-slate-900 flex items-center justify-center text-white text-2xl font-bold">
                  {userData?.data?.profileImage ? (
                    <img src={userData?.data?.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    userData?.data?.name?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{userRoleInfo?.data?.user?.name}</h2>
                  <p className="text-slate-600">{userRoleInfo?.data?.user?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {(userRoleInfo?.data?.user?.role === 'SUPER_ADMIN' || userRoleInfo?.data?.user?.role === 'ADMIN') && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                        Administrator
                      </span>
                    )}
                    {userRoleInfo?.data?.user?.vendorId && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        Verified Vendor
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 max-md:flex-col">
                {(userRoleInfo?.data?.user?.role === 'SUPER_ADMIN' || userRoleInfo?.data?.user?.role === 'ADMIN') && (
                  <Link href={'/adminpanel'}>
                    <Button variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                {userRoleInfo?.data?.user?.vendorId ? (
                  <Link href={'/vendordashboard'}>
                    <Button className="bg-slate-900 hover:bg-slate-800">
                      <Store className="w-4 h-4 mr-2" />
                      Vendor Portal
                    </Button>
                  </Link>
                ) : (
                  <Link href={'/vendorsignup'}>
                    <Button className="bg-slate-900 hover:bg-slate-800">
                      <Store className="w-4 h-4 mr-2" />
                      Join as Vendor
                    </Button>
                  </Link>
                )
                }
              </div>
            </div>
          </Card>

          <Tabs defaultValue="personal" className="space-y-6 ">
            <div className='scrollbar-hide overflow-x-scroll'>
              <TabsList className={`grid w-full max-md:w-3xl ${VendorData?.data ? 'grid-cols-4' : 'grid-cols-3'}`}>
                <TabsTrigger value="personal">
                  <User className="w-4 h-4 mr-2" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="bookings">
                  <Calendar className="w-4 h-4 mr-2" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                {VendorData?.data && (
                  <TabsTrigger value="business">
                    <Store className="w-4 h-4 mr-2" />
                    Business
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
            <TabsContent value="personal">
              <PersonalInfoSection user={userData?.data} />
            </TabsContent>

            <TabsContent value="bookings">
              <BookingInfo />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>

            {VendorData?.data && (
              <TabsContent value="business">
                <VendorBusinessSection vendor={VendorData?.data} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </LayoutWrapper>
  );
}