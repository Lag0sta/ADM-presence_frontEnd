type AuthData = {
    email: string;
    password: string;
};

let resolveAuth: ((data: AuthData) => void) | null = null;

export function askAuth(): Promise<AuthData> {
    return new Promise((resolve) => {
        resolveAuth = resolve;
    });
}

export function submitAuth(email: string, password: string) {
    resolveAuth?.({ email, password });
    resolveAuth = null;
}