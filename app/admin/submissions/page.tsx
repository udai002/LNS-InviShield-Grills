"use client"

import AdminLayout from "@/components/navigations/AdminLayout";
import { useGetSubmissionsQuery } from "@/redux/SubmissionSlice";

export default function Submissions(){

    const {data , isLoading} = useGetSubmissionsQuery("submissions")

    console.log("this is data", data)

    return <AdminLayout>
        <div className="p-10">
            <div>
                <input type="search" className="p-4 rounded-xl border-2 border-gray-400" placeholder="Search submission..." />
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-gray-500">Loading submissions...</p>
                </div>
            ) : (
                <div className="mt-6">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 p-3 text-left">Name</th>
                                <th className="border border-gray-300 p-3 text-left">Email</th>
                                <th className="border border-gray-300 p-3 text-left">Phone</th>
                                <th className="border border-gray-300 p-3 text-left">Message</th>
                                <th className="border border-gray-300 p-3 text-left">Status</th>
                                <th className="border border-gray-300 p-3 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((submission:any) => (
                                <tr key={submission._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 p-3">{submission.name}</td>
                                    <td className="border border-gray-300 p-3">{submission.email}</td>
                                    <td className="border border-gray-300 p-3">{submission.phone}</td>
                                    <td className="border border-gray-300 p-3">{submission.message}</td>
                                    <td className="border border-gray-300 p-3">
                                        <span className={submission.email_sent ? "text-green-600" : "text-red-600"}>
                                            {submission.email_sent ? "Sent" : "Pending"}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 p-3">{new Date(submission.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </AdminLayout>
}