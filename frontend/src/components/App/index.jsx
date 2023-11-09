import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import SearchPage from '../SearchPage'
import NotFoundPage from '../NotFoundPage'
import AuthFormPage from '../AuthFormPage'
import Navbar from '../Navbar';


export default function App() {
    // Store API data here
    const [artworks, setArtworks] = useState([])
    const [detailsData, setDetailsData] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Set this state based on your login logic
    const navigate = useNavigate();

    const handleLogout = () => {
      // Clear the user token from local storage
      localStorage.removeItem('userToken');
      
      // Update the authentication state
      setIsLoggedIn(false);
  
      // Redirect the user to the login page or another appropriate page
      navigate('/auth/login');
    };
    // Define an async function to query the API & JSONify the response
    async function getData(url) {
        const res = await fetch(url)
        const { data } = await res.json() // destructure the JSON response
        setArtworks([...artworks, ...data])
    }

    // Query the API component mount
    useEffect(() => {
        getData('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=40')
    }, [])

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>


            <Routes>
                <Route path="/" element={
                    <HomePage
                        artworks={artworks}
                        getData={getData}
                        setDetailsData={setDetailsData}
                    />}
                />
                <Route path="/search" element={<SearchPage setDetailsData={setDetailsData} />} />
                <Route path="/details" element={
                    <DetailsPage {...detailsData} updateDetails={setDetailsData} />
                } />
                <Route path="/auth/:formType" element={<AuthFormPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}