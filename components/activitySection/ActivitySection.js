'use client';
import React, { useState } from 'react'
import CategoryFilter from '../category/Filters';
import { ChevronDown, ChevronRight, Sparkles, Waves } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import ActivityCard from './ActivityCard';
import { useGetAllActivitiesQuery, useGetCategoryQuery } from '@/services/activityApi';
import { Button } from '../ui/button';
import ShowMorePagination from '../pagination/ShowMorePagination';



const ActivitySection = () => {
  const [selectedCategory, setSelectedCategory] = useState({
    name: "all",
    _id: null
  });
  const [page, setPage] = useState(1)
  const { data: Actiities, isLoading } = useGetAllActivitiesQuery({
    ...(selectedCategory?._id && { category: selectedCategory?._id }),
    page,
    limit: 15
  });
  const { data: categories, isLoading: categoryLoading } = useGetCategoryQuery()
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className='text-center mb-12'>
        <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide uppercase">Our Offerings</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Explore Activities
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Choose from our curated selection of exciting activities and create memories that last a lifetime.
        </p>
      </div>
      {
        categories?.data && <CategoryFilter setPage={setPage} categories={categories?.data} selected={selectedCategory} onChange={setSelectedCategory} />
      }
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-56 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : Actiities?.pagination?.total === 0 ? (
        <div
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Waves className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No activities found</h3>
          <p className="text-slate-600">Check back soon for new adventures!</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Actiities?.data?.map((activity, index) => (
              <ActivityCard key={activity._id} activity={activity} index={index} />
            ))}
          </div>
          <ShowMorePagination
            setPage={setPage}
            length={Actiities?.data?.length}
            total={Actiities?.pagination?.total}
            page={Actiities?.pagination?.page}
            totalPages={Actiities?.pagination?.totalPages}
          />
        </div>
      )}
    </div>
  )
}

export default ActivitySection