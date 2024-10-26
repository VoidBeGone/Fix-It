export async function fetchJobs(status) {
    const response = await fetch(`/api/me/jobs?q=${status}`);
    if (!response.ok) throw new Error("Failed to fetch jobs");
    return await response.json();
}
