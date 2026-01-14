import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, X, Lock, Upload, FileWarning, MessageCircleWarning } from 'lucide-react';
import { toast } from 'sonner';
import { differenceInDays, parseISO } from 'date-fns';

export default function PersonalInfoSection({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user.full_name || '',
    phone: user.phone || '',
    address: user.address || '',
  });

  const canChangeName = useMemo(() => {
    if (!user?.name_last_changed) return true;
    const daysSinceChange = differenceInDays(new Date(), parseISO(user.name_last_changed));
    return daysSinceChange >= 30;
  }, [user?.name_last_changed]);

  const daysUntilNameChange = useMemo(() => {
    if (!user?.name_last_changed || canChangeName) return 0;
    const daysSinceChange = differenceInDays(new Date(), parseISO(user.name_last_changed));
    return 30 - daysSinceChange;
  }, [user?.name_last_changed, canChangeName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if name changed and if user can change it
    if (formData.full_name !== user.full_name && !canChangeName) {
      toast.error(`You can change your name again in ${daysUntilNameChange} days`);
      return;
    }
    
    updateUserMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      full_name: user.full_name || '',
      phone: user.phone || '',
      address: user.address || '',
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.auth.updateMe({ profile_photo_url: file_url });
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
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
            {user.profile_photo_url ? (
              <img src={user.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-slate-500">
                {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
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
            {isEditing && !canChangeName && (
              <span className="text-xs text-amber-600 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Can change in {daysUntilNameChange} days
              </span>
            )}
          </Label>
          {isEditing ? (
            <>
              <Input
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Your full name"
                disabled={!canChangeName}
                className={!canChangeName ? 'bg-slate-50 cursor-not-allowed' : ''}
              />
              {!canChangeName && (
                <p className="text-xs text-slate-500">
                  Name changes are limited to once every 30 days for security
                </p>
              )}
            </>
          ) : (
            <p className="text-slate-900 font-medium">{user.full_name || 'Not provided'}</p>
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
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          ) : (
            <p className="text-slate-900 font-medium">{user.phone || 'Not provided'}</p>
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