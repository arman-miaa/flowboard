import { getNewAccessToken } from "@/services/auth/auth.service";
import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
    const { headers, ...restOptions } = options;
    let accessToken = await getCookie("accessToken");

    if (!accessToken && typeof window !== 'undefined') {
        accessToken = localStorage.getItem('flowboard_token') || undefined;
    }
    
    if (accessToken === "undefined" || accessToken === "null") {
        accessToken = undefined;
    }

    //to stop recursion loop
    if (endpoint !== "/auth/refresh-token") {
        await getNewAccessToken();
    }

    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
        headers: {
            // Include cookie for affgenix standard
            Cookie: accessToken ? `accessToken=${accessToken}` : "",
            // Also include Authorization Bearer for flowboard backend compatibility
            ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
            "Content-Type": "application/json",
            ...headers,
        },
        ...restOptions,
    });

    const isAuthEndpoint = endpoint.includes('/auth/login') || endpoint.includes('/auth/register') || endpoint.includes('/auth/forgot-password') || endpoint.includes('/auth/reset-password');
    if (response.status === 401 && typeof window !== 'undefined' && !isAuthEndpoint) {
        localStorage.removeItem('flowboard_token');
        localStorage.removeItem('flowboard_user');
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/login';
    }

    return response;
}

export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),
    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),
    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),
    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),
    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
}
