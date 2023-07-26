import { useState } from 'react'
import Card from '../Card'

export default function Gallery({ artworks, refreshQueue, updateDetails }) {

    // When we press the buttons, this variable will increment or decrement. 
    const [currentPage, setCurrentPage] = useState(1)

    // This will query the api for more artwork when hitting the next button
    function getNextPage() {
        refreshQueue(`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20&skip=${artworks.length}`)
        setCurrentPage(currentPage + 1)
    }
    
    // Update the current page so that gallery content changes
    function getPrevPage() {
        setCurrentPage(currentPage - 1)
    }
    

    let galleryContent = <p>Your Artwork is Loading...</p>
    // conditionally update the gallery content depending on the current page
    if(artworks.length > 0 && currentPage > 1){
        const nextPage = currentPage + 1
        galleryContent = artworks
            .slice(currentPage * 20, nextPage * 20) // get the 20 images of the array we want to see 
            .map(artwork => {
              return <Card key={artwork.id} artworkData={artwork} updateDetails={updateDetails} />
            }) // maps over the images sand then renders them in the Card component
    } else if (artworks.length > 0 && currentPage === 1){
        galleryContent = artworks
            .slice(0,20)
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
