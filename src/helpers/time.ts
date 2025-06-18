export default function formatDuration(seconds: number): string {
    const rounded = Math.round(seconds / 10) * 10;
    const hrs = Math.floor(rounded / 3600);
    const mins = Math.floor((rounded % 3600) / 60);
    const secs = rounded % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");

    if (hrs > 0) return `${hrs}:${pad(mins)}:${pad(secs)}`;
    return `${mins}:${pad(secs)}`;
}