'use client';

import DataTable from "@/components/Admin/DataTable";
import FormModal from "@/components/Admin/FormModal";
import AdminLayout from "@/components/navigations/AdminLayout";
import { useDeleteLocationMutation, useLazyGetLocationsQuery } from "@/redux/locationSlice";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";

interface IDeleteModal {
    onCloseDelete:()=>void , 
    handleDeleteLocation:()=>Promise<void> ,
    DeleteSelectd:any ;
    isLoading:boolean
}

function DeleteModalConfirmation({handleDeleteLocation , onCloseDelete , DeleteSelectd , isLoading}:IDeleteModal){
    return <div className="fixed h-screen w-screen bg-black/45 flex flex-row justify-center items-center top-0 left-0">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Delete Location?</h1>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this location? This action cannot be undone.</p>
            <p className="p-2 my-3 rounded-xl bg-red-300/45 font-bold">{DeleteSelectd.city}-{DeleteSelectd.area}</p>
            <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors active:scale-95" onClick={onCloseDelete}>
                    Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors active:scale-95" disabled={isLoading} onClick={handleDeleteLocation}>
                    { isLoading? "deleting..." :"Confirm"}
                </button>
            </div>
        </div>
    </div>
}

export default function Location() {

    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [DeleteSelectd, setDeleteSelected] = useState<any>(null);
    const [EditSelected, setEditSelected] = useState<any>(null)

    function onClose(){
        setIsOpen(false)
        setEditSelected(null)
        
    }

    const [getLocations, { data, isLoading }] = useLazyGetLocationsQuery();
    const [deleteLocation, {isLoading:deleting}] = useDeleteLocationMutation()

    useEffect(() => {
        getLocations();
    }, []);

    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!search.trim()) return data;

        const query = search.toLowerCase().trim();
        return data.filter((location: any) =>
            location.city?.toLowerCase().includes(query) ||
            location.area?.toLowerCase().includes(query) ||
            location.state?.toLowerCase().includes(query)
        );
    }, [data, search]);

    async function handleDeleteLocation(){
        try{
            const response = await deleteLocation(DeleteSelectd.id).unwrap()
            if(response){
                toast.success("Location deleted successfully.");
                setDeleteSelected(null)
            }
        }catch(error){
            console.error("Failed to delete location:", error)
            toast.error("Unable to delete location. Please try again.");
        }
    }

    function onCloseDelete(){
        setDeleteSelected(null)
    }

    const columns = [
        { key: "city", label: "City" },
        { key: "area", label: "Area" },
        { key: "state", label: "State" },
        { key: "pincode", label: "Pincode" },
        { key: "description", label: "Description" },
        {
            key: "_id",
            label: "Actions",
            render: (_: any, row: any) => (
                <div className="flex gap-2">
                    <button className="text-blue-500" onClick={()=>{
                        setIsOpen(true)
                        setEditSelected({id:row._id , city:row.city , area:row.area})
                    }}>Edit</button>
                    <button className="text-red-500" onClick={()=>{
                        setDeleteSelected({id:row._id , city:row.city , area:row.area})
                    }}>Delete</button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout>
            {DeleteSelectd && <DeleteModalConfirmation DeleteSelectd={DeleteSelectd} onCloseDelete={onCloseDelete} handleDeleteLocation={handleDeleteLocation} isLoading={deleting}/>}
            <FormModal isOpen={isOpen} close={onClose} selectedLocation={EditSelected} />
            <div className="p-10">

                <div className="flex flex-row justify-between items-center mb-6">
                    <div className="flex-1">
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-600 focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-10 transition-all"
                            placeholder="Search by city, area or state..."
                        />
                    </div>

                    <button
                        onClick={()=>setIsOpen(true)}
                        className="ml-4 px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl active:scale-95">
                        + Add Location
                    </button>
                </div>

                <div className="scroll-auto">
                    <DataTable
                        pageSize={7}
                        columns={columns}
                        data={filteredData}
                        loading={isLoading}
                        keyExtractor={(row: any) => row._id}
                        emptyMessage={search ? `No locations found for "${search}"` : "No locations found."}
                    />
                </div>

            </div>
        </AdminLayout>
    );
}