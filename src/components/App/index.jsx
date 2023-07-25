import { useEffect, useState } from 'react'
import Gallery from '../Gallery'
import './styles.css'

export default function App() {
    // Store API data here
    const [artworks, setArtworks] = useState([])

    // Query the API component mount
    useEffect(() => {

        // Define an async function to JSONify the query response 
        async function getData() {
            const res = await fetch('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20')
            const { data } = await res.json() // destructure the JSON response
            setArtworks(data)
            console.log(data)
        }

        // Call the async function
        getData()
    }, [])

    return (
        <>
            <Gallery artworks={artworks} />
        </>
    )
}