import { useEffect, useState } from 'react'
import Gallery from '../Gallery'
import Details from "../Details"
import './styles.css'

export default function App() {
    // Store API data here
    const [artworks, setArtworks] = useState([])
    const [detailsData, setDetailsData] = useState({})

    // Define an async function to JSONify the query response 
    // this function will be called in multiple places
    async function getData(url) {
        const res = await fetch(url)
        const { data } = await res.json() // destructure the JSON response
        // essentially concatenating what's in artwork with the data that comes back from the API
        setArtworks([...artworks, ...data])
    }

    // Query the API component mount
    useEffect(() => {
        // Call the async function
        getData('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=40')
    }, [])

    return (
        <>
            <h1>Aesthetic Domain</h1>
            
            <Gallery 
                artworks={artworks}
                refreshQueue={getData} 
                updateDetails={setDetailsData}         
            />
            
            {/* We can either use a normal ternary or a double ampersand */}
            {/* {artworks.length > 0 ? <Details {...artworks[18]} /> : null} */}
            {/* This is the lifted state and it's being pushed into the details component */}
            {detailsData.id && <Details {...detailsData} />}
        </>
    )
    
}