import { useEffect, useRef } from 'react';
import { googleLogin } from '@/lib/api/auth';

interface GoogleSignInButtonProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
    disabled?: boolean;
}

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    renderButton: (element: HTMLElement, config: any) => void;
                    prompt: () => void;
                };
            };
        };
    }
}

export default function GoogleSignInButton({ onSuccess, onError, disabled }: GoogleSignInButtonProps) {
    const googleButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (disabled) return;

        const handleGoogleResponse = async (response: any) => {
            try {
                if (!response.credential) {
                    throw new Error('No credential received from Google');
                }
                
                if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
                    throw new Error('Google Client ID not configured');
                }

                await googleLogin(response.credential);
                onSuccess?.();
            } catch (error: any) {
                console.error('Google Sign-In Error:', error);
                
                let errorMessage = 'Google sign-in failed';
                if (error.message?.includes('401')) {
                    errorMessage = 'Invalid Google token';
                } else if (error.message?.includes('network')) {
                    errorMessage = 'Network error. Please try again';
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                onError?.(errorMessage);
            }
        };

        const initializeGoogleSignIn = () => {
            if (window.google?.accounts?.id) {
                window.google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                if (googleButtonRef.current) {
                    // Clear existing content to prevent duplicate buttons
                    googleButtonRef.current.innerHTML = '';
                    
                    // Suppress console errors from Google's button rendering
                    const originalError = console.error;
                    console.error = (...args) => {
                        // Only suppress Google button related errors
                        const message = args[0]?.toString() || '';
                        if (message.includes('gsi') || message.includes('button') || message.includes('403')) {
                            return; // Suppress these specific errors
                        }
                        originalError.apply(console, args);
                    };

                    try {
                        window.google.accounts.id.renderButton(googleButtonRef.current, {
                            theme: 'outline',
                            size: 'large',
                            width: '100%',
                            text: 'signin_with',
                            shape: 'rectangular',
                        });
                    } catch (error) {
                        // If rendering fails, restore console.error and continue
                        console.error = originalError;
                    }
                    
                    // Restore console.error after a short delay
                    setTimeout(() => {
                        console.error = originalError;
                    }, 1000);
                }
            }
        };

        // Check if Google script is already loaded
        if (window.google?.accounts?.id) {
            initializeGoogleSignIn();
        } else {
            // Wait for Google script to load
            const checkGoogleLoaded = setInterval(() => {
                if (window.google?.accounts?.id) {
                    initializeGoogleSignIn();
                    clearInterval(checkGoogleLoaded);
                }
            }, 100);

            // Cleanup interval after 10 seconds
            setTimeout(() => clearInterval(checkGoogleLoaded), 10000);
        }
    }, [disabled, onSuccess, onError]);

    if (disabled) {
        return (
            <div className="w-full p-3 rounded-md bg-muted text-center text-muted-foreground border">
                Google Sign-In (disabled)
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center">
            <div ref={googleButtonRef} className="w-full"></div>
        </div>
    );
}