export async function makeRequest<T, R>(query: string, variables: T): Promise<R> {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query, variables})
    });
    return response.json();
}