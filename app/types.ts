export enum ROLE {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    sessions: Session[];
    accounts: Account[];
    role: ROLE;
    isAlreadyVoted: boolean;
}

export interface Session {
    id: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string;
    userAgent?: string;
    userId: string;
    user: User;
}

export interface Account {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    user: User;
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    accessTokenExpiresAt?: Date;
    refreshTokenExpiresAt?: Date;
    scope?: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Verification {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Proker {
    id: number;
    prokerTitle: string;
    prokerDescription: string;
}

export interface Candidate {
    code: string;
    presidentName: string;
    vicePresidentName: string;
    vision: string;
    mission: string[];
    proker: Proker[];
    Vote: Vote[];
    number: number;
}

export interface Vote {
    id: string;
    candidateCode: string;
    candidate: Candidate;
    usedToken: string;
    voteToken: VoteToken;
    createdAt: Date;
}

export interface VoteToken {
    token: string;
    expiresAt: Date;
    Vote: Vote[];
    createdAt: Date;
}