

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, EyeOff, Edit, Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useGetActivityCountQuery, useGetAllActivitiesQuery, useGetCategoryQuery } from '@/services/activityApi';
import { ConvertCentToDollar } from '@/lib/utils';
import { Tabs, TabsTrigger } from '../ui/tabs';
import { TabsList } from '@radix-ui/react-tabs';


export default function AdminActivityOversight() {
  const [selectedCategory, setSelectedCategory] = useState({
    name: "all",
    _id: null
  });
  const { data: count } = useGetActivityCountQuery()
  const { data: Activities, isLoading } = useGetAllActivitiesQuery({
    ...(selectedCategory?._id && { category: selectedCategory?._id })
  });
  const { data: categories, isLoading: categoryLoading } = useGetCategoryQuery()



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
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
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

            {/* <TabsTrigger value="COMPLETED">COMPLETED</TabsTrigger>
            <TabsTrigger value="REFUNDED">REFUNDED</TabsTrigger>
            <TabsTrigger value="CANCELLED">CANCELLED</TabsTrigger> */}
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
            {activity?.imageUrls?.length > 0 && (
              <img
                src={activity?.imageUrls?.[0]}
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
                <p>Vendor: {activity?.created_by}</p>
                <p className="capitalize">Category: {activity?.category?.name?.replace('_', ' ')}</p>
              </div>
              {/* <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(activity)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(activity)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div> */}
            </div>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      {/* <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Activity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              You are about to remove <strong>{selectedActivity?.name}</strong> by {selectedActivity?.created_by}.
            </p>
            <p className="text-sm text-slate-600">
              The vendor will be notified via email with the reason provided.
            </p>
            <div className="space-y-2">
              <Label>Reason for Removal *</Label>
              <Textarea
                value={removalReason}
                onChange={(e) => setRemovalReason(e.target.value)}
                placeholder="Please explain why this activity is being removed..."
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setRemovalReason('');
                  setSelectedActivity(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                // disabled={deleteActivityMutation.isPending}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {false ? 'Removing...' : 'Remove Activity'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}

      {/* Edit Activity Dialog */}
      {/* <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Activity Name *</Label>
                <Input
                  value={editFormData.name || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={editFormData.category || 'other'}
                  onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boating">Boating</SelectItem>
                    <SelectItem value="scooter">Scooter</SelectItem>
                    <SelectItem value="kayak_paddleboard">Kayak/Paddleboard</SelectItem>
                    <SelectItem value="nature_trails">Nature Trails</SelectItem>
                    <SelectItem value="jet_ski">Jet Ski</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editFormData.description || ''}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editFormData.price || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Max Guests</Label>
                <Input
                  type="number"
                  value={editFormData.max_guests || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, max_guests: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                value={editFormData.duration || ''}
                onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                placeholder="e.g., 2 hours"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editFormData.available || false}
                onChange={(e) => setEditFormData({ ...editFormData, available: e.target.checked })}
                className="w-4 h-4"
              />
              <Label>Available for booking</Label>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditDialogOpen(false);
                  setSelectedActivity(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                // disabled={updateActivityMutation.isPending}
                className="flex-1 bg-slate-900"
              >
                {false ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}