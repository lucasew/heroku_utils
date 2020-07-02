export default function or <T>(value: T | undefined | null, fallback: T) {
    return value ? value : fallback
} 