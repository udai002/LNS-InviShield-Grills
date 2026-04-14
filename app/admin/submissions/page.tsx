"use client"

import { useState, useMemo } from "react";
import DataTable from "@/components/Admin/DataTable";
import AdminLayout from "@/components/navigations/AdminLayout";
import { useGetSubmissionsQuery } from "@/redux/SubmissionSlice";


type Submission = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    email_sent: boolean;
    createdAt: string;
};

const columns = [
    { key: "name" as keyof Submission, label: "Name" },
    { key: "email" as keyof Submission, label: "Email" },
    { key: "phone" as keyof Submission, label: "Phone" },
    { key: "message" as keyof Submission, label: "Message" },
    {
        key: "email_sent" as keyof Submission,
        label: "Status",
        render: (value: Submission[keyof Submission]) => (
            <span className={value ? "text-green-600" : "text-red-600"}>
                {value ? "Sent" : "Pending"}
            </span>
        ),
    },
    {
        key: "createdAt" as keyof Submission,
        label: "Date",
        render: (value: Submission[keyof Submission]) =>
            new Date(value as string).toLocaleDateString(),
    },
];

export default function Submissions() {
    const { data, isLoading } = useGetSubmissionsQuery("submissions");
    const [search, setSearch] = useState("");

    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!search.trim()) return data;

        const query = search.toLowerCase().trim();
        return data.filter((submission: Submission) =>
            submission.name.toLowerCase().includes(query)
        );
    }, [data, search]);

    return (
        <AdminLayout>
            <div className="p-10">
                <div>
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-4 rounded-xl border-2 border-gray-400"
                        placeholder="Search submission..."
                    />
                </div>
                <div className="mt-6">
                    <DataTable<Submission>
                        columns={columns}
                        data={filteredData}
                        keyExtractor={(row) => row._id}
                        loading={isLoading}
                        emptyMessage={
                            search ? `No submissions found for "${search}"` : "No submissions found."
                        }
                        pageSize={10}
                        pageSizeOptions={[5, 10, 20, 50]}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}