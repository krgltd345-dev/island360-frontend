'use Client';
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '@/services/adminApi';
import { useCreateCategoryMutation, useGetCategoryQuery } from '@/services/activityApi';
import { Badge } from '../ui/badge';

export default function AdminSiteSettings() {
  const { data: settingsData, isLoading } = useGetSettingsQuery()
  const { data: categories, isLoading: categoryLoading } = useGetCategoryQuery()
  const [AddCategory, { isLoading: addLoading }] = useCreateCategoryMutation()
  const [Update, { isLoading: updateLoading }] = useUpdateSettingsMutation()
  const [settings, setSettings] = useState({
    platformFee: 0,
  });
  const [category, setcategory] = useState("");
  console.log(settingsData, "settings");
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
      const res = await AddCategory({name: category}).unwrap()
      toast.success(res?.message)
      setcategory("")
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

  console.log(categories, "categories");

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
                <Badge className={"text-base bg-blue-100 border-blue-500 text-blue-500"} key={category?._id}>
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
            disabled={ addLoading || category?.length < 2}
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
    </div>
  );
}