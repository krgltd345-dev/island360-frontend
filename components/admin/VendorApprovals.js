import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Mail, Phone, MapPin, Clock, Store } from 'lucide-react';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';
import { useApproveVendorMutation } from '@/services/adminApi';
import moment from 'moment';
import { useGetLicenseRequestQuery, useLicenseActionMutation } from '@/services/userApi';



export default function AdminVendorApprovals({ vendorRequest, vendors }) {
  const { data: licenseRequest } = useGetLicenseRequestQuery()
  const [Action, { isLoading }] = useLicenseActionMutation()
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [VendorRequest] = useApproveVendorMutation()
  const handleApprove = async (user) => {
    try {
      const res = await VendorRequest({ id: user?._id, approved: true }).unwrap();
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (user) => {
    try {
      const res = await VendorRequest({ id: user?._id, approved: false }).unwrap();
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
    }
  };

  const handleLicenseAction = async (vendor, action) => {
    try {
      const data = {
        id: vendor?._id,
        approved: action,
        reason: ""
      }
      const res = await Action(data).unwrap()
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-600">Pending Applications</p>
          <p className="text-3xl font-bold text-amber-600">{vendorRequest?.data?.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Approved Vendors</p>
          <p className="text-3xl font-bold text-green-600">{vendors?.pagination?.total}</p>
        </Card>
      </div>

      {/* Pending Applications */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Pending Applications</h3>
        {vendorRequest?.data?.length === 0 && licenseRequest?.data?.length === 0 ? (
          <Card className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-slate-600">No pending applications</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {vendorRequest?.data.map(vendor => (
              <Card key={vendor._id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex max-sm:flex-col items-center gap-3 mb-3">
                      <div className='flex gap-2 items-center'>
                        <Store className="w-5 h-5 text-slate-600" />
                        <h4 className="text-lg font-semibold text-slate-900">
                          {vendor.vendorId.businessName || 'Business Name Not Provided'}
                        </h4>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {vendor.vendorId.email}
                      </div>
                      {vendor.vendorId.phoneNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {vendor.vendorId.phoneNumber}
                        </div>
                      )}
                      {vendor.vendorId.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {vendor.vendorId.address}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Applied {format(parseISO(vendor.createdAt), 'MMM d, yyyy')}
                      </div>
                      {(vendor.vendorDocumentId.businessLicense || vendor.vendorDocumentId.govtId) && (
                        <div className="flex items-center gap-2 mt-2">
                          {vendor.vendorDocumentId.businessLicense && (
                            <a href={vendor.vendorDocumentId.businessLicense} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                              📄 License
                            </a>
                          )}
                          {vendor.vendorDocumentId.govtId && (
                            <a href={vendor.vendorDocumentId.govtId} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                              📄 Insurance
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex max-sm:flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(vendor)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve & Verify
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(vendor)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setDetailsOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {
              licenseRequest?.data?.map(vendor => (
                <Card key={vendor._id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className='flex gap-2 items-center'>
                        <h4 className="text-lg font-semibold text-slate-900">
                          License Update Request
                        </h4>
                      </div>
                      <div className="flex max-sm:flex-col items-center gap-3 ">
                        <div className='flex gap-2 items-center mb-2'>
                          <Store className="w-4 h-4 text-slate-600" />
                          <h4 className=" font-semibold text-slate-700">
                            {vendor.vendorId.businessName || 'Business Name Not Provided'}
                          </h4>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {vendor.vendorId.email}
                        </div>
                        <div className="flex items-center font-semibold text-slate-700 gap-2">
                          <Clock className="w-4 h-4" />
                          New Expiry Date : {moment(vendor?.businessLicenseExpiry).format('MMM d, yyyy')}
                        </div>
                        <div className="flex items-center font-semibold text-slate-700 gap-2">
                          📄 New License Number : {vendor?.businessLicenseNumber}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Requested on {format(parseISO(vendor.createdAt), 'MMM d, yyyy')}
                        </div>
                        {(vendor?.businessLicense) && (
                          <div className="flex items-center gap-2 mt-2">
                            {vendor?.businessLicense && (
                              <a href={vendor?.businessLicense} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                                📄 License
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex max-sm:flex-col gap-2">
                        <Button
                          disabled={isLoading}
                          size="sm"
                          onClick={() => handleLicenseAction(vendor, true)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve & Verify
                        </Button>
                        <Button
                          disabled={isLoading}
                          size="sm"
                          variant="outline"
                          onClick={() => handleLicenseAction(vendor, false)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            }
          </div>
        )}
      </div>

      {/* Approved Vendors */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Approved Vendors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vendors?.data?.map(vendor => (
            <Card key={vendor._id} className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Store className="w-4 h-4 text-slate-600" />
                <h4 className="font-semibold text-slate-900">
                  {vendor.name}
                </h4>
              </div>
              <p className="text-sm text-slate-600">{vendor.email}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vendor Application Details</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-slate-600">Business Name</Label>
                <p className="font-medium text-slate-900">{selectedVendor.vendorId.businessName}</p>
              </div>
              <div>
                <Label className="text-sm text-slate-600">Email</Label>
                <p className="font-medium text-slate-900">{selectedVendor.vendorId.email}</p>
              </div>
              <div>
                <Label className="text-sm text-slate-600">Phone</Label>
                <p className="font-medium text-slate-900">{selectedVendor.vendorId.phoneNumber || 'Not provided'}</p>
              </div>
              <div>
                <Label className="text-sm text-slate-600">Address</Label>
                <p className="font-medium text-slate-900">{selectedVendor.vendorId.address || 'Not provided'}</p>
              </div>
              <div>
                <Label className="text-sm text-slate-600">Business License</Label>
                <p className="font-medium text-slate-900">{selectedVendor.vendorId.businessLicenseNumber || 'Not provided'}</p>
              </div>
              <div>
                <Label className="text-sm text-slate-600">Tax ID</Label>
                <p className="font-medium text-slate-900">{selectedVendor.vendorId.taxId || 'Not provided'}</p>
              </div>
              <div>
                <Label className="text-sm text-slate-600">Business License Expiry</Label>
                <p className="font-medium text-slate-900">{selectedVendor?.vendorId?.businessLicenseExpiry ? moment(selectedVendor?.vendorId?.businessLicenseExpiry).format("MM-DD-YYYY") : 'Not provided'}</p>
              </div>
              {(selectedVendor.vendorDocumentId.businessLicense || selectedVendor.vendorDocumentId.insurance || selectedVendor.vendorDocumentId.govtId || selectedVendor.vendorDocumentId.taxDoc) && (
                <div>
                  <Label className="text-sm text-slate-600 mb-2 block">Documents</Label>
                  <div className="space-y-2">
                    {selectedVendor.vendorDocumentId.businessLicense && (
                      <a
                        href={selectedVendor.vendorDocumentId.businessLicense}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        📄 View Business License
                      </a>
                    )}
                    {selectedVendor.vendorDocumentId.insurance && (
                      <a
                        href={selectedVendor.vendorDocumentId.insurance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        📄 View Insurance Document
                      </a>
                    )}
                    {selectedVendor.vendorDocumentId.govtId && (
                      <a
                        href={selectedVendor.vendorDocumentId.govtId}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        📄 View Govt Id
                      </a>
                    )}
                    {selectedVendor.vendorDocumentId.taxDoc && (
                      <a
                        href={selectedVendor.vendorDocumentId.taxDoc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        📄 View Tax Document
                      </a>
                    )}
                  </div>
                </div>
              )}
              <div>
                <Label className="text-sm text-slate-600">Application Date</Label>
                <p className="font-medium text-slate-900">
                  {format(parseISO(selectedVendor.createdAt), 'MMMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}