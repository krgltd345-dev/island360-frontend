import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, X, Upload, Search, ChevronDown, EyeOff, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useUpdateUserMutation } from '@/services/userApi';
import { useUploadImageMutation } from '@/services/upload';
import { countries, getCountryByCode } from '@/lib/countries';
import { Separator } from '../ui/separator';
import { useChangePasswordMutation } from '@/services/authApi';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function PersonalInfoSection({ user }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [Update] = useUpdateUserMutation();
  const [UpdatePassword, { isLoading }] = useChangePasswordMutation()
  const [UploadImage] = useUploadImageMutation();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    countryCode: user?.countryCode || '',
    postalCode: user?.postalCode || '',
  });
  const [formData2, setFormData2] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);
  const countryInputRef = useRef(null);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  useEffect(() => {
    if (!isCountryDropdownOpen) {
      setCountrySearch('');
    }
  }, [isCountryDropdownOpen]);

  const handleCountrySelect = (countryCode) => {
    setFormData({ ...formData, countryCode });
    setIsCountryDropdownOpen(false);
    setCountrySearch('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...(formData?.name !== user?.name && { name: formData?.name }),
        ...(formData?.address !== user?.address && formData?.address !== "" && { address: formData?.address }),
        ...(formData?.phoneNumber !== user?.phoneNumber && formData?.phoneNumber !== "" && { phoneNumber: formData?.phoneNumber }),
        ...(formData?.countryCode !== user?.countryCode && formData?.countryCode !== "" && { countryCode: formData?.countryCode }),
        ...(formData?.postalCode !== user?.postalCode && formData?.postalCode !== "" && { postalCode: formData?.postalCode }),
      }
      console.log(formData, "formdata", data);
      const res = await UpdatePassword(data).unwrap();
      toast.success(res?.message)
      setIsEditing(false);
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
      countryCode: user?.countryCode || '',
      postalCode: user?.postalCode || '',
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 5 MB');
      return;
    }
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

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 7) {
      return "Password must be at least 8 characters";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/(?=.*[^A-Za-z0-9])/.test(password)) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    console.log(confirmPassword, password);
    if (!confirmPassword) {
      return 'Please confirm your password';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData2((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (name === 'newPassword' && formData2.confirmPassword) {
      const confirmError = validateConfirmPassword(formData2.confirmPassword, value);
      if (confirmError) {
        setErrors((prev) => ({ ...prev, newPassword: confirmError }));
      } else {
        setErrors((prev) => ({ ...prev, newPassword: '' }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'newPassword') {
      error = validatePassword(value);
    } else if (name === 'confirmPassword') {
      error = validateConfirmPassword(value, formData2.newPassword);
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };


  const handleChangePassword = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const passwordError = validatePassword(formData2.newPassword);
    const confirmPasswordError = validateConfirmPassword(formData2.confirmPassword, formData2.newPassword);

    if (passwordError) newErrors.newPassword = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      newPassword: formData2?.newPassword,
      currentPassword: formData2?.password
    }
    try {
      const res = await UpdatePassword(data).unwrap();
      deleteCookie('role')
      deleteCookie('authKey')
      router.push("/login");
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || 'Failed to change password, Please try again.');
    }
  };

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-900">Personal Information</h3>
        {!isEditing && (
          <div className='flex items-center gap-6'>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            {/* <Button variant="destructive" onClick={() => {
              toast.warning('Delete account will be available soon')
            }}>
              <MessageCircleWarning className="w-4 h-4 mr-2" />
              Delete Account
            </Button> */}
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
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              // disabled={!canChangeName}
              className={''}
            />
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
        <div className='flex max-sm:flex-col gap-4 w-full'>
          <div className="space-y-2 w-full">
            <Label>Country Code</Label>
            {isEditing ? (
              <div className="relative" ref={countryDropdownRef}>
                <div className="relative">
                  <Input
                    ref={countryInputRef}
                    type="text"
                    value={isCountryDropdownOpen ? countrySearch : (formData.countryCode && getCountryByCode(formData.countryCode) ? `${getCountryByCode(formData.countryCode).flag} ${getCountryByCode(formData.countryCode).code} - ${getCountryByCode(formData.countryCode).name}` : '')}
                    onChange={(e) => {
                      setCountrySearch(e.target.value);
                      setIsCountryDropdownOpen(true);
                    }}
                    onFocus={() => {
                      setIsCountryDropdownOpen(true);
                      if (formData.countryCode && getCountryByCode(formData.countryCode)) {
                        setCountrySearch('');
                      }
                    }}
                    placeholder={formData.countryCode ? "Search country..." : "Search country..."}
                    className="w-full pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                    <Search className="w-4 h-4 text-slate-400" />
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isCountryDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country.code)}
                          className={`w-full px-3 py-2 text-left hover:bg-slate-100 flex items-center gap-2 transition-colors ${formData.countryCode === country.code ? 'bg-slate-50' : ''
                            }`}
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="font-medium">{country.code}</span>
                          <span className="text-slate-500 flex-1">- {country.name}</span>
                          {formData.countryCode === country.code && (
                            <span className="text-slate-600">✓</span>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-slate-500 text-sm text-center">
                        No countries found
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-900 font-medium">
                {user?.countryCode && getCountryByCode(user.countryCode) ? (
                  <span className="flex items-center gap-2">
                    <span>{getCountryByCode(user.countryCode).flag}</span>
                    <span>{getCountryByCode(user.countryCode).code} - {getCountryByCode(user.countryCode).name}</span>
                  </span>
                ) : (
                  'Not provided'
                )}
              </p>
            )}
          </div>

          <div className="space-y-2 w-full">
            <Label>Postal Code</Label>
            {isEditing ? (
              <Input
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="Postal/ZIP code"
              />
            ) : (
              <p className="text-slate-900 font-medium">{user.postalCode || 'Not provided'}</p>
            )}
          </div>
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
      <Separator />
      <div className='flex flex-col gap-5'>
        <h3 className="text-xl font-semibold text-slate-900">Change Password</h3>
        <form onSubmit={handleChangePassword}>
          <div className="space-y-2">
            <Label>Current Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Current Password"
                value={formData2.password}
                onChange={handleChange}
                className={`${errors.password ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black/50 hover:text-black/80"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 drop-shadow-sm">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2 mt-4">
            <Label>New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter New Password"
                value={formData2.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${errors.newPassword ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
                aria-invalid={errors.newPassword ? 'true' : 'false'}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 cursor-pointer hover:text-black/80"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-600 drop-shadow-sm">{errors.newPassword}</p>
            )}
          </div>

          <div className="space-y-2 mt-4">
            <Label>Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData2.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${errors.confirmPassword ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 cursor-pointer hover:text-black/80"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 drop-shadow-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            className="flex-1 bg-slate-900 mt-4 w-full hover:bg-slate-800"
          // disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Updating...' : 'Save'}
          </Button>
        </form>
      </div>
    </Card>
  );
}