import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, X, Upload, MessageCircleWarning } from 'lucide-react';
import { toast } from 'sonner';
import { useUpdateUserMutation } from '@/services/userApi';
import { useUploadImageMutation } from '@/services/upload';

export default function PersonalInfoSection({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [Update] = useUpdateUserMutation();
  const [UploadImage] = useUploadImageMutation();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...(formData?.name !== user?.name && { name: formData?.name }),
        ...(formData?.address !== user?.address && formData?.address !== "" && { address: formData?.address }),
        ...(formData?.phoneNumber !== user?.phoneNumber && formData?.phoneNumber !== "" && { phoneNumber: formData?.phoneNumber }),
      }
      console.log(formData, "formdata", data);
      const res = await Update(data).unwrap();
      toast.success(res?.message)
      console.log(res, "res");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData()
      formData.append("image", file)
      const res = await UploadImage({ formData }).unwrap()
      console.log(res, "res image");
      const resUpdate = await Update({ profileImage: res?.data?.url }).unwrap();
      toast.success('Profile photo updated');
    } catch (error) {
      toast.error('Failed to upload photo');
    }
    setUploadingPhoto(false);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-900">Personal Information</h3>
        {!isEditing && (
          <div className='flex items-center gap-6'>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="destructive" onClick={() => setIsEditing(true)}>
              <MessageCircleWarning className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <Label className="mb-2 block">Profile Photo</Label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
            {user?.profileImage ? (
              <img src={user?.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-slate-500">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="profile-photo-upload"
              disabled={uploadingPhoto}
            />
            <label htmlFor="profile-photo-upload">
              <Button type="button" variant="outline" disabled={uploadingPhoto} asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            Full Name
          </Label>
          {isEditing ? (
            <>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                // disabled={!canChangeName}
                className={''}
              />
            </>
          ) : (
            <p className="text-slate-900 font-medium">{user.name || 'Not provided'}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <p className="text-slate-600 text-sm">
            {user.email}
            <span className="ml-2 text-xs text-slate-500">(Cannot be changed)</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label>Phone Number</Label>
          {isEditing ? (
            <Input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          ) : (
            <p className="text-slate-900 font-medium">{user.phoneNumber || 'Not provided'}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          {isEditing ? (
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Your address"
            />
          ) : (
            <p className="text-slate-900 font-medium">{user.address || 'Not provided'}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              // disabled={updateUserMutation.isPending}
              className="flex-1 bg-slate-900 hover:bg-slate-800"
            >
              <Save className="w-4 h-4 mr-2" />
              {'Save Changes'}
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
}