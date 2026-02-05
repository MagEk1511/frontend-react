export default function MessageContainer({ children }) {
    if (!children) return <div className="message-box" style={{ opacity: 0 }}>Placeholder</div>;

    return (
        <div className="message-box">
            {children}
        </div>
    );
}
