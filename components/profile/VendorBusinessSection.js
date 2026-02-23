import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp, ShieldCheck, CalendarIcon, Save, Clock } from 'lucide-react';
import moment from 'moment';
import { FcExpired } from 'react-icons/fc';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { format } from 'date-fns';
import { Input } from '../ui/input';
import { useUploadDocumentMutation } from '@/services/upload';
import { toast } from 'sonner';
import { useGetLicenseStatusQuery, useLicenseRequestMutation } from '@/services/userApi';


export default function VendorBusinessSection({ vendor }) {
  const { data } = useGetLicenseStatusQuery()
  const [RequestLicense, { isLoading }] = useLicenseRequestMutation()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    businessLicense: "",
    businessLicenseNumber: "",
    businessLicenseExpiry: null
  })
  const [UploadFile] = useUploadDocumentMutation()
  const [uploadingDocs, setUploadingDocs] = useState(false);

  const handleDocumentUpload = async (file) => {
    if (!file) return;
    try {
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size must be less than 5 MB');
        return;
      }
      setUploadingDocs(true);
      const formData = new FormData()
      formData.append("document", file)
      const res = await UploadFile({ formData }).unwrap()

      console.log(res, "UploadFile");
      setFormData((prev) => ({ ...prev, businessLicense: res?.data?.url }))
      toast.success('Document uploaded securely');
    } catch (error) {
      toast.error('Failed to upload document');
    }
    setUploadingDocs(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        businessLicenseExpiry: formData?.businessLicenseExpiry ? new Date(formData?.businessLicenseExpiry).getTime() : null
      }
      console.log(data, "handleSubmit");
      const res = await RequestLicense(data).unwrap()
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  }

  return (
    <div className="space-y-6">
      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">{"NA"}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaRegCalendarCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Bookings</p>
              <p className="text-2xl font-bold text-slate-900">{vendor?.bookingsCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Activities</p>
              <p className="text-2xl font-bold text-slate-900">{vendor?.activeActivities}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Business Details */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-slate-900">Business Details</h3>
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-medium">Verified</span>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <p className="text-slate-900 font-medium">{vendor?.vendor?.businessName || 'Not provided'}</p>
            </div>
            <div className="space-y-2">
              <Label>Business License Expiry</Label>
              <div className='flex gap-2 items-center'>
                <p className={`${vendor?.vendor?.licenseExpiry > new Date().getTime() ? "text-slate-900" : "text-red-700"} font-medium`}>{vendor?.vendor?.licenseExpiry ? moment(vendor?.vendor?.licenseExpiry).format("MM-DD-YYYY") : 'Not provided'}</p>
                {
                  vendor?.vendor?.licenseExpiry < new Date().getTime() &&
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                    <FcExpired className="w-4 h-4" />
                    <span className="font-medium">Expired</span>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Business Phone</Label>
              <p className="text-slate-900 font-medium">{vendor?.vendor?.phoneNumber || 'Not provided'}</p>
            </div>

            <div className="space-y-2">
              <Label>Business Email</Label>
              <p className="text-slate-900 font-medium">{vendor?.vendor?.email || 'Not provided'}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Business Address</Label>
            <p className="text-slate-900 font-medium">{vendor?.vendor?.address || 'Not provided'}</p>
          </div>
        </form>
      </Card>
      {
        vendor?.vendor?.licenseExpiry &&
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-slate-900">Update Business License</h3>
            </div>
          </div>
          {
            data?.data?.status === "pending" ? <div className='flex flex-col items-center'>
              <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Pending</h2>
              <p className="text-slate-600 mb-2">Your License update Request is under review</p>
              <p className="text-sm text-slate-500">An administrator will review your Request shortly</p>
            </div> :
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className=" font-medium">Select Business License Expiry Date *</Label>
                    <Popover open={open} onOpenChange={setOpen} >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal border-slate-200"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                          {formData?.businessLicenseExpiry ? format(formData?.businessLicenseExpiry, 'PPP') : <span className="text-slate-500">Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData?.businessLicenseExpiry}
                          onSelect={(date) => {
                            setFormData({ ...formData, businessLicenseExpiry: date })
                            setOpen(false);
                          }}
                          captionLayout="dropdown"
                          fromYear={2025}
                          toYear={2125}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);

                            const oneMonthLater = new Date(today);
                            oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

                            const checkDate = new Date(date);
                            checkDate.setHours(0, 0, 0, 0);

                            return checkDate < oneMonthLater;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Business License No *</Label>
                    <Input
                      value={formData?.businessLicenseNumber}
                      onChange={(e) => setFormData({ ...formData, businessLicenseNumber: e.target.value })}
                      placeholder="License #"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Business License *</Label>
                    <Input
                      required
                      type="file"
                      accept="application/pdf"
                      disabled={uploadingDocs}
                      onChange={(e) => handleDocumentUpload(e.target.files[0])}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={uploadingDocs || isLoading}
                  className="w-full bg-slate-900"
                >
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Send For Approval
                  </>
                </Button>
              </form>
          }
        </Card>
      }
    </div>
  );
}