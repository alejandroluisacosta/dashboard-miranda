import { toast } from "react-toastify";

const backendAPICall = async (path: string, method: string = 'GET', data: string | null = null) => {
    const url = `${import.meta.env.VITE_API_URL}/${path}`;
    const token = localStorage.getItem('auth') // Get this on auth
    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: data ?? undefined,
    });

    if (!response.ok) {
        const errorData = await response.json();
        const error = JSON.stringify(errorData);
        toast.error(`Error ${error}`);
        return;
    }

    const json = await response.json();
    return json;
}

export default backendAPICall;