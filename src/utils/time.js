
export function formatTime(time) {
    // Here time parameter is in seconds
    const minutes = Math.floor(time/60).toString().padStart(2,'0')
    const seconds = Math.floor(time%60).toString().padStart(2,'0')
    return `${minutes}:${seconds}`
} 