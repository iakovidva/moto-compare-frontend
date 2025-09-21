"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// local inline notices are used instead of global toasts
// Use native inputs to avoid dependency on missing Input component
import useChangePassword from "@/hooks/useChangePassword";
import useChangeUsername from "@/hooks/useChangeUsername";
import { useUserInfo } from "@/hooks/useUserInfo";
//TODO refactor page, extract common component to user username and password change
export default function AccountActions() {
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [usernameOpen, setUsernameOpen] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [localNotice, setLocalNotice] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const changePassword = useChangePassword();
    const changeUsername = useChangeUsername();
    const { data: userInfo } = useUserInfo();

    const resetForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError(null);
    };

    const openModal = () => {
        resetForm();
        setPasswordOpen(true);
    };

    const closeModal = () => {
        setPasswordOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Client-side validation: show inline notice and keep modal open
        if (!currentPassword || !newPassword || !confirmPassword) {
            setLocalNotice({ message: "Please fill in all fields.", type: 'error' });
            setTimeout(() => setLocalNotice(null), 2500);
            return;
        }
        if (newPassword.length < 8) {
            setLocalNotice({ message: "New password must be at least 8 characters.", type: 'error' });
            setTimeout(() => setLocalNotice(null), 2500);
            return;
        }
        if (newPassword !== confirmPassword) {
            setLocalNotice({ message: "New password and confirmation do not match.", type: 'error' });
            setTimeout(() => setLocalNotice(null), 2500);
            return;
        }

        try {
            await changePassword.mutateAsync({ currentPassword, newPassword });
            // Show inline success message inside the panel then close after 1s
            setLocalNotice({ message: 'Password changed', type: 'success' });
            setTimeout(() => {
                setLocalNotice(null);
                resetForm();
                setPasswordOpen(false);
            }, 1000);
        } catch (err: any) {
            const msg = err?.message || "Failed to change password";
            // keep modal open and show server error so user can correct it
            setLocalNotice({ message: msg, type: 'error' });
            setTimeout(() => setLocalNotice(null), 3500);
        }
    };

    return (
        <div className="shadow p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            <div className="flex items-center justify-between gap-4">
                    <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium">{userInfo?.userName || '—'}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button onClick={() => { resetForm(); setPasswordOpen(true); }} className="px-4 py-2">Change Password</Button>
                    <Button onClick={() => { setNewUsername(userInfo?.userName ?? ''); setError(null); setUsernameOpen(true); }} className="px-4 py-2">Change Username</Button>
                </div>
            </div>

            {passwordOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/50">
                    <div className="bg-background rounded-lg shadow-md max-w-md w-full p-4">
                        <h3 className="text-base font-semibold mb-1">Change Password</h3>
                        <p className="text-xs text-muted-foreground mb-3">Enter your current password and choose a new one.</p>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium mb-1">Current Password</label>
                                <input className="w-full rounded-md border px-2 py-1.5 text-sm" type="password" value={currentPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)} />
                            </div>

                            <div>
                                <label className="block text-xs font-medium mb-1">New Password</label>
                                <input className="w-full rounded-md border px-2 py-1.5 text-sm" type="password" value={newPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} />
                            </div>

                            <div>
                                <label className="block text-xs font-medium mb-1">Confirm New Password</label>
                                <input className="w-full rounded-md border px-2 py-1.5 text-sm" type="password" value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
                            </div>

                            {localNotice && (
                                <div className={`mt-2 inline-block rounded px-2 py-1 text-sm ${localNotice.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {localNotice.message}
                                </div>
                            )}

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={closeModal} className="px-3 py-1 text-sm">Cancel</Button>
                                <Button type="submit" variant="default" disabled={changePassword.status === 'pending'} className="px-3 py-1 text-sm">{changePassword.status === 'pending' ? 'Saving...' : 'Save'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {usernameOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/50">
                    <div className="bg-background rounded-lg shadow-md max-w-sm w-full p-4">
                        <h3 className="text-base font-semibold mb-1">Change Username</h3>
                        <p className="text-xs text-muted-foreground mb-3">Choose a unique username. This will be visible to other users.</p>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            setError(null);
                            if (!newUsername || newUsername.length < 3) {
                                setError('Username must be at least 3 characters.');
                                return;
                            }

                            if (userInfo?.userName === newUsername) {
                                setError('Username has not changed.');
                                return;
                            }

                            try {
                                await changeUsername.mutateAsync({ username: newUsername });
                                // Show inline success message inside the panel then close after 1s
                                setLocalNotice({ message: 'Username updated', type: 'success' });
                                setTimeout(() => {
                                    setLocalNotice(null);
                                    setUsernameOpen(false);
                                }, 1000);
                            } catch (err: any) {
                                const msg = err?.message || 'Failed to update username';
                                // keep modal open and show server error so user can correct it
                                setError(msg);
                            }
                        }} className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium mb-1">New Username</label>
                                <input className="w-full rounded-md border px-2 py-1.5 text-sm" value={newUsername} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)} />
                                {localNotice && (
                                    <div className={`mt-2 inline-block rounded px-2 py-1 text-sm ${localNotice.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {localNotice.message}
                                    </div>
                                )}
                            </div>

                            {error && <p className="text-xs text-red-500">{error}</p>}

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setUsernameOpen(false)} className="px-3 py-1 text-sm">Cancel</Button>
                                <Button type="submit" disabled={changeUsername.status === 'pending'} className="px-3 py-1 text-sm">{changeUsername.status === 'pending' ? 'Saving...' : 'Save'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}