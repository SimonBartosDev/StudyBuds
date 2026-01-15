import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500/5 via-background to-purple-500/5">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl" />
            </div>
            <SignUp
                appearance={{
                    elements: {
                        formButtonPrimary:
                            "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700",
                        card: "shadow-2xl shadow-violet-500/10",
                    },
                }}
            />
        </div>
    );
}
