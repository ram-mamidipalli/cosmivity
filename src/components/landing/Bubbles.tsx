export default function Bubbles() {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute inset-0 bubbles">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="bubble" />
                ))}
            </div>
        </div>
    )
}
