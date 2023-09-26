import { useEffect, useState } from 'react'
import Card from '../Card'

export default function Gallery({ artworks, refreshQueue, url, pageCountBool, updateDetails }) {
    const [currentPage, setCurrentPage] = useState(1)

    // Reset the page count when the parent component tells it to
    useEffect(() => { if (pageCountBool) { setCurrentPage(1) } }, [pageCountBool])

    // Query more artwork when the "Next Page" button is clicked
    function getNextPage() {
        refreshQueue(url)
        setCurrentPage(currentPage + 1)
    }

    // Update the current page so that gallery content changes
    function getPrevPage() {
        setCurrentPage(currentPage - 1)
    }

    // The default value of gallery content. What we see before the app finishes querying the API
    let galleryContent = <p>Your artwork is loading...</p>

    // Conditionally update the gallery content depending on the current page
    if (artworks.length > 0 && currentPage > 1) {
        const nextPage = currentPage + 1

        galleryContent = artworks
            .slice(currentPage * 20, nextPage * 20) // get the 20 images of the array we want to see
            .map(artwork => {
                return <Card key={artwork.id} artworkData={artwork} updateDetails={updateDetails} />
            }) // map over the 20 images and render them in Card components

    } else if (artworks.length > 0 && currentPage == 1) {
        galleryContent = artworks
            .slice(0, 20) // get the first 20 artworks when on the first page
            .map(artwork => {
                return <Card key={artwork.id} artworkData={artwork} updateDetails={updateDetails} />
            })
    }

    return (
        <>
            <div className='gallery'>
                {galleryContent}
            </div>

            <div className='page-controls'>
                <button onClick={getPrevPage}>Previous Page</button>
                <button onClick={getNextPage}>Next Page</button>
            </div>
        </>
    )
}