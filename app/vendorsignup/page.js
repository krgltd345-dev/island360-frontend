'use client';
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export default function VendorSignup() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [formData, setFormData] = useState({
    vendor_business_name: '',
    vendor_phone: '',
    vendor_email: '',
    vendor_address: '',
    vendor_business_license: '',
    vendor_tax_id: '',
    vendor_insurance_doc_url: '',
    vendor_license_doc_url: '',
    is_non_profit: false,
    is_cancellation_allowed: false,
  });
  const [uploadingDocs, setUploadingDocs] = useState(false);
  const [documents, setDocuments] = useState([]);

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
  //   queryKey: ['current-user'],
  //   queryFn: () => base44.auth.me(),
  //   enabled: isAuthenticated,
  // });

  // const applyVendorMutation = useMutation({
  //   mutationFn: (data) => base44.auth.updateMe(data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['current-user'] });
  //     toast.success('Application submitted! Awaiting admin approval.');
  //   },
  // });

  const handleDocumentUpload = async (file, docType) => {
    if (!file) return;

    setUploadingDocs(true);
    try {
      const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
      const newDoc = {
        type: docType,
        file_uri,
        uploaded_at: new Date().toISOString(),
      };
      setDocuments([...documents, newDoc]);
      toast.success('Document uploaded securely');
    } catch (error) {
      toast.error('Failed to upload document');
    }
    setUploadingDocs(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.vendor_business_name) {
      toast.error('Please enter your business name');
      return;
    }

    // await applyVendorMutation.mutateAsync({
    //   is_vendor: true,
    //   vendor_approved: false,
    //   is_non_profit: formData.is_non_profit,
    //   verification_documents: documents,
    //   verification_status: 'pending',
    //   vendor_business_name: formData.vendor_business_name,
    //   vendor_phone: formData.vendor_phone,
    //   vendor_email: formData.vendor_email,
    //   vendor_address: formData.vendor_address,
    //   vendor_business_license: formData.vendor_business_license,
    //   vendor_tax_id: formData.vendor_tax_id,
    //   vendor_insurance_doc_url: formData.vendor_insurance_doc_url,
    //   vendor_license_doc_url: formData.vendor_license_doc_url,
    // });
  };

  if (false) {
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
    // user.is_vendor && user.vendor_approved
    false
  ) {
    if (!user.onboarding_completed) {
      navigate(createPageUrl('VendorOnboarding'));
      return null;
    }
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">You're All Set!</h2>
          <p className="text-slate-600 mb-6">Your vendor account is active</p>
          <Button onClick={() => navigate(createPageUrl('VendorDashboard'))} className="w-full bg-slate-900">
            Go to Vendor Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // Pending approval
  if (
    // user.is_vendor && !user.vendor_approved
    false
  ) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Pending</h2>
          <p className="text-slate-600 mb-2">Your vendor application is under review</p>
          <p className="text-sm text-slate-500">An administrator will review your application shortly</p>
        </Card>
      </div>
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
                <Label>Business Name *</Label>
                <Input
                  value={formData.vendor_business_name}
                  onChange={(e) => setFormData({ ...formData, vendor_business_name: e.target.value })}
                  placeholder="Your Business Name"
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
                <input
                  type="checkbox"
                  checked={formData.is_non_profit}
                  onChange={(e) => setFormData({ ...formData, is_non_profit: e.target.checked })}
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
                  value={formData.vendor_phone}
                  onChange={(e) => setFormData({ ...formData, vendor_phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Email for Booking Notifications *</Label>
                <Input
                  type="email"
                  value={formData.vendor_email}
                  onChange={(e) => setFormData({ ...formData, vendor_email: e.target.value })}
                  placeholder="bookings@yourbusiness.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Business Address *</Label>
                <Input
                  value={formData.vendor_address}
                  onChange={(e) => setFormData({ ...formData, vendor_address: e.target.value })}
                  placeholder="123 Main St, City, State, ZIP"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Business License Number</Label>
                <Input
                  value={formData.vendor_business_license}
                  onChange={(e) => setFormData({ ...formData, vendor_business_license: e.target.value })}
                  placeholder="License #"
                />
              </div>

              <div className="space-y-2">
                <Label>Tax ID / EIN</Label>
                <Input
                  value={formData.vendor_tax_id}
                  onChange={(e) => setFormData({ ...formData, vendor_tax_id: e.target.value })}
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <input
                  type="checkbox"
                  checked={formData.is_cancellation_allowed}
                  onChange={(e) => setFormData({ ...formData, is_cancellation_allowed: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label className="text-yellow-700">
                  Endable Booking Cancellation
                </Label>
              </div>
              {
                formData?.is_cancellation_allowed &&
                <>
                  <div className="space-y-2">
                    <Label>Refund on Cancellation</Label>
                    <Input
                      value={formData.vendor_business_license}
                      onChange={(e) => setFormData({ ...formData, vendor_business_license: e.target.value })}
                      placeholder="70%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{`Cancellation Window ( in Hours )`}</Label>
                    <Input
                      value={formData.vendor_tax_id}
                      onChange={(e) => setFormData({ ...formData, vendor_tax_id: e.target.value })}
                      placeholder="48"
                    />
                  </div>
                </>
              }

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold text-slate-900">Verification Documents</h3>
                <p className="text-sm text-slate-600">Upload documents for verification (stored securely and visible only to admins)</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business License</Label>
                    <Input
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={uploadingDocs}
                      onChange={(e) => handleDocumentUpload(e.target.files[0], 'business_license')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Government ID</Label>
                    <Input
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={uploadingDocs}
                      onChange={(e) => handleDocumentUpload(e.target.files[0], 'government_id')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tax Document</Label>
                    <Input
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={uploadingDocs}
                      onChange={(e) => handleDocumentUpload(e.target.files[0], 'tax_document')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Insurance (Optional)</Label>
                    <Input
                      type="file"
                      accept="image/*,application/pdf"
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

              <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
                <p className="font-medium text-slate-900 mb-2">What happens next?</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Your application will be reviewed by our admin team</li>
                  <li>You'll receive email notification once approved</li>
                  <li>Approved and verified vendors get a verification badge</li>
                  <li>Once approved, you can start listing your activities</li>
                </ul>
              </div>

              <Button type="submit" disabled={uploadingDocs} className="w-full h-12 bg-slate-900 hover:bg-slate-800">
                {uploadingDocs ? 'Uploading Documents...' : 'Submit Application'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  );
}