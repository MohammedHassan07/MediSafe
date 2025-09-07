export default async function postApiClient(url, data) {

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const res = await response.json();

        return res
    } catch (error) {
        console.error("Error:", error);
    }
}

