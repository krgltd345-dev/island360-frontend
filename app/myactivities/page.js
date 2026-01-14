'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Calendar, Clock, Shield, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import Link from 'next/link';

const myActivities = [
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
  }
]

export default function MyActivities() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'other',
    description: '',
    price: '',
    billing_type: 'per_person',
    guided_type: 'self_guided',
    unit_name: '',
    group_size: '',
    duration: '',
    minimum_duration: '',
    image_url: '',
    image_url_2: '',
    image_url_3: '',
    max_guests: '',
    default_capacity: '',
    available: true,
    is_donation_based: false,
    operational_days: [],
    operational_hours_start: '09:00',
    operational_hours_end: '17:00',
  });

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const authenticated = await base44.auth.isAuthenticated();
  //     setIsAuthenticated(authenticated);
  //     setCheckingAuth(false);
  //     if (!authenticated) {
  //       base44.auth.redirectToLogin(window.location.href);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // const { data: user } = useQuery({
  //   queryKey: ['user-myactivities'],
  //   queryFn: () => base44.auth.me(),
  //   enabled: isAuthenticated,
  // });

  // const { data: myActivities = [], isLoading } = useQuery({
  //   queryKey: ['my-activities', user?.id],
  //   queryFn: async () => {
  //     if (!user?.id) return [];
  //     const activities = await base44.entities.Activity.list();
  //     return activities.filter(a => a.vendor_id === user.id || a.created_by === user.email);
  //   },
  //   enabled: !!user?.id,
  // });

  // const createActivityMutation = useMutation({
  //   mutationFn: (data) => base44.entities.Activity.create(data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['my-activities'] });
  //     toast.success('Activity created successfully');
  //     setDialogOpen(false);
  //     resetForm();
  //   },
  // });

  // const updateActivityMutation = useMutation({
  //   mutationFn: ({ id, data }) => base44.entities.Activity.update(id, data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['my-activities'] });
  //     toast.success('Activity updated successfully');
  //     setDialogOpen(false);
  //     resetForm();
  //   },
  // });

  // const deleteActivityMutation = useMutation({
  //   mutationFn: (id) => base44.entities.Activity.delete(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['my-activities'] });
  //     toast.success('Activity deleted successfully');
  //   },
  // });

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'other',
      description: '',
      price: '',
      billing_type: 'per_person',
      guided_type: 'self_guided',
      unit_name: '',
      group_size: '',
      duration: '',
      minimum_duration: '',
      image_url: '',
      image_url_2: '',
      image_url_3: '',
      max_guests: '',
      default_capacity: '',
      available: true,
      operational_days: [],
      operational_hours_start: '09:00',
      operational_hours_end: '17:00',
    });
    setEditingActivity(null);
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImages(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, [fieldName]: file_url });
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    }
    setUploadingImages(false);
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormData(activity);
    setDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      max_guests: formData.max_guests ? parseInt(formData.max_guests) : null,
      minimum_duration: formData.minimum_duration ? parseFloat(formData.minimum_duration) : null,
      group_size: formData.billing_type === 'per_group' && formData.group_size ? parseInt(formData.group_size) : null,
      unit_name: formData.billing_type === 'per_unit' ? formData.unit_name : null,
      default_capacity: formData.default_capacity ? parseInt(formData.default_capacity) : null,
      vendor_id: user?.id,
    };

    if (editingActivity) {
      updateActivityMutation.mutate({ id: editingActivity.id, data });
    } else {
      createActivityMutation.mutate(data);
    }
  };

  const toggleDay = (day) => {
    const days = formData.operational_days || [];
    if (days.includes(day)) {
      setFormData({ ...formData, operational_days: days.filter(d => d !== day) });
    } else {
      setFormData({ ...formData, operational_days: [...days, day] });
    }
  };

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  if (false) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-slate-600">Loading...</p>
        </Card>
      </div>
    );
  }

  if (
    // !user?.is_vendor || !user?.vendor_approved
    false

  ) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Shield className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Vendor Access Required</h2>
          <p className="text-slate-600 mb-6">
            {user?.is_vendor
              ? 'Your vendor application is pending approval'
              : 'You need to apply for vendor access to manage activities'}
          </p>
          {!user?.is_vendor && (
            <Link to={createPageUrl('VendorSignup')}>
              <Button className="bg-slate-900">Apply as Vendor</Button>
            </Link>
          )}
        </Card>
      </div>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen mt-12 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Activities</h1>
              <p className="text-slate-600 mt-1">Manage your activity listings</p>
            </div>
            <Button onClick={() => setDialogOpen(true)} className="bg-slate-900">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>

          {false ? (
            <Card className="p-12 text-center">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Activities Yet</h3>
              <p className="text-slate-600 mb-4">Start by creating your first activity</p>
              <Button onClick={() => setDialogOpen(true)} className="bg-slate-900">
                <Plus className="w-4 h-4 mr-2" />
                Create Activity
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
                    <img
                      src={activity.image_url || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'}
                      alt={activity.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">{activity.name}</h3>
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">{activity.description}</p>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-slate-900">${activity.price}</span>
                        </div>
                        {activity.default_capacity && (
                          <p className="text-xs text-slate-500">
                            {activity.default_capacity} {activity.billing_type === 'per_unit' ? 'units' : 'spots'} per time slot
                          </p>
                        )}
                        <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium text-slate-700">
                            {activity.available ? 'Active' : 'Inactive'}
                          </span>
                          <button
                            onClick={() => {
                              updateActivityMutation.mutate({
                                id: activity.id,
                                data: { available: !activity.available }
                              });
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${activity.available ? 'bg-green-600' : 'bg-slate-300'
                              }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${activity.available ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={(`ActivityManagement?id=${activity.id}`)} className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Manage
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(activity)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this activity?')) {
                              deleteActivityMutation.mutate(activity.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Activity Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boating">Boating</SelectItem>
                        <SelectItem value="scooter">Scooter</SelectItem>
                        <SelectItem value="kayak_paddleboard">Kayak/Paddleboard</SelectItem>
                        <SelectItem value="nature_trails">Nature Trails</SelectItem>
                        <SelectItem value="jet_ski">Jet Ski</SelectItem>
                        {false && (
                          <SelectItem value="non_profit">Non-Profit/Community Service</SelectItem>
                        )}
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Activity Type *</Label>
                  <Select value={formData.guided_type} onValueChange={(value) => setFormData({ ...formData, guided_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guided">Guided (with instructor/guide)</SelectItem>
                      <SelectItem value="self_guided">Self-Guided (rental/independent)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Billing Type *</Label>
                  <Select value={formData.billing_type} onValueChange={(value) => setFormData({ ...formData, billing_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per_person">Per Person</SelectItem>
                      <SelectItem value="per_group">Per Group (Fixed Price)</SelectItem>
                      <SelectItem value="per_hour">Per Hour</SelectItem>
                      <SelectItem value="per_unit">Per Unit (Car/Scooter/Kayak/etc.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.billing_type === 'per_unit' && (
                  <div className="space-y-2">
                    <Label>Unit Name *</Label>
                    <Input
                      value={formData.unit_name}
                      onChange={(e) => setFormData({ ...formData, unit_name: e.target.value })}
                      placeholder="e.g., car, scooter, kayak"
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price {formData.is_donation_based ? '(Optional)' : '*'}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required={!formData.is_donation_based}
                      disabled={formData.is_donation_based}
                    />
                    {formData.is_donation_based && (
                      <p className="text-xs text-green-600">Users will enter their own donation amount</p>
                    )}
                  </div>
                  {formData.billing_type === 'per_group' && (
                    <div className="space-y-2">
                      <Label>Maximum Group Size *</Label>
                      <Input
                        type="number"
                        value={formData.group_size}
                        onChange={(e) => setFormData({ ...formData, group_size: e.target.value })}
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Max Guests</Label>
                    <Input
                      type="number"
                      value={formData.max_guests}
                      onChange={(e) => setFormData({ ...formData, max_guests: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Available Spots</Label>
                    <Input
                      type="number"
                      value={formData.default_capacity}
                      onChange={(e) => setFormData({ ...formData, default_capacity: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Min Duration (hours)</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={formData.minimum_duration}
                      onChange={(e) => setFormData({ ...formData, minimum_duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Activity Photos</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {['image_url', 'image_url_2', 'image_url_3'].map((field, idx) => (
                      <div key={field} className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, field)}
                          disabled={uploadingImages}
                          className="text-sm"
                        />
                        {formData[field] && (
                          <img src={formData[field]} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Operational Days
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => {
                      const isSelected = (formData.operational_days || []).includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isSelected
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Operating Hours Start</Label>
                    <Input
                      type="time"
                      value={formData.operational_hours_start}
                      onChange={(e) => setFormData({ ...formData, operational_hours_start: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Operating Hours End</Label>
                    <Input
                      type="time"
                      value={formData.operational_hours_end}
                      onChange={(e) => setFormData({ ...formData, operational_hours_end: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label>Available for booking</Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_donation_based}
                    onChange={(e) => setFormData({ ...formData, is_donation_based: e.target.checked, category: e.target.checked ? 'non_profit' : formData.category })}
                    className="w-4 h-4"
                  />
                  <Label>Donation-based (no fixed price, no platform fee)</Label>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-slate-900">
                    {editingActivity ? 'Update' : 'Create'} Activity
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </LayoutWrapper>
  );
}