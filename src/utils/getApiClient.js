export async function getApiClient(url) {

    try {

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await res.json()
        console.log(response)

    } catch (error) {
        console.log(error)
    }
}