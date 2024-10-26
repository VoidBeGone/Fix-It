export async function fetchJobs(stage) {
    const response = await fetch(`/api/jobs?stage=${stage}`);
    if (!response.ok) throw new Error("Failed to fetch jobs");
    return await response.json();
}
