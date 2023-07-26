export default function Card({ artworkData , updateDetails }) {
    return (
        // this will update the state of the details page. 
        <figure onClick={() => updateDetails(artworkData)}>
            <img src={artworkData.images.web.url} />
            <figcaption>
                <h2>{artworkData.title}</h2>
                <h3>{artworkData.technique}</h3>
            </figcaption>
        </figure>
    )
}
