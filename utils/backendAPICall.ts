import { toast } from "react-toastify";

const backendAPICall = async (path: string, method: string = 'GET', data: string | null = null) => {
    const url: string = data ? `${import.meta.env.VITE_API_URL}/${path}/${data}` : `${import.meta.env.VITE_API_URL}/${path}`;
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
        body: method === 'GET' ? undefined : JSON.stringify(data),
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