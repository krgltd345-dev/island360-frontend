import React, { useEffect, useMemo, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Users, Search, Trash2, Shield, Store, Mail, Eye, Edit, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAddAdminMutation, useRemoveAdminMutation } from '@/services/adminApi';
import { useLazyGetUserByIdQuery } from '@/services/userApi';
import { debounce } from 'lodash';
import clsx from 'clsx';


export default function AdminUserManagement({ admins, user, vendors, userFilter, setUserFilter, page, setPage, limit,  }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [activeFilter, setActiveFilter] = useState(userFilter);
  const [email, setEmail] = useState('');
  const [Add, { isLoading: AddAdminLoading }] = useAddAdminMutation();
  const [Remove, { isLoading }] = useRemoveAdminMutation();
  const [GetUserDetails, { isLoading: userDetailsLoading }] = useLazyGetUserByIdQuery()

  const handleView = async (id) => {
    try {
      const res = await GetUserDetails({ id }).unwrap()
      setSelectedUser(res?.data);
      setViewDialogOpen(true);
    } catch (error) {
      toast.error(error?.data?.message)
    }
  };

  const handleSaveAdmin = async () => {
    try {
      const res = await Add({ email }).unwrap()
      toast.success(res?.message)
      setEmail('')
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  }

  const handleRemoveAdmin = async (id) => {
    try {
      const res = await Remove({ id }).unwrap()
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  }

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        // onSearch(query);
        setUserFilter(query)
      }, 1000),
    [setUserFilter]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const UserCard = ({ user, admin }) => (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {user?.role === 'ADMIN' ? (
              <Shield className="w-4 h-4 text-purple-600" />
            ) : user?.vendorId ? (
              <Store className="w-4 h-4 text-blue-600" />
            ) : (
              <Users className="w-4 h-4 text-slate-600" />
            )}
            <h4 className="font-semibold text-slate-900">
              {user?.name}
            </h4>
            {user?.role === 'ADMIN' && (
              <Badge className="bg-purple-100 text-purple-700">Admin</Badge>
            )}
            {user?.vendorId && (
              <Badge className="bg-blue-100 text-blue-700">Vendor</Badge>
            )}
          </div>
          <div className="space-y-1 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              {user.email}
            </div>
            {user?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                {user.phone}
              </div>
            )}
            <p className="text-xs">
              {/* Joined {format(parseISO(user?.createdAt), 'MMM d, yyyy')} */}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={userDetailsLoading}
            onClick={() => handleView(user?._id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {user.role === 'ADMIN' && admin && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                handleRemoveAdmin(user?._id)
              }}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-600">Total Users</p>
          <p className="text-3xl font-bold text-slate-900">{ user?.pagination?.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Active Vendors</p>
          <p className="text-3xl font-bold text-blue-600">{vendors?.pagination?.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Customers</p>
          <p className="text-3xl font-bold text-green-600">{user?.pagination?.total - vendors?.pagination?.total}</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              debouncedSearch(e.target.value);
            }}
            placeholder="Search users by name, email, or business..."
            className="pl-10"
          />
        </div>
      </Card>

      <div className="space-y-6">
        {(
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Administrators ({admins?.pagination?.total})
            </h3>
            <div className="space-y-2">
              <Label>Add Admin</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
              />
              <Button
                onClick={handleSaveAdmin}
                disabled={AddAdminLoading}
                className="w-full bg-slate-900 hover:bg-slate-800"
              >
                {AddAdminLoading ? 'Saving' : 'Save'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 pt-6 gap-4">
              {admins?.data?.length > 0 ? (
                admins?.data.map(user => (
                  <UserCard admin key={user.id} user={user} />
                ))
              ) : (
                <p className="text-slate-500 text-sm text-center pt-10 col-span-2">No administrators found</p>
              )}
            </div>
          </div>
        )}

        {(
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Store className="w-5 h-5 text-blue-600" />
              Users ({user?.pagination?.total})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user?.data?.length > 0 ? (
                user?.data.map(user => (
                  <UserCard key={user.id} user={user} />
                ))
              ) : (
                <p className="text-slate-500 text-sm col-span-2">No Users found</p>
              )}
            </div>

            {/* pagination */}
            <div className="flex max-sm:flex-col gap-3 justify-center items-center px-4 py-3">
              <div className="flex gap-2 space-x-1">
                <button
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                  className="px-3 cursor-pointer py-1 min-w-9 min-h-9 text-sm font-normal border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-black hover:border-slate-400 transition duration-200 ease"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setPage(page);
                  }}
                  className={clsx(
                    `px-3 py-1 min-w-9 cursor-pointer min-h-9 text-sm font-normal border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-black hover:border-slate-400 transition duration-200 ease`,
                    page === user?.pagination?.page &&
                    "bg-white text-black"
                  )}
                >
                  {page}
                </button>
                <button
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  className={clsx(
                    "px-3 py-1 min-w-9 cursor-pointer min-h-9 text-sm font-normal border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-black hover:border-slate-400 transition duration-200 ease",
                    page + 1 == user?.pagination?.page &&
                    "bg-white text-black"
                  )}
                >
                  {page + 1}
                </button>
                <button
                  onClick={() => {
                    setPage(page + 2);
                  }}
                  className={clsx(
                    "px-3 py-1 min-w-9 min-h-9 cursor-pointer text-sm font-normal border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-black hover:border-slate-400 transition duration-200 ease",
                    page + 2 == user?.pagination?.page &&
                    "bg-white text-black"
                  )}
                >
                  {page + 2}
                </button>
                <button
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  className="px-3 cursor-pointer py-1 min-w-9 min-h-9 text-sm font-normal border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-black hover:border-slate-400 transition duration-200 ease"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View User Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <div className='flex gap-3 items-center'>
                {selectedUser?.profileImage ? (
                  <img src={selectedUser?.profileImage} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <span className="text-3xl w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-slate-500">
                    {selectedUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
                {selectedUser?.name}
              </div>
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className={`grid w-full ${selectedUser?.vendor ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                {selectedUser?.vendor && <TabsTrigger value="vendor">Vendor Info</TabsTrigger>}
                {/* {selectedUser?.vendor && <TabsTrigger value="payment">Payment Info</TabsTrigger>} */}
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-500 text-xs">Email</Label>
                    <p className="font-medium">{selectedUser?.email}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Phone</Label>
                    <p className="font-medium">{selectedUser?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Role</Label>
                    <p className="font-medium capitalize">{selectedUser?.role}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Account Created</Label>
                    <p className="font-medium">{format(parseISO(selectedUser.createdAt), 'MMM d, yyyy')}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-slate-500 text-xs">Address</Label>
                    <p className="font-medium">{selectedUser?.address || 'N/A'}</p>
                  </div>
                </div>
              </TabsContent>

              {selectedUser?.vendor && (
                <TabsContent value="vendor" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label className="text-slate-500 text-xs">Business Name</Label>
                      <p className="font-medium">{selectedUser?.vendor?.businessName || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Business Phone</Label>
                      <p className="font-medium">{selectedUser?.vendor?.phoneNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Business Email</Label>
                      <p className="font-medium">{selectedUser?.vendor?.email || 'N/A'}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-slate-500 text-xs">Business Address</Label>
                      <p className="font-medium">{selectedUser?.vendor?.address || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Business License</Label>
                      <p className="font-medium">{selectedUser?.vendor?.businessLicenseNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Tax ID</Label>
                      <p className="font-medium">{selectedUser?.vendor?.taxId || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Approval Status</Label>
                      <Badge className={selectedUser?.vendor?.approvalStatus == "approved" ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                        {selectedUser?.vendor?.approvalStatus == "approved" ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                    <div className='grid grid-cols-2 col-span-2'>
                      {selectedUser?.vendorDocs?.govtId && (
                        <div className="">
                          <Label className="text-slate-500 text-xs">Govt ID</Label>
                          <a href={selectedUser?.vendorDocs?.govtId} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                            View Document
                          </a>
                        </div>
                      )}
                      {selectedUser?.vendorDocs?.taxDoc && (
                        <div className="">
                          <Label className="text-slate-500 text-xs">Tax Document</Label>
                          <a href={selectedUser?.vendorDocs?.taxDoc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                            View Document
                          </a>
                        </div>
                      )}
                      {selectedUser?.vendorDocs?.businessLicense && (
                        <div className="">
                          <Label className="text-slate-500 text-xs">License Document</Label>
                          <a href={selectedUser?.vendorDocs?.businessLicense} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                            View Document
                          </a>
                        </div>
                      )}
                      {selectedUser?.vendorDocs?.insurance && (
                        <div className="">
                          <Label className="text-slate-500 text-xs">Insurance Document</Label>
                          <a href={selectedUser?.vendorDocs?.insurance} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                            View Document
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              )}

              {selectedUser.is_vendor && (
                <TabsContent value="payment" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label className="text-slate-500 text-xs">Payment Method</Label>
                      <p className="font-medium">{selectedUser.payment_method || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Account Holder Name</Label>
                      <p className="font-medium">{selectedUser.bank_account_name || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Bank Name</Label>
                      <p className="font-medium">{selectedUser.bank_name || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Account Number</Label>
                      <p className="font-medium">{selectedUser.bank_account_number ? '****' + selectedUser.bank_account_number.slice(-4) : 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">SWIFT/BIC Code</Label>
                      <p className="font-medium">{selectedUser.bank_swift_code || 'N/A'}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-slate-500 text-xs">Bank Address</Label>
                      <p className="font-medium">{selectedUser.bank_address || 'N/A'}</p>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}