import { toast } from "react-toastify";

async function backendAPICall<T>(path: string, method: string = 'GET', data: any = null): Promise<T> {
    const url: string = `${import.meta.env.VITE_API_URL}/${path}`;
    const authString: string | null = localStorage.getItem('auth');
    let token: string = "";
    if (authString) {
        const auth = JSON.parse(authString);
        token = auth.token;
    }
    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: (method === 'GET') || (method === 'DELETE') ? undefined : JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const error = JSON.stringify(errorData);
        toast.error(`Error ${error}`);
    }

    if (response.status === 204) {
        return undefined as any;
    }

    const json = await response.json();
    return json;
}

export default backendAPICall;