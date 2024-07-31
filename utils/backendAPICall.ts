import { toast } from "react-toastify";

const backendAPICall = async (path: string, method: string = 'GET', data: string | null = null) => {
    // const url = `${process.env.VITE_API_URL}/${path}`;
    const url = "http://localhost:3001/users"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYV9hIiwiaWF0IjoxNzIyNDEwMTA3LCJleHAiOjE3MjI0MTMxMDd9.pakDdIDPp-YjzHK5FzXFhefYtET7DS7cAOlQ3Eg_jco"; // Get this on auth
    const response = await (fetch(url, {
        method,
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: data ?? undefined,
    }));

    if (!response.ok) {
        const errorData = await response.json();
        const error = JSON.stringify(errorData);
        toast.error(`Error ${error}`);
    }

    const json = await response.json();
    return json;
}

export default backendAPICall;