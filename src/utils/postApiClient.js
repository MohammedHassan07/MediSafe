export default async function postApiClient(url, data) {

    try {
        const token = localStorage.getItem('token')

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const res = await response.json();

        return res
    } catch (error) {
        console.error("Error:", error);
    }
}

