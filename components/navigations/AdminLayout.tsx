import Sidebar from "../Admin/Sidebar";
import { ProtectedRoute } from "./ProtectedRoute";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                {children}
            </main>
        </div>
        </ProtectedRoute>
    );
}