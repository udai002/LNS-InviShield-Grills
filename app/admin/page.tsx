"use client";

import Sidebar from "@/components/Admin/Sidebar";
import AdminLayout from "@/components/navigations/AdminLayout";
import { useGetOverviewQuery } from "@/redux/AdminSlice";

interface IStatCard {
  count: number;
  title: string;
}

function StatCard({ count, title }: IStatCard) {
  return (
    <div className=" border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-gray-500 transition-all duration-300">
      <h1 className="text-4xl font-extrabold text-black mb-2">
        {count}
      </h1>
      <p className="text-gray-700 text-xs uppercase tracking-widest">
        {title}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const { data, isLoading, isError } = useGetOverviewQuery("Overview");

  return (
  <AdminLayout>
      
      {/* Sidebar */}
      

      {/* Content */}
      <div className="col-span-10 p-10">

        <h1 className="text-2xl font-bold text-black mb-6">
          Dashboard Overview
        </h1>

        {/* 🔄 Loading */}
        {isLoading && (
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-800 animate-pulse h-32 rounded-2xl"
              />
            ))}
          </div>
        )}

        {/* ❌ Error */}
        {isError && (
          <div className="text-red-400 bg-gray-900 border border-red-500 p-4 rounded-xl">
            Failed to load dashboard data
          </div>
        )}

        {/* ✅ Data */}
        {!isLoading && data && (
          <div className="grid grid-cols-3 gap-6">

            <StatCard count={data.submissions} title="Submissions" />

            <StatCard count={data.locations} title="Locations" />

            <StatCard count={data.galleries} title="Gallery Images" />

          </div>
        )}
      </div>
   </AdminLayout>
  );
}