"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <div className="relative">
                        <h1 className="text-8xl font-bold text-muted-foreground/20">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-4xl">🏍️</div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        Oops! The page you're looking for doesn't exist. 
                        It might have been moved or deleted.
                    </p>
                </div>

                <div className="space-y-3">
                    <Link href="/" className="block">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">
                            Go Home
                        </Button>
                    </Link>
                    
                    <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => router.back()}
                    >
                        Go Back
                    </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                    <p>Looking for something specific?</p>
                    <div className="flex justify-center space-x-4 text-orange-600">
                        <Link href="/motorcycles" className="hover:underline">Browse Motorcycles</Link>
                        <Link href="/compare" className="hover:underline">Compare Bikes</Link>
                        <Link href="/about" className="hover:underline">About Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}