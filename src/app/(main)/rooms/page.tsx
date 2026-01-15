import { Suspense } from "react";
import { getRooms, getUserRooms, type RoomWithCount } from "@/actions/rooms";
import { RoomCard } from "@/components/rooms/room-card";
import { CreateRoomDialog } from "@/components/rooms/create-room-dialog";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RoomsPageProps {
    searchParams: Promise<{ search?: string }>;
}

async function RoomsList({ search }: { search?: string }) {
    const [rooms, userRooms] = await Promise.all([
        getRooms(search),
        getUserRooms(),
    ]);

    const userRoomIds = new Set(userRooms.map((r: RoomWithCount) => r.id));

    if (rooms.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
                    <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No rooms found</h2>
                <p className="text-muted-foreground max-w-md">
                    {search
                        ? `No rooms match "${search}". Try a different search or create a new room.`
                        : "Be the first to create a room for your course!"}
                </p>
            </div>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room: RoomWithCount) => (
                <RoomCard
                    key={room.id}
                    room={room}
                    isEnrolled={userRoomIds.has(room.id)}
                />
            ))}
        </div>
    );
}

function RoomsListSkeleton() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg border border-border/50 p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ))}
        </div>
    );
}

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
    const params = await searchParams;
    const search = params.search;

    return (
        <div className="px-6 lg:px-8 py-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold">Browse Rooms</h1>
                <p className="text-muted-foreground">
                    Discover rooms for your courses and join the learning community.
                </p>
            </div>

            {/* Search & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <form className="relative flex-1" action="/rooms" method="GET">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        name="search"
                        placeholder="Search by course name or university..."
                        defaultValue={search}
                        className="pl-10"
                    />
                </form>
                <CreateRoomDialog />
            </div>

            {/* Results */}
            <Suspense fallback={<RoomsListSkeleton />}>
                <RoomsList search={search} />
            </Suspense>
        </div>
    );
}
