

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';


const activities = [
  {
    "name": "Mountain Climbing",
    "category": "nature_trails",
    "description": "Fun",
    "price": 150,
    "is_donation_based": false,
    "billing_type": "per_hour",
    "guided_type": "guided",
    "unit_name": null,
    "group_size": null,
    "duration": "2",
    "minimum_duration": 1,
    "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/c5bf3db90_nature.jpg",
    "image_url_2": "",
    "image_url_3": "",
    "max_guests": 2,
    "default_capacity": 1,
    "available": true,
    "vendor_id": "695b5d4d9e7a6d8e1b644ebd",
    "operational_days": [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ],
    "operational_hours_start": "09:00",
    "operational_hours_end": "17:00",
    "id": "695b72ec812c781af2aff0ba",
    "created_date": "2026-01-05T08:14:36.399000",
    "updated_date": "2026-01-05T12:18:56.318000",
    "created_by_id": "695b5d4d9e7a6d8e1b644ebd",
    "is_sample": false
  },
  {
    "name": "Guided Tours ",
    "category": "scooter",
    "description": "Full guided scooter tours",
    "price": 65,
    "billing_type": "per_person",
    "guided_type": "self_guided",
    "unit_name": null,
    "group_size": null,
    "duration": "2 hours ",
    "minimum_duration": null,
    "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/10216ec02_0F1250E3-8B9E-4AE7-AADB-C26C4DF390DE.jpeg",
    "image_url_2": null,
    "image_url_3": null,
    "max_guests": 10,
    "default_capacity": 10,
    "available": true,
    "vendor_id": "6937608791802e673f7e8b4b",
    "operational_days": [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ],
    "operational_hours_start": "09:00",
    "operational_hours_end": "17:00",
    "id": "6938b281afe54abb13fb53ea",
    "created_date": "2025-12-09T23:36:33.733000",
    "updated_date": "2025-12-14T00:10:24.615000",
    "created_by_id": "6937608791802e673f7e8b4b",
    "is_sample": false
  },
  {
    "name": "Island Hopping Adventure",
    "category": "other",
    "description": "Experience true island adventure with our Cayman Brac Getaway. Enjoy seamless island hopping, an overnight stay in a cozy cottage, and your own rental car or Scooter to explore at your pace. We include a free GPS loaded with marked points of interest, hidden gems, and top activities—making your Brac escape effortless, exciting, and unforgettable.”\n********Packages include********\nAirfare & Airport pickup and drop (Brac)\nCottage rental\nCar or Scooter Rental\n",
    "price": 275,
    "billing_type": "per_person",
    "group_size": null,
    "duration": "2 Days 1 Night",
    "minimum_duration": null,
    "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/9d407e5a9_islandhoping.png",
    "image_url_2": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/ba993174b_Studio-Project.png",
    "image_url_3": "",
    "max_guests": 8,
    "default_capacity": null,
    "available": true,
    "vendor_id": "69366107c7d0c0c9b0d8fb7c",
    "operational_days": [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ],
    "operational_hours_start": "07:00",
    "operational_hours_end": "17:00",
    "id": "69378504d1f250f2a450257e",
    "created_date": "2025-12-09T02:10:12.103000",
    "updated_date": "2025-12-09T02:10:12.103000",
    "created_by_id": "69366107c7d0c0c9b0d8fb7c",
    "is_sample": false
  },
  {
    "name": "Horseback ridding ",
    "category": "other",
    "description": "Come and Enjoy this great beach ride and stop to swim and enjoy the beauty of the warm Caribbean waters. ",
    "price": 95,
    "billing_type": "per_person",
    "guided_type": "guided",
    "unit_name": null,
    "group_size": null,
    "duration": "4 hours",
    "minimum_duration": 4,
    "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/f133100a7_horseridding.png",
    "image_url_2": "",
    "image_url_3": "",
    "max_guests": null,
    "default_capacity": null,
    "available": true,
    "vendor_id": "69366107c7d0c0c9b0d8fb7c",
    "operational_days": [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ],
    "operational_hours_start": "09:00",
    "operational_hours_end": "17:00",
    "id": "69376f9a0204514dc393baf1",
    "created_date": "2025-12-09T00:38:50.925000",
    "updated_date": "2025-12-13T23:55:59.726000",
    "created_by_id": "69366107c7d0c0c9b0d8fb7c",
    "is_sample": false
  },
  {
    "name": "Private Boat Charter ",
    "category": "boating",
    "description": "Experience luxury and relaxation with our 3 Hour Charter services. Enjoy Reef Snorkeling, Starfish point and swimming with the Stingray,",
    "price": 350,
    "billing_type": "per_hour",
    "guided_type": "guided",
    "unit_name": null,
    "group_size": null,
    "duration": "3 Hours",
    "minimum_duration": 3,
    "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/f1a3c1c4b_RLLCboat.png",
    "image_url_2": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/f8cf0ae3d_STINGRAY_CITY-6.jpg",
    "image_url_3": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/10b841062_8d.jpg",
    "max_guests": 8,
    "default_capacity": 1,
    "available": true,
    "vendor_id": "69366107c7d0c0c9b0d8fb7c",
    "operational_days": [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ],
    "operational_hours_start": "09:00",
    "operational_hours_end": "20:00",
    "id": "69366bfc48655942149af007",
    "created_date": "2025-12-08T06:11:08.446000",
    "updated_date": "2025-12-14T00:19:54.986000",
    "created_by_id": "69366107c7d0c0c9b0d8fb7c",
    "is_sample": false
  },
  {
    "name": "Kayak Eco Tours",
    "category": "kayak_paddleboard",
    "description": "Nature- Using glass bottom kayaks, we launch directly from the Cayman Islands Yacht Club into a vast network of mangroves and waterways. You'll be introduced to local plants, wildlife, culture, and history as we navigate through the crystal-clear water of Grand Cayman.Small Group- We keep our group sizes small and will have one guide for every six participants, the majority of our tours are 4-6 participants. This allows for an interactive experience where you will be able to ask many questions and have the guide offer a more tailored experience.Safety- All participants will receive guidance on the usage of the kayaks and a personal flotation device to assist them should they enter the water.Options- We offer single and double kayaks to participants, but numbers are limited so we cannot guarantee your preferred option.\nRead more about - Small Group Glass Bottom Kayak Adventure- Cayman Islands - ",
    "price": 75,
    "billing_type": "per_unit",
    "unit_name": "Kayak",
    "group_size": null,
    "duration": "3 Hours",
    "minimum_duration": 3,
    "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/886758fa0_kayaktour.png",
    "image_url_2": "",
    "image_url_3": "",
    "max_guests": 2,
    "default_capacity": 8,
    "available": true,
    "vendor_id": "69366107c7d0c0c9b0d8fb7c",
    "operational_days": [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ],
    "operational_hours_start": "09:00",
    "operational_hours_end": "17:00",
    "id": "69366720e3f100c5df8f5725",
    "created_date": "2025-12-08T05:50:24.128000",
    "updated_date": "2025-12-09T03:10:54.003000",
    "created_by_id": "69366107c7d0c0c9b0d8fb7c",
    "is_sample": false
  },
  {
    "name": "Scooter Rental",
    "category": "scooter",
    "description": "Enjoy a day of island fun on your own scooter with free preprogramed GPS to help you find all the spots to enjoy. ",
    "price": 55,
    "billing_type": "per_unit",
    "guided_type": "self_guided",
    "unit_name": "Scooter",
    "group_size": null,
    "duration": "9 hours",
    "minimum_duration": 4,
    "image_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/b5e9bbe88_Scooterrental.png",
    "image_url_2": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/da105cde0_Scooterrental2.png",
    "image_url_3": "",
    "max_guests": 2,
    "default_capacity": 15,
    "available": true,
    "vendor_id": "69366107c7d0c0c9b0d8fb7c",
    "operational_days": [
      "saturday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "sunday"
    ],
    "operational_hours_start": "09:00",
    "operational_hours_end": "17:00",
    "id": "6936664a1c5c4561873d9efd",
    "created_date": "2025-12-08T05:46:50.825000",
    "updated_date": "2025-12-09T03:15:32.813000",
    "created_by_id": "69366107c7d0c0c9b0d8fb7c",
    "is_sample": false
  }
]

export default function AdminActivityOversight() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [removalReason, setRemovalReason] = useState('');
  const [editFormData, setEditFormData] = useState({});




  const handleDeleteClick = (activity) => {
    setSelectedActivity(activity);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (activity) => {
    setSelectedActivity(activity);
    setEditFormData(activity);
    setEditDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
   
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
  };

  const filteredActivities = activities.filter(activity =>
    activity.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getVendorName(activity.created_by)?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: activities.length,
    available: activities.filter(a => a.available).length,
    unavailable: activities.filter(a => !a.available).length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-600">Total Activities</p>
          <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Available</p>
          <p className="text-3xl font-bold text-green-600">{stats.available}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Unavailable</p>
          <p className="text-3xl font-bold text-red-600">{stats.unavailable}</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search activities..."
            className="pl-10"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map(activity => (
          <Card key={activity.id} className="overflow-hidden">
            {activity.image_url && (
              <img
                src={activity.image_url}
                alt={activity.name}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-900">{activity.name}</h4>
                <Badge className={activity.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {activity.available ? (
                    <><Eye className="w-3 h-3 mr-1" />Active</>
                  ) : (
                    <><EyeOff className="w-3 h-3 mr-1" />Inactive</>
                  )}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-slate-600">
                <p className="font-medium text-slate-900">${activity.price}</p>
                <p>Vendor: {activity.created_by}</p>
                <p className="capitalize">Category: {activity.category?.replace('_', ' ')}</p>
              </div>
              <div className="flex gap-2 mt-3">
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
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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
      </Dialog>

      {/* Edit Activity Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
                {false? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}