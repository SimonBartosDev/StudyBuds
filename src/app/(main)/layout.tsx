import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { getUserRooms } from "@/actions/rooms";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userRooms = await getUserRooms();

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex h-[calc(100vh-4rem)]">
                <Sidebar rooms={userRooms} />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
