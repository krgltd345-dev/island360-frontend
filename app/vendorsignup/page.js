'use client';
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, CheckCircle, Clock, CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useGetUserRoleQuery, useVendorApplicationMutation } from '@/services/userApi';
import { useUploadDocumentMutation } from '@/services/upload';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import VendorAggrementModal from '@/components/vendor/VendorAggrementModal';

export default function VendorSignup() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openAgreement, setOpenAgreement] = useState(false)
  const [agree, setAgree] = useState(false)
  const { data: userRoleInfo, isLoading: userRoleInfoFetching } = useGetUserRoleQuery()
  const [UploadFile] = useUploadDocumentMutation()
  const [Application] = useVendorApplicationMutation()
  const [isExpiry, setIsExpiry] = useState(false)
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorDesignation: '',
    businessName: '',
    phoneNumber: '',
    email: '',
    address: '',
    businessLicenseNumber: '',
    taxId: '',
    insurance: '',
    licenseExpiry: null,
    taxDoc: '',
    govtId: '',
    businessLicense: '',
    nonProfitStatus: false,
    allowCancellations: false,
    refundOnCancellations: '',
    cancellationWindowHours: ''
  });
  const [uploadingDocs, setUploadingDocs] = useState(false);
  const [documents, setDocuments] = useState([]);

  const handleDocumentUpload = async (file, docType) => {
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

      console.log(res, "UploadFile", docType);
      setFormData((prev) => ({ ...prev, [docType]: res?.data?.url }))
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
        vendorName: formData?.vendorName,
        vendorDesignation: formData?.vendorDesignation,
        businessName: formData?.businessName,
        phoneNumber: formData?.phoneNumber,
        email: formData?.email,
        address: formData?.address,
        businessLicenseNumber: formData?.businessLicenseNumber,
        taxId: formData?.taxId,
        insurance: formData?.insurance,
        taxDoc: formData?.taxDoc,
        govtId: formData?.govtId,
        vendorAgreementConsent: agree,
        businessLicenseExpiry: isExpiry ? new Date(formData?.licenseExpiry).getTime() : null,
        businessLicense: formData?.businessLicense,
        nonProfitStatus: formData?.nonProfitStatus,
        allowCancellations: formData?.allowCancellations,
        ...(formData?.allowCancellations && {
          refundOnCancellations: formData?.refundOnCancellations,
          cancellationWindowHours: formData?.cancellationWindowHours
        })

      }
      console.log(data, "data");
      const res = await Application(data).unwrap();
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  };

  if (userRoleInfoFetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-slate-600">Loading...</p>
        </Card>
      </div>
    );
  }

  // Already approved vendor - check if onboarding is complete
  if (
    userRoleInfo?.data?.user?.vendorStatus === 'approved'
  ) {
    return (
      <LayoutWrapper>
        <div className="flex-1 mt-12 bg-slate-50 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">You're All Set!</h2>
            <p className="text-slate-600 mb-6">Your vendor account is active</p>
            <Button onClick={() => router.push("/vendordashboard")} className="w-full bg-slate-900">
              Go to Vendor Dashboard
            </Button>
          </Card>
        </div>
      </LayoutWrapper>
    );
  }

  // Pending approval
  if (
    userRoleInfo?.data?.user?.vendorStatus == 'pending'
  ) {
    return (
      <LayoutWrapper>
        <div className="flex-1 mt-12 bg-slate-50 flex items-center justify-center">
          <Card className="sm:p-8 p-4 text-center max-w-md">
            <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Pending</h2>
            <p className="text-slate-600 mb-2">Your vendor application is under review</p>
            <p className="text-sm text-slate-500">An administrator will review your application shortly</p>
          </Card>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen mt-12 bg-slate-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Become a Vendor</h1>
              <p className="text-slate-600">Apply to list your activities on Island 360 Bookings</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={formData.vendorName}
                  onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Designation *</Label>
                <Input
                  value={formData.vendorDesignation}
                  onChange={(e) => setFormData({ ...formData, vendorDesignation: e.target.value })}
                  placeholder="You Designation eg; Manager, Owner..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Business Name *</Label>
                <Input
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Your Business Name"
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
                <input
                  type="checkbox"
                  checked={formData.nonProfitStatus}
                  onChange={(e) => setFormData({ ...formData, nonProfitStatus: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label className="text-green-900">
                  This is a non-profit/charitable organization
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Contact Phone *</Label>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Email for Booking Notifications *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="bookings@yourbusiness.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Business Address *</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Main St, City, State, ZIP"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Business License Number {!formData?.nonProfitStatus && '*'}</Label>
                <Input
                  value={formData.businessLicenseNumber}
                  onChange={(e) => setFormData({ ...formData, businessLicenseNumber: e.target.value })}
                  placeholder="License #"
                  required={!formData?.nonProfitStatus}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isExpiry || false}
                  onChange={(e) => setIsExpiry((prev) => !prev)}
                  className="w-4 cursor-pointer h-4"
                />
                <Label className={"cursor-pointer"} onClick={() => {
                  setIsExpiry((prev) => !prev)
                }}>License has Expiry Date?</Label>
              </div>
              {
                isExpiry &&
                <div className="space-y-2">
                  <Label className=" font-medium">Select Business License Expiry Date *</Label>
                  <Popover open={open} onOpenChange={setOpen} >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-12 border-slate-200"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                        {formData?.licenseExpiry ? format(formData?.licenseExpiry, 'PPP') : <span className="text-slate-500">Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData?.licenseExpiry}
                        onSelect={(date) => {
                          setFormData({ ...formData, licenseExpiry: date })
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
              }

              <div className="space-y-2">
                <Label>Tax ID / EIN</Label>
                <Input
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <input
                  type="checkbox"
                  checked={formData.allowCancellations}
                  onChange={(e) => setFormData({ ...formData, allowCancellations: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label className="text-yellow-700">
                  Enable Booking Cancellation
                </Label>
              </div>
              {
                formData?.allowCancellations &&
                <>
                  <div className="space-y-2">
                    <Label>Refund on Cancellation *</Label>
                    <Input
                      value={formData.refundOnCancellations}
                      onChange={(e) => setFormData({ ...formData, refundOnCancellations: e.target.value })}
                      placeholder="70%"
                      required={formData?.allowCancellations}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{`Cancellation Window ( in Hours ) *`}</Label>
                    <Input
                      value={formData.cancellationWindowHours}
                      onChange={(e) => setFormData({ ...formData, cancellationWindowHours: e.target.value })}
                      placeholder="48"
                      required={formData?.allowCancellations}
                    />
                  </div>
                </>
              }

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold text-slate-900">Verification Documents</h3>
                <p className="text-sm text-slate-600">Upload documents for verification (stored securely and visible only to admins)</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business License *</Label>
                    <Input
                      required
                      type="file"
                      accept="application/pdf"
                      disabled={uploadingDocs}
                      onChange={(e) => handleDocumentUpload(e.target.files[0], 'businessLicense')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Government ID *</Label>
                    <Input
                      type="file"
                      required
                      accept="application/pdf"
                      disabled={uploadingDocs}
                      onChange={(e) => handleDocumentUpload(e.target.files[0], 'govtId')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{`Tax Document (Optional)`}</Label>
                    <Input
                      type="file"
                      accept="application/pdf"
                      disabled={uploadingDocs}
                      onChange={(e) => handleDocumentUpload(e.target.files[0], 'taxDoc')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{`Insurance (Optional)`}</Label>
                    <Input
                      type="file"
                      accept="application/pdf"
                      disabled={uploadingDocs}
                      onChange={(e) => handleDocumentUpload(e.target.files[0], 'insurance')}
                    />
                  </div>
                </div>

                {documents.length > 0 && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-900 mb-2">
                      ✓ {documents.length} document{documents.length !== 1 ? 's' : ''} uploaded securely
                    </p>
                    <ul className="text-xs text-green-700 space-y-1">
                      {documents.map((doc, idx) => (
                        <li key={idx}>• {doc.type.replace('_', ' ').toUpperCase()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree((prev) => !prev)}
                  className="w-4 h-4"
                />
                <Label onClick={() => {
                  setOpenAgreement(true)
                }} className="text-blue-700 underline cursor-pointer">
                  Agree to Vendor Service Agreement
                </Label>
              </div>


              <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
                <p className="font-medium text-slate-900 mb-2">What happens next?</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Your application will be reviewed by our admin team</li>
                  <li>You'll receive email notification once approved</li>
                  <li>Approved and verified vendors get a verification badge</li>
                  <li>Once approved, you can start listing your activities</li>
                </ul>
              </div>

              <Button type="submit" disabled={uploadingDocs || !agree} className="w-full h-12 bg-slate-900 hover:bg-slate-800">
                {uploadingDocs ? 'Uploading Documents...' : 'Submit Application'}
              </Button>
            </form>
          </Card>
        </div>
        <VendorAggrementModal agree={agree} setAgree={setAgree} dialogOpen={openAgreement} setDialogOpen={setOpenAgreement} />
      </div>
    </LayoutWrapper>
  );
}