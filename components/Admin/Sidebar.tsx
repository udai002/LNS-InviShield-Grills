'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import {
  IoMdHome,
  IoMdPin,
  IoMdMail,
  IoMdImages,
  IoMdStats,
  IoMdChatbubbles,
  IoMdCard,
} from 'react-icons/io';

interface NavigationItem {
  title: string;
  link: string;
  id: number;
  icon: React.ReactNode;
}

const navigationList: NavigationItem[] = [
  { title: "Overview", link: "/admin", id: 1, icon: <IoMdHome /> },
  { title: "Locations", link: "/admin/locations", id: 2, icon: <IoMdPin /> },
  { title: "Submissions", link: "/admin/submissions", id: 3, icon: <IoMdMail /> },
  { title: "Images", link: "/admin/images", id: 4, icon: <IoMdImages /> },
  // { title: "Visits", link: "/admin/visits", id: 5, icon: <IoMdStats /> },
  // { title: "Testimonials", link: "/admin/testimonials", id: 6, icon: <IoMdChatbubbles /> },
  // { title: "Cards", link: "/admin/cards", id: 7, icon: <IoMdCard /> },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const {logout} = useAuth()

  return (
    <div className="w-64 h-screen bg-[#0b0b0b] text-white flex flex-col border-r border-gray-800">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-xl font-bold">LNS Invshield grills</h1>
        <p className="text-sm text-gray-400 tracking-widest">
          ADMIN PANEL
        </p>
      </div>
      {/* Header */}
      <div className='flex flex-col justify-between  h-full py-2'>
      

      {/* Navigation */}
      <div className="flex flex-col mt-4">
        {navigationList.map((item) => {
          const isActive = pathname === item.link;

          return (
            <div
              key={item.id}
              onClick={() => router.push(item.link)}
              className={`flex items-center gap-4 px-5 py-3 cursor-pointer transition-all duration-200
              
              ${
                isActive
                  ? 'bg-[#1a1a1a] border-l-4 border-red-500'
                  : 'hover:bg-[#141414]'
              }`}
            >
              <span className="text-lg text-gray-300">
                {item.icon}
              </span>

              <span
                className={`text-sm ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`}
              >
                {item.title}
              </span>
            </div>
          );
        })}
        </div>
      <button onClick={()=>{logout()}} className='mb-10 bg-white m-6 p-4 rounded-xl text-black'>Logout</button>
      </div>
    </div>
  );
}