import { useState } from 'react'; // adjust path as needed
import CustomButton from '../ui/CustomButton';
import { useCreateLocationMutation } from '@/redux/locationSlice';

interface IFormModel{
    isOpen:boolean ;
    close:()=>void;
}

export default function FormModal({isOpen , close}:IFormModel) {
    const [createLocation, { isLoading }] = useCreateLocationMutation();
    
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await createLocation({ state, city, area, description }).unwrap();
            
            // Reset form
            setState('');
            setCity('');
            setArea('');
            setDescription('');
            close();
        } catch (error) {
            console.error('Failed to create location:', error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/45 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add Information</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">State</label>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Area</label>
                                <input
                                    type="text"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={close}
                                    disabled={isLoading}
                                    className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <CustomButton 
                                    title={isLoading ? "Loading..." : "Add new Location"} 
                                    onClick={() => {}}
                                    disabled={isLoading}
                                    loading={isLoading}
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}