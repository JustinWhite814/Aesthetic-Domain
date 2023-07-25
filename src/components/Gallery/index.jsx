import Card from '../Card'

export default function Gallery({ artworks }) {
    let galleryContent = <p>Your Artwork is Loading...</p>

    if(artworks.length >  0){
        galleryContent = artworks
            .map((artwork, i)=> <Card key={i} artworkData={artwork} />)
    }


    return (
        <>
        <h1>Aesthetic Domain</h1>
        <div className='gallery'>
            {galleryContent}
        </div>
        </>
    )
}
