

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Calendar } from 'lucide-react';
import { useGetActivityCountQuery, useGetAllActivitiesQuery, useGetCategoryQuery, useToggleActivityMutation } from '@/services/activityApi';
import { ConvertCentToDollar } from '@/lib/utils';
import { Tabs, TabsTrigger } from '../ui/tabs';
import { TabsList } from '@radix-ui/react-tabs';
import ShowMorePagination from '../pagination/ShowMorePagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { toast } from 'sonner';


export default function AdminActivityOversight() {
  const [selectedCategory, setSelectedCategory] = useState({
    name: "all",
    _id: null
  });
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [removalReason, setRemovalReason] = useState('')
  const [disableOpen, setDisableOpen] = useState(false)
  const [page, setPage] = useState(1)
  const { data: count } = useGetActivityCountQuery()
  const [Toggle, { isLoading: toggleLoading }] = useToggleActivityMutation()
  const { data: Activities, isLoading } = useGetAllActivitiesQuery({
    ...(selectedCategory?._id && { category: selectedCategory?._id }),
    page,
    limit: 15
  });
  const { data: categories, isLoading: categoryLoading } = useGetCategoryQuery()


  const handleDisable = async () => {
    try {
      const res = await Toggle({ _id: selectedActivity?._id, notes: removalReason }).unwrap()
      toast.success(res?.message)
      setRemovalReason('');
      setDisableOpen(false)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  }

  const handleOpen = () => {
    setDisableOpen(!disableOpen)
    setRemovalReason("")
  }



  return (
    <div className="space-y-6">
      {
        count?.data &&
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <p className="text-sm text-slate-600">Total Activities</p>
            <p className="text-3xl font-bold text-slate-900">{count?.data?.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600">Available</p>
            <p className="text-3xl font-bold text-green-600">{count?.data?.active}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600">Unavailable</p>
            <p className="text-3xl font-bold text-red-600">{count?.data?.total - count?.data?.active}</p>
          </Card>
        </div>
      }
      <Tabs value={selectedCategory} onValueChange={(e) => {
        setPage(1)
        setSelectedCategory(e)
      }} className="w-full">
        <div className='scrollbar-hide overflow-x-scroll'>
          <TabsList className={`grid w-full max-xl:w-6xl grid-cols-7`}>
            <TabsTrigger className={""} value={
              {
                name: "all",
                _id: null
              }
            }>{"ALL"}</TabsTrigger>
            {
              categories?.data.map((item) => (
                <TabsTrigger key={item?._id} className={""} value={item}>{item?.name}</TabsTrigger>
              ))
            }
          </TabsList>
        </div>
      </Tabs>
      {Activities?.data?.length == 0 &&
        <Card className="p-12 text-center">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Activities Found</h3>
          <p className="text-slate-600 mb-4">No Activity for this Category</p>
        </Card>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Activities?.data?.map(activity => (
          <Card key={activity._id} className="overflow-hidden py-0">
            {(
              <img
                src={activity?.imageUrls?.[0] || '/default.png'}
                alt={"Act_image"}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-900">{activity?.name}</h4>
                <Badge className={activity?.availableForBooking ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {activity?.availableForBooking ? (
                    <><Eye className="w-3 h-3 mr-1" />Active</>
                  ) : (
                    <><EyeOff className="w-3 h-3 mr-1" />Inactive</>
                  )}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-slate-600">
                <p className="font-medium text-slate-900">${ConvertCentToDollar(activity?.price)}</p>
                <p>Vendor: {activity?.vendorId?.businessName}</p>
                <p>Vendor email: {activity?.vendorId?.email}</p>
                <p className="capitalize">Category: {activity?.category?.name?.replace('_', ' ')}</p>
              </div>
              <div className="flex flex-col py-2 px-3 bg-slate-50 rounded-lg">
                <div className='flex items-center justify-between'>
                  <span className="text-sm font-medium text-slate-700">
                    {
                      !activity.adminDisabled
                        ? 'Enabled' : 'Disabled'}
                  </span>
                  <button
                    onClick={() => {
                      // handleUpdateActivityStatus(activity.availableForBooking, activity?._id)
                      setSelectedActivity(activity)
                      setDisableOpen(!disableOpen)
                    }}
                    className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors ${!activity.adminDisabled
                      ? 'bg-green-600' : 'bg-slate-300'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        // activity.adminDisabled
                        !activity.adminDisabled
                          ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
                {
                  activity.adminDisabled &&
                  <Textarea
                    className={"mt-2"}
                    value={activity?.adminNotes}
                    readOnly
                    rows={4}
                  />
                }
              </div>
            </div>
          </Card>
        ))}
      </div>
      <ShowMorePagination
        setPage={setPage}
        length={Activities?.data?.length}
        total={Activities?.pagination?.total}
        page={Activities?.pagination?.page}
        totalPages={Activities?.pagination?.totalPages}
      />
      {/* Disable Dialog */}
      <Dialog open={disableOpen} onOpenChange={handleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedActivity?.adminDisabled ? "Enable Activity" : "Disable Activity"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              You are about to {selectedActivity?.adminDisabled ? "enable" : "disable"} <strong>{selectedActivity?.name}</strong> by {selectedActivity?.vendorId?.businessName}.
            </p>
            <p className="text-sm text-slate-600">
              The vendor will be notified via email with the reason provided.
            </p>
            {
              !selectedActivity?.adminDisabled &&
              <div className="space-y-2">
                <Label>Reason for Disable *</Label>
                <Textarea
                  value={removalReason}
                  onChange={(e) => setRemovalReason(e.target.value)}
                  placeholder="Please explain why this activity is being disabled..."
                  rows={4}
                />
              </div>
            }
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setDisableOpen(false);
                  setRemovalReason('');
                  setSelectedActivity(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              {
                selectedActivity?.adminDisabled ?
                  <Button
                    onClick={handleDisable}
                    disabled={toggleLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    {toggleLoading ? 'Removing...' : 'Enable Activity'}
                  </Button> :
                  <Button
                    onClick={handleDisable}
                    disabled={toggleLoading || removalReason.length < 2}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    {toggleLoading ? 'Removing...' : 'Disable Activity'}
                  </Button>
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}