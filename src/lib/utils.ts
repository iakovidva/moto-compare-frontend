import { JwtPayload } from "@/models/JwtPayload";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export const slugify = (s: string): string => {
  return s ? s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') : "";
}

export const extractMotoIdsFromPathname = (path: string): string[] => {
  const regex = /-(\d+)(?=_vs_|$)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(path)) !== null) {
      matches.push(match[1]);
  }
  return matches;
}

export const parseJwt = (token: string): JwtPayload => {
  const base64Payload = token.split('.')[1];
  const decoded = JSON.parse(atob(base64Payload));
  
  return {
    sub: decoded.sub, 
    role: decoded.role, 
    iat: decoded.iat, 
    exp: decoded.exp
  };
}

export const validatePassword = (pass: string) => {
  if (pass.length < 6) return 'Password must be at least 6 characters';
  if (!/[a-zA-Z]/.test(pass)) return 'Password must contain at least one letter';
  if (!/\d/.test(pass)) return 'Password must contain at least one number';
  return '';
};