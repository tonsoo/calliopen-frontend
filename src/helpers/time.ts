export default function formatDuration(seconds: number, addPrefix:boolean = false): string {
    const rounded = Math.round(seconds / 10) * 10;
    const hrs = Math.floor(rounded / 3600);
    const mins = Math.floor((rounded % 3600) / 60);
    const secs = rounded % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");
    let prefix = 'hrs';

    if (hrs > 0) {
        prefix = addPrefix ? ' hrs' : '';
        return `${hrs}:${pad(mins)}:${pad(secs)}${prefix}`;
    }

    if (mins > 0) {
        prefix = addPrefix ? ' min' : '';
        return `${mins}:${pad(secs)}${prefix}`;
    }

    prefix = addPrefix ? ' secs' : '';
    return `${secs}${prefix}`;
}