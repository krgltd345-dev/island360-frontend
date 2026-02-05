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
import { useCreateActivityMutation, useGetAllActivitiesQuery, useGetCategoryQuery, useRemoveActivityMutation, useUpdateActivityMutation } from '@/services/activityApi';
import { useGetUserRoleQuery } from '@/services/userApi';
import { useUploadImageMutation } from '@/services/upload';
import { ConvertCentToDollar } from '@/lib/utils';


const scale = {
  m: "Minutes",
  h: "Hours",
}

export default function MyActivities() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [timeScale, setTimeScale] = useState('m');
  const { data: categories } = useGetCategoryQuery()
  const [images, setImages] = useState({
    image_url: '',
    image_url_2: '',
    image_url_3: '',
  })
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    type: 'SELF_GUIDED_TOUR',  // GUIDED_TOUR, SELF_GUIDED_TOUR 
    billingType: 'PER_PERSON', //PER_UNIT, 
    price: '', //number
    maxGuests: '', //number
    availableSpots: '', //n
    durationMinutes: '', //n
    minDurationMinutes: '', //n
    imageUrls: [], //
    operationalDays: [],
    operationalHoursStart: '09:00',
    operationalHoursEnd: '17:00',
    availableForBooking: true,
    allowGroupBookings: true,
  });
  const { data: userRoleInfo, isLoading: userRoleInfoFetching } = useGetUserRoleQuery()
  const { data: Actiities } = useGetAllActivitiesQuery({
    vendorId: userRoleInfo?.data?.user?.vendorId
  }, { skip: !userRoleInfo?.data?.user?.vendorId })
  const [Create] = useCreateActivityMutation()
  const [Update] = useUpdateActivityMutation()
  const [Remove] = useRemoveActivityMutation()
  const [UploadImage] = useUploadImageMutation();

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      type: 'SELF_GUIDED_TOUR',  // GUIDED_TOUR, SELF_GUIDED_TOUR 
      billingType: 'PER_PERSON', //PER_UNIT, 
      price: '', //number
      maxGuests: '', //number
      availableSpots: '', //n
      durationMinutes: '', //n
      minDurationMinutes: '', //n
      imageUrls: [], //
      operationalDays: [],
      operationalHoursStart: '09:00',
      operationalHoursEnd: '17:00',
      availableForBooking: true,
      allowGroupBookings: true,
    });
    setImages({
      image_url: '',
      image_url_2: '',
      image_url_3: '',
    })
    setTimeScale("m")
    setEditingActivity(null);
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImages(true);
    try {
      const formData = new FormData()
      formData.append("image", file)
      const res = await UploadImage({ formData }).unwrap()
      setImages({ ...images, [fieldName]: res?.data?.url });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.log(error, "error");
      toast.error('Failed to upload image');
    }
    setUploadingImages(false);
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormData(activity);
    setFormData({ ...activity, price: ConvertCentToDollar(activity?.price) })
    setImages({
      image_url: activity?.imageUrls?.[0] || '',
      image_url_2: activity?.imageUrls?.[1] || '',
      image_url_3: activity?.imageUrls?.[2] || '',
    })
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        maxGuests: formData.maxGuests ? parseInt(formData.maxGuests) : null,
        availableSpots: formData.availableSpots ? parseInt(formData.availableSpots) : null,
        ...(formData?.allowGroupBookings && { maxGroupSize: parseInt(formData.maxGroupSize) }),
        minDurationMinutes: (formData.minDurationMinutes && timeScale == "h") ? formData.minDurationMinutes * 60 : (formData.minDurationMinutes && timeScale == "d") ? formData.minDurationMinutes * 60 * 24 : parseFloat(formData.minDurationMinutes),
        durationMinutes: (formData.durationMinutes && timeScale == "h") ? formData.durationMinutes * 60 : (formData.durationMinutes && timeScale == "d") ? formData.durationMinutes * 60 * 24 : parseFloat(formData.durationMinutes),
        imageUrls: Object.values(images).filter(Boolean),
        ...(editingActivity && formData?.category?.name && { category: formData?.category?._id }),
      };

      console.log(data, "Create");
      let res;
      if (editingActivity) {
        res = await Update(data).unwrap()
      } else {
        res = await Create(data).unwrap()
      }
      toast.success(res?.message)
      setDialogOpen(false);
      setTimeScale("m")
    } catch (error) {
      toast.error(error?.data?.message)
      console.log(error);
    }
  };

  const handleUpdateActivityStatus = async (status, _id) => {
    try {
      const res = await Update({ availableForBooking: !status, _id }).unwrap();
      toast.success(res?.message)
    } catch (error) {
      toast.error(error?.data?.message)
      console.log(error);
    }
  }

  const handleRemove = async () => {
    try {
      const res = await Remove({ id: formData?._id }).unwrap();
      toast.success(res?.message)
      resetForm()
    } catch (error) {
      toast.error(error?.data?.message)
      console.log(error);
    }
  }

  const toggleDay = (day) => {
    const days = formData.operationalDays || [];
    if (days.includes(day)) {
      setFormData({ ...formData, operationalDays: days.filter(d => d !== day) });
    } else {
      setFormData({ ...formData, operationalDays: [...days, day] });
    }
  };

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  if (userRoleInfoFetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-slate-600">Loading...</p>
        </Card>
      </div>
    );
  }

  if (
    !userRoleInfo?.data?.user?.vendorId
  ) {
    return (
      <LayoutWrapper>
        <div className=" flex-1 bg-slate-50 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <Shield className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Vendor Access Required</h2>
            <p className="text-slate-600 mb-6">
              {false
                ? 'Your vendor application is pending approval'
                : 'You need to apply for vendor access to manage activities'}
            </p>
            {(
              <Link href={"/vendorsignup"}>
                <Button className="bg-slate-900">Apply as Vendor</Button>
              </Link>
            )}
          </Card>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-[calc(100vh-156px)] mt-12 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Activities</h1>
              <p className="text-slate-600 mt-1">Manage your activity listings</p>
            </div>
            <Button onClick={() => {
              resetForm();
              setDialogOpen(true)
            }} className="bg-slate-900">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>

          {Actiities?.pagination?.total == 0 ? (
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
              {Actiities?.data.map((activity, index) => (
                <motion.div
                  key={activity._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
                    <img
                      src={activity?.imageUrls[0] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'}
                      alt={activity?.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">{activity.name}</h3>
                      <p className="text-slate-600 text-sm mb-3 h-10 line-clamp-2">{activity.description}</p>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-slate-900">${ConvertCentToDollar(activity.price)}</span>
                        </div>
                        {activity.availableSpots && (
                          <p className="text-xs text-slate-500">
                            {activity.availableSpots} {activity.billingType === 'PER_UNIT' ? 'units' : 'spots'} per time slot
                          </p>
                        )}
                        <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium text-slate-700">
                            {activity.availableForBooking ? 'Active' : 'Inactive'}
                          </span>
                          <button
                            onClick={() => {
                              handleUpdateActivityStatus(activity.availableForBooking, activity?._id)
                            }}
                            className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors ${activity.availableForBooking ? 'bg-green-600' : 'bg-slate-300'
                              }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${activity.availableForBooking ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={(`/activitymanagement?id=${activity._id}`)} className="flex-1">
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
                            setDeleteDialogOpen(true)
                            setFormData(activity);
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
                    <Select value={editingActivity && formData.category?._id ? formData.category?._id : formData?.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          categories?.data?.map((item) => {
                            return (
                              <SelectItem key={item?._id} value={item?._id}>{item?.name}</SelectItem>
                            )
                          })
                        }
                        {/* <SelectItem value="boating">Boating</SelectItem>
                        <SelectItem value="scooter">Scooter</SelectItem>
                        <SelectItem value="kayak_paddleboard">Kayak/Paddleboard</SelectItem>
                        <SelectItem value="nature_trails">Nature Trails</SelectItem>
                        <SelectItem value="jet_ski">Jet Ski</SelectItem>
                        {false && (
                          <SelectItem value="non_profit">Non-Profit/Community Service</SelectItem>
                        )}
                        <SelectItem value="other">Other</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Activity Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GUIDED_TOUR">Guided (with instructor/guide)</SelectItem>
                      <SelectItem value="SELF_GUIDED_TOUR">Self-Guided (rental/independent)</SelectItem>
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
                  <Select value={formData.billingType} onValueChange={(value) => setFormData({ ...formData, billingType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PER_PERSON">Per Person</SelectItem>
                      {/* <SelectItem value="per_group">Per Group (Fixed Price)</SelectItem> */}
                      <SelectItem value="PER_HOUR">Per Hour</SelectItem>
                      <SelectItem value="PER_UNIT">Per Unit (Car/Scooter/Kayak/etc.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.allowGroupBookings}
                    onChange={(e) => setFormData({ ...formData, allowGroupBookings: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label>Allow Group Bookings</Label>
                </div>
                {formData?.allowGroupBookings && (
                  <div className="space-y-2">
                    <Label>Maximum Group Size *</Label>
                    <Input
                      type="number"
                      value={formData?.maxGroupSize || ''}
                      onChange={(e) => setFormData({ ...formData, maxGroupSize: e.target.value })}
                      required
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price {'*'}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Guests</Label>
                    <Input
                      type="number"
                      value={formData.maxGuests}
                      onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Available Spots</Label>
                    <Input
                      type="number"
                      value={formData.availableSpots}
                      onChange={(e) => setFormData({ ...formData, availableSpots: e.target.value })}
                    />
                  </div>
                </div>



                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration ( in {scale[timeScale]} )</Label>
                    <div className='flex gap-2 items-center'>
                      <Select value={timeScale} onValueChange={(value) => setTimeScale(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m">Minutes</SelectItem>
                          {/* <SelectItem value="per_group">Per Group (Fixed Price)</SelectItem> */}
                          <SelectItem value="h">Hours</SelectItem>
                          {/* <SelectItem value="d">Days</SelectItem> */}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        value={formData.durationMinutes}
                        onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                        placeholder={timeScale == "m" ? "e.g., 60, 120" : "e.g., 1,2,4.."}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Min Duration ( in {scale[timeScale]} )</Label>
                    <Input
                      type="number"
                      // step="0.5"
                      placeholder={timeScale == "m" ? "e.g., 60, 120" : "e.g., 1,2,4.."}
                      value={formData.minDurationMinutes}
                      onChange={(e) => setFormData({ ...formData, minDurationMinutes: e.target.value })}
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
                        {images[field] && (
                          <img src={images[field]} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded" />
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
                      const isSelected = (formData.operationalDays || []).includes(day);
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
                      value={formData.operationalHoursStart}
                      onChange={(e) => setFormData({ ...formData, operationalHoursStart: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Operating Hours End</Label>
                    <Input
                      type="time"
                      value={formData.operationalHoursEnd}
                      onChange={(e) => setFormData({ ...formData, operationalHoursEnd: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.availableForBooking}
                    onChange={(e) => setFormData({ ...formData, availableForBooking: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label>Available for booking</Label>
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

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className=" max-w-80! overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{'Remove Activity'}</DialogTitle>
              </DialogHeader>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="button" onClick={() => handleRemove()} className="flex-1 bg-slate-900">
                  Remove
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </LayoutWrapper>
  );
}