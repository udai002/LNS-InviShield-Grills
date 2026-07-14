
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import CustomButton from '../ui/CustomButton';
import {
  useCreateLocationMutation,
  useLazyGetLocationByIdQuery,
  useUpdateLocationMutation
} from '@/redux/locationSlice';

interface IFormModel {
  isOpen: boolean;
  close: () => void;
  selectedLocation?: any;
}

export default function FormModal({ isOpen, close, selectedLocation }: IFormModel) {
  const [createLocation, { isLoading }] = useCreateLocationMutation();

  const [
    getLocationById,
    { isLoading: locationLoading }
  ] = useLazyGetLocationByIdQuery();

  const [
    updateLocation,
    { isLoading: updating }
  ] = useUpdateLocationMutation();

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [locationId, setLocationId] = useState('');

  // ✅ Fetch for edit with stale protection
  async function getLocationForEdit() {
    if (!selectedLocation) return;

    const currentId = selectedLocation.id;

    try {
      const response = await getLocationById(currentId).unwrap();

      // 🛑 Prevent stale overwrite
      if (!selectedLocation || selectedLocation.id !== currentId) return;

      setState(response.state);
      setCity(response.city);
      setArea(response.area);
      setDescription(response.description);
      setLocationId(response._id);
    } catch (error) {
      toast.error('Unable to load location details.');
    }
  }

  // ✅ Handle modal open + mode switch
  useEffect(() => {
    if (!isOpen) return;

    if (selectedLocation) {
      getLocationForEdit();
    } else {
      // Reset form for Add mode
      setState('');
      setCity('');
      setArea('');
      setDescription('');
      setLocationId('');
    }
  }, [selectedLocation, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { state, city, area, description };

    try {
      if (!selectedLocation) {
        await createLocation(payload).unwrap();
        toast.success('Location added successfully.');
      } else {
        await updateLocation({ data: payload, id: locationId }).unwrap();
        toast.success('Location updated successfully.');
      }

      // Reset form
      setState('');
      setCity('');
      setArea('');
      setDescription('');
      setLocationId('');

      close();
    } catch (error) {
      toast.error('Failed to save location. Please try again.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">

            {/* 🔥 Loading Overlay */}
            {locationLoading && selectedLocation && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">
                    Loading location details...
                  </p>
                </div>
              </div>
            )}

            <h2 className="text-xl font-bold mb-4">
              {selectedLocation ? 'Edit Location' : 'Add Location'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={locationLoading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={locationLoading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Area</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  disabled={locationLoading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={locationLoading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    close();
                    setState('');
                    setCity('');
                    setArea('');
                    setDescription('');
                    setLocationId('');
                  }}
                  disabled={isLoading || updating}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>

                <CustomButton
                  title={
                    locationLoading
                      ? 'Fetching...'
                      : (isLoading || updating)
                      ? 'Saving...'
                      : selectedLocation
                      ? 'Update'
                      : 'Add Location'
                  }
                  disabled={isLoading || updating || locationLoading}
                  loading={isLoading || updating || locationLoading}
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

