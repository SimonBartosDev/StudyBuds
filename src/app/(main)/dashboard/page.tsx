import Link from "next/link";
import { getUserRooms, type RoomWithCount } from "@/actions/rooms";
import { RoomCard } from "@/components/rooms/room-card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Search } from "lucide-react";

export default async function DashboardPage() {
    const userRooms = await getUserRooms();

    return (
        <div className="px-6 lg:px-8 py-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here are your enrolled rooms.
                </p>
            </div>

            {/* Content */}
            {userRooms.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/10 mb-6">
                        <BookOpen className="h-10 w-10 text-violet-600" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No rooms yet</h2>
                    <p className="text-muted-foreground max-w-md mb-6">
                        You haven't joined any rooms yet. Browse available rooms to find
                        your courses and start learning together!
                    </p>
                    <Link href="/rooms">
                        <Button className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700">
                            <Search className="h-4 w-4" />
                            Browse Rooms
                        </Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">
                            Your Rooms ({userRooms.length})
                        </h2>
                        <Link href="/rooms">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Browse More
                            </Button>
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userRooms.map((room: RoomWithCount) => (
                            <RoomCard key={room.id} room={room} isEnrolled={true} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
