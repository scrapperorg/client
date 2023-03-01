export enum ErrorCodes {
    UNAUTH = 401,
}

export function handleUnauthorized(err: any) {
    if(err?.response?.status === ErrorCodes.UNAUTH) {
        localStorage.removeItem('token');
        window.location.href = "/login";
    }
}