export default function Details({ title, type, technique, department }) {
    return (
        <div>
            <h1>{title}</h1>
            <h3>{type}: {technique}</h3>
            <p>Categorized as {department}</p>
        </div>
    )
}
