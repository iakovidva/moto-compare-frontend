"use client"
import { refreshAccessToken } from "@/lib/api/auth";
import { parseJwt } from "@/lib/utils";
import { JwtPayload } from "@/models/JwtPayload";
import { useAuthStore } from "@/store/authStore";

export default function DisplayAuthInfo() {

    const { accessToken, role, email, setAuth, clearAuth } = useAuthStore();

    const jwtPayload: JwtPayload | null = accessToken ? parseJwt(accessToken!) : null;

    const issuedAt = jwtPayload ? new Date(jwtPayload.iat * 1000) : null;
    const expiresAt = jwtPayload ? new Date(jwtPayload.exp * 1000) : null;

    const handleRefreshToken = async () => {
        await refreshAccessToken();
    }

    return (
        <>
            {accessToken ?
                (<>
                    <div>
                        <h1>Login information</h1>
                        <p>Token: {accessToken}</p>
                        <p>Role: {role}</p>
                        <p>Email: {email}</p>
                        <p>IAT: {issuedAt!.toLocaleString()}</p>
                        <p>EXPO: {expiresAt!.toLocaleString()}</p>
                    </div>
                    <button onClick={handleRefreshToken}>
                        Refresh accessToken
                    </button>
                </>) :
                (<h1>No user logged in</h1>)
            }
        </>
    );
}