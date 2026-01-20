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

const users = [
  {
    "is_vendor": true,
    "vendor_approved": true,
    "vendor_business_name": "Joyride Cayman ",
    "vendor_phone": "13453261920",
    "vendor_email": "ashawni.trusty@icloud.com",
    "vendor_address": "25 worthing drive west bay ",
    "vendor_description": "",
    "payment_method": "check",
    "bank_account": "",
    "routing_number": "",
    "paypal_email": "",
    "onboarding_completed": true,
    "id": "6937608791802e673f7e8b4b",
    "created_date": "2025-12-08T23:34:31.199000",
    "updated_date": "2025-12-09T23:37:48.642000",
    "email": "ashawni.trusty@icloud.com",
    "full_name": "ashawni.trusty",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "is_vendor": true,
    "vendor_approved": true,
    "vendor_business_name": "Perferendis et dolor",
    "vendor_phone": "+1 (842) 388-9235",
    "vendor_email": "xabapeziqo@mailinator.com",
    "vendor_address": "Accusamus ullam iure",
    "vendor_business_license": "Sunt magna quo quib",
    "vendor_tax_id": "Nobis quia numquam n",
    "vendor_insurance_doc_url": "",
    "vendor_license_doc_url": "",
    "vendor_verified": true,
    "id": "693b009c928b087a1e7a25c6",
    "created_date": "2025-12-11T17:34:20.972000",
    "updated_date": "2025-12-13T18:43:25.457000",
    "email": "basitawan.abdul@gmail.com",
    "full_name": "basitawan.abdul",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "phone": "",
    "address": "",
    "name_last_changed": "2025-12-09T04:35:00.510Z",
    "profile_photo_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/b1de86cea_lambo.jpg",
    "id": "6937a6544668e123249ed25c",
    "created_date": "2025-12-09T04:32:20.501000",
    "updated_date": "2025-12-09T23:37:35.691000",
    "email": "blind2u488spider@gmail.com",
    "full_name": "Kraig Smith",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "created_date": "2025-12-08T17:53:52.730000",
    "updated_date": "2025-12-08T18:34:19.030000",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "_app_role": "admin",
    "vendor_business_name": "Etc",
    "vendor_phone": "12345666",
    "vendor_email": "Sksksj",
    "vendor_address": "Sjejdjdidn",
    "phone": "1234456789",
    "address": "Skdjjd",
    "payout_bank_account": "Djdjdn",
    "payout_method": "Didkdnj",
    "name_last_changed": "2025-12-08T05:00:00.000Z",
    "id": "693710b01f8f7d4f90d1906b",
    "email": "info@etcmarketingservices.com",
    "full_name": "Etc Marketing Services",
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "role": "admin"
  },
  {
    "phone": "13459238384",
    "address": "George Town, Grand Cayman ",
    "is_vendor": true,
    "vendor_approved": true,
    "vendor_business_name": "Reel Love Luxury Charters",
    "vendor_phone": "+13459238384",
    "vendor_email": "info@reelloveluxurycharters.com",
    "vendor_address": "George Town, Cayman Islands ",
    "vendor_description": "Our exclusive charters allow you to escape the crowds and immerse yourself in the beauty of the Caribbean Sea. From swimming with Stingrays at the Sandbar to snorkeling in the Coral Garden, we curate the perfect day for you. \nYour captain and crew are young Caymanians who have grown up on the water around the island. With years of knowledge and understanding of the local waters. Their love for boating is only match by the love to protect and keep our oceans clean. ",
    "payment_method": "international_wire",
    "bank_account": "",
    "routing_number": "",
    "paypal_email": "info@reelloveluxurycharters.com",
    "onboarding_completed": true,
    "profile_photo_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/2d4e99c5f_IMG-20240321-WA0048.jpg",
    "bank_account_name": "Reel Love Luxury Charters ",
    "bank_account_number": "12-86541",
    "bank_name": "Cayman National Bank",
    "bank_swift_code": "CNB875ky",
    "bank_address": "Elgin Ave, Geroge town",
    "vendor_verified": true,
    "verification_status": "verified",
    "verification_notes": "",
    "verified_at": "2025-12-31T22:32:47.277Z",
    "verified_by": "krgltd345@gmail.com",
    "id": "69366107c7d0c0c9b0d8fb7c",
    "created_date": "2025-12-08T05:24:23.052000",
    "updated_date": "2025-12-31T22:32:49.412000",
    "email": "info@reelloveluxurycharters.com",
    "full_name": "info",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "id": "693653f096fbdb51974a3f65",
    "created_date": "2025-12-08T04:28:32.842000",
    "updated_date": "2025-12-08T04:28:32.842000",
    "email": "kraigramgeet@hotmail.com",
    "full_name": "kraigramgeet",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "is_vendor": true,
    "vendor_approved": true,
    "vendor_business_name": "Island 360 Booking",
    "vendor_phone": "123456789",
    "vendor_email": "krgltd345@gmail.com",
    "vendor_address": "George Town, Cayman Islands ",
    "vendor_description": "Reel Love Luxury Charters, located in the Cayman Islands, offers a truly exceptional local experience aboard a private boat. Our exclusive charters allow you to escape the crowds and immerse yourself in the beauty of the Caribbean Sea. From swimming with Stingrays at the Sandbar to snorkeling in the Coral Garden, we curate the perfect day for you. ",
    "payment_method": "bank_transfer",
    "bank_account": "",
    "routing_number": "",
    "paypal_email": "info@reelloveluxurycharters.com",
    "onboarding_completed": true,
    "created_date": "2025-12-01T06:48:19.075000",
    "updated_date": "2026-01-10T23:05:02.569000",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "_app_role": "admin",
    "phone": "",
    "address": "George Town, Cayman Islands ",
    "profile_photo_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/a4ee32072_ChatGPTImageDec8202510_30_14PM.png",
    "bank_account_name": "Island 360",
    "bank_account_number": "3024102",
    "bank_name": "Cayman National Bank",
    "bank_swift_code": "CNB74KY",
    "bank_address": "Elgine Ave",
    "vendor_business_license": "",
    "vendor_tax_id": "",
    "id": "692d3a33918f94eb9f4221f5",
    "email": "krgltd345@gmail.com",
    "full_name": "KR Sales",
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "role": "admin"
  },
  {
    "profile_photo_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/cb8204749_lambo.jpg",
    "id": "693e037fe833d0ee4d75b7eb",
    "created_date": "2025-12-14T00:23:27.873000",
    "updated_date": "2026-01-04T19:17:57.443000",
    "email": "kvrs1981@gmail.com",
    "full_name": "Kraig Smith",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "id": "693b060c1f81e96e437bdb7b",
    "created_date": "2025-12-11T17:57:32.724000",
    "updated_date": "2025-12-11T17:57:32.724000",
    "email": "malikhamzaaccuralhub@gmail.com",
    "full_name": "Hamza Malik",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "is_vendor": false,
    "vendor_approved": false,
    "is_non_profit": true,
    "verification_documents": [],
    "verification_status": "pending",
    "vendor_business_name": "Test1",
    "vendor_phone": "1233233232323",
    "vendor_email": "test@yopmail.com",
    "vendor_address": "123 Main street",
    "vendor_business_license": "sdwe23e32",
    "vendor_tax_id": "ewdwe332e",
    "vendor_insurance_doc_url": "",
    "vendor_license_doc_url": "",
    "id": "695b5e0f96e04eb587d04581",
    "created_date": "2026-01-05T06:45:35.946000",
    "updated_date": "2026-01-12T10:38:02.766000",
    "email": "mohd.yasar@oodles.io",
    "full_name": "Mohd Yasar",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "admin",
    "role": "admin"
  },
  {
    "id": "69379be6be5882cf77360ec3",
    "created_date": "2025-12-09T03:47:50.360000",
    "updated_date": "2025-12-09T03:47:50.360000",
    "email": "naivy.garcia@gmail.com",
    "full_name": "Naivy Garcia",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "id": "693af770b47893f7fdd54d92",
    "created_date": "2025-12-11T16:55:12.348000",
    "updated_date": "2025-12-11T16:55:12.348000",
    "email": "natalie.novik@gilzor.com",
    "full_name": "Natalie Novik",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "id": "693beaabe43043da4f5bd23a",
    "created_date": "2025-12-12T10:12:59.101000",
    "updated_date": "2025-12-12T10:12:59.101000",
    "email": "rohit.gola@oodles.io",
    "full_name": "rohit.gola",
    "disabled": null,
    "is_verified": false,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "id": "693beb65ed3e5e8fbcd572ec",
    "created_date": "2025-12-12T10:16:05.274000",
    "updated_date": "2025-12-12T10:17:56.928000",
    "email": "rohitkumar.gola@oodles.io",
    "full_name": "rohitkumar.gola",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "id": "693af5d539f43886422f03fe",
    "created_date": "2025-12-11T16:48:21.528000",
    "updated_date": "2025-12-11T16:48:32.800000",
    "email": "szenariy5@gmail.com",
    "full_name": "szenariy5",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "id": "693b004f336fe8bd0d4c0f13",
    "created_date": "2025-12-11T17:33:03.414000",
    "updated_date": "2025-12-11T17:33:09.407000",
    "email": "test@test.com",
    "full_name": "test",
    "disabled": null,
    "is_verified": false,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "notifications_email": true,
    "notifications_booking": true,
    "notifications_messages": true,
    "notifications_reviews": true,
    "notifications_marketing": false,
    "is_vendor": true,
    "vendor_approved": true,
    "vendor_business_name": "Test",
    "vendor_phone": "555-000-0000",
    "vendor_email": "vishal.yadav2@oodle.io",
    "vendor_address": "Test addresss",
    "vendor_business_license": "gegegegrger",
    "vendor_tax_id": "gggdfgr",
    "vendor_insurance_doc_url": "fhhrtg53",
    "vendor_license_doc_url": "gdfgdfg",
    "vendor_verified": true,
    "created_date": "2025-12-12T08:09:19.250000",
    "updated_date": "2025-12-13T22:55:57.368000",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "_app_role": "admin",
    "bank_address": "dssgdfgdfg",
    "bank_swift_code": "dfgdfg",
    "bank_name": "gdfgdfgg",
    "bank_account_number": "gdgf",
    "bank_account_name": "fdgdfg",
    "payment_method": "gdfgdg",
    "phone": "3254155965",
    "address": "dggerverer",
    "profile_photo_url": "gdfgdgr",
    "onboarding_completed": true,
    "id": "693bcdafed446ea47cb3c4ce",
    "email": "vishal.yadav2@oodles.io",
    "full_name": "Vishal Yadav",
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "role": "admin"
  },
  {
    "profile_photo_url": "https://base44.app/api/apps/692d3a33918f94eb9f4221f4/files/public/692d3a33918f94eb9f4221f4/9773e46e9_borrower4.jpg",
    "is_vendor": true,
    "vendor_approved": true,
    "is_non_profit": false,
    "verification_documents": [],
    "verification_status": "verified",
    "vendor_business_name": "Oodles Adventures",
    "vendor_phone": "+91 6397288879",
    "vendor_email": "yakshap.tyagi@oodles.io",
    "vendor_address": "117-120, welldone, Delhi",
    "vendor_business_license": "12",
    "vendor_tax_id": "1234567",
    "vendor_insurance_doc_url": "",
    "vendor_license_doc_url": "",
    "vendor_verified": true,
    "vendor_description": "",
    "payment_method": "paypal",
    "bank_account": "",
    "routing_number": "",
    "paypal_email": "yakshap.tyagi@oodles.io",
    "onboarding_completed": true,
    "verification_notes": "",
    "verified_at": "2026-01-05T08:09:39.619Z",
    "verified_by": "mohd.yasar@oodles.io",
    "id": "695b5d4d9e7a6d8e1b644ebd",
    "created_date": "2026-01-05T06:42:21.514000",
    "updated_date": "2026-01-12T12:01:49.566000",
    "email": "yakshap.tyagi@oodles.io",
    "full_name": "Yakshap Tyagi",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "admin",
    "role": "admin"
  },
  {
    "id": "693afeb4acd0ec0f0495f3c2",
    "created_date": "2025-12-11T17:26:12.788000",
    "updated_date": "2025-12-11T17:26:12.788000",
    "email": "yana.bovan@gilzor.com",
    "full_name": "Yana Bovan",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  },
  {
    "id": "693ae5d7a333edaf661db503",
    "created_date": "2025-12-11T15:40:07.828000",
    "updated_date": "2025-12-11T15:40:23.235000",
    "email": "yogesh.sahu@oodles.io",
    "full_name": "yogesh.sahu",
    "disabled": null,
    "is_verified": true,
    "app_id": "692d3a33918f94eb9f4221f4",
    "is_service": false,
    "granted_by_support_access": false,
    "support_access_expires_at": null,
    "_app_role": "user",
    "role": "user"
  }
]

export default function AdminVendorApprovals({ vendorRequest, vendors }) {
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
  const approvedVendors = users.filter(u => u.is_vendor && u.vendor_approved);

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
        {vendorRequest?.data?.length === 0 ? (
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
                    <div className="flex items-center gap-3 mb-3">
                      <Store className="w-5 h-5 text-slate-600" />
                      <h4 className="text-lg font-semibold text-slate-900">
                        {vendor.vendorId.businessName || 'Business Name Not Provided'}
                      </h4>
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
                    <div className="flex gap-2">
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