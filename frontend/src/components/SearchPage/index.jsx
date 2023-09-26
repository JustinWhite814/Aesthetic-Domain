import { useState } from "react"
import Gallery from "../Gallery"

export default function SearchPage(props) {
    // Keep track of what the user is typing into the form
    const [query, setQuery] = useState('')
    // Identify when a new query is submitted
    const [prevQuery, setPrevQuery] = useState('')
    // Tell the gallery component if it needs to reset its page count after a new search is made
    const [pageCountBool, resetPageCount] = useState(true)
    // Store the search results
    const [queryResults, setQueryResults] = useState([])

    // Define an async function to query the API & JSONify the response
    async function getData(url) {
        const res = await fetch(url)
        const { data } = await res.json() // destructure the JSON response
        // compare the current query with the previous query,
        // if both match then concatenate the new data into the existing state
        // otherwise replace the state with the new data
        if (prevQuery === query) {
            setQueryResults([...queryResults, ...data])
            resetPageCount(false)
        } else {
            setQueryResults(data)
            setPrevQuery(query)
            resetPageCount(true)
        }
    }

    function handleQuerySubmit(event) {
        // prevent the form from loading
        event.preventDefault()
        // send a request to the API with the query string
        getData(`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=40&q=${query}`)
    }

    return (
        <div className="search-page p-10">
            <form onSubmit={handleQuerySubmit} className="mt-4 text-center">
                <label htmlFor="search" className="block font-medium mb-1">
                    <h1 className="text-3xl font-bold">Search for Art</h1>
                </label>
                <br />
                <input
                    className="p-2 w-[60vw] rounded border border-gray-300 focus:outline-none focus:border-gray-500"
                    name="search"
                    placeholder="beautiful landscape..."
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <button
                    type="submit"
                    className="mx-1 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 bg-gray-700 rounded transition-all duration-200"
                >
                    Search
                </button>
            </form>

            <Gallery
                artworks={queryResults}
                refreshQueue={getData}
                url={`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20&&q=${query}&skip=${queryResults.length}`}
                updateDetails={props.setDetailsData}
                pageCountBool={pageCountBool}
            />
        </div>
    )
}