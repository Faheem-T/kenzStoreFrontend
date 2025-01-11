// SHARED TYPE: Sync with backend
export interface AdminType {
    id: string;
    username: string;
    password: string;
}

// SHARED TYPE: Sync with backend
export type SafeAdminType = Omit<AdminType, "password">
