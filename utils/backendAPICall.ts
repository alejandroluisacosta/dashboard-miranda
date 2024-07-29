import { toast } from "react-toastify";

const backendAPICall = async (path: string, method: string = 'GET', data = null) => {
    const url = `${process.env.VITE_API_URL}/${path}`;
    const token = localStorage.getItem("AUTH_TOKEN"); // Get this on auth
    const response = await (fetch(url, {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: data ?? undefined,
    }));

    if (!response.ok) {
        const errorData = await response.json();
        const error = JSON.stringify(errorData);
        toast.error(`Error ${error}`);
    }

    const json = await response.json();
    return json();
}