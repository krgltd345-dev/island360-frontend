'use Client';
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '@/services/adminApi';
import { useCreateCategoryMutation, useEditCategoryMutation, useGetCategoryQuery, useRemoveCategoryMutation } from '@/services/activityApi';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export default function AdminSiteSettings() {
  const { data: settingsData, isLoading } = useGetSettingsQuery()
  const { data: categories, isLoading: categoryLoading } = useGetCategoryQuery()
  const [AddCategory, { isLoading: addLoading }] = useCreateCategoryMutation()
  const [Update, { isLoading: updateLoading }] = useUpdateSettingsMutation()
  const [Remove, { isLoading: removeLoading }] = useRemoveCategoryMutation()
  const [Edit, { isLoading: editLoading }] = useEditCategoryMutation()
  const [settings, setSettings] = useState({
    platformFee: 0,
  });

  const [category, setcategory] = useState("");
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (settingsData) {
      setSettings({
        platformFee: settingsData?.data?.[0]?.value || 0,
      });
    }
  }, [settingsData]);

  const handleSave = async () => {
    try {
      const res = await Update({ id: settingsData?.data?.[0]?._id, value: settings?.platformFee }).unwrap()
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  };

  const handleAdd = async () => {
    try {
      const res = await AddCategory({ name: category }).unwrap()
      toast.success(res?.message)
      setcategory("")
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  };

  const handleRemoveCategory = async () => {
    try {
      const res = await Remove({ id: name?._id }).unwrap()
      setOpen(false)
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  };
    const handleUpdateCategory = async () => {
    try {
      const res = await Edit(name).unwrap()
      setOpen(false)
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  };

  if (isLoading || categoryLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-slate-600" />
          <h3 className="text-xl font-semibold text-slate-900">Site Configuration</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Platform Fee (%)</Label>
            <Input
              type="number"
              value={settings?.platformFee || ""}
              onChange={(e) => setSettings({ ...settings, platformFee: parseFloat(e.target.value) })}
              min="0"
              max="100"
              step="0.1"
            />
            <p className="text-sm text-slate-500">
              Current: {settings?.platformFee}% added to customer total at checkout
            </p>
            <p className="text-xs text-slate-400">
              This fee is added on top of activity prices. Vendors receive 100% of their listed prices.
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={updateLoading}
            className="w-full bg-slate-900"
          >
            {updateLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
        <div className='mt-4 flex flex-col gap-3'>
          <Label>Categories</Label>
          <div className='flex flex-wrap gap-2'>
            {
              categories?.data.map((category) => (
                <Badge onClick={() => {
                  setName(category)
                  setOpen(true)
                }} className={"text-base cursor-pointer bg-blue-100 border-blue-500 text-blue-500"} key={category?._id}>
                  {category?.name}
                </Badge>
              ))
            }
          </div>
          <div className='flex flex-col gap-3'>
            <Input
              type="text"
              placeholder={"Enter Category Name"}
              value={category || ""}
              onChange={(e) => setcategory(e.target.value)}
            />
            <Button
              onClick={handleAdd}
              disabled={addLoading || category?.length < 2}
              className="w-full bg-slate-900"
            >
              {addLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Addmin...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Add Category
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Update Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Categories with 0 Activities can only be removed.
            </p>
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input
                className={""}
                autoFocus={false}
                value={name?.name || ""}
                onChange={(e) => setName((prev) => {
                  return { ...prev, name: e.target.value }
                })}
                placeholder="Enter category name"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                disabled={editLoading || removeLoading}
                onClick={handleRemoveCategory}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Remove Category
              </Button>
              <Button
                variant="outline"
                onClick={handleUpdateCategory}
                disabled={editLoading || removeLoading}
                className="flex-1"
              >
                {'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}