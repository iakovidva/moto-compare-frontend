export interface JwtPayload {
    sub: string; 
    role: 'USER' | 'ADMIN';
    iat: number;
    exp: number
}