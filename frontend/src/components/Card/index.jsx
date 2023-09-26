import { Link } from 'react-router-dom'

export default function Card({ artworkData, updateDetails }) {
    return (
        <Link
            to={"/details"}
            onClick={() => { updateDetails(artworkData) }}
        >
            <figure className="text-center m-2 border-2 border-black rounded-lg cursor-pointer bg-gray-700 bg-opacity-70 text-gray-300 hover:text-white hover:bg-gray-800 hover:transform hover:scale-105 shadow-lg transition ease duration-50">
                <img className="w-full object-cover rounded" src={artworkData.images.web.url} />
                <figcaption>
                    <h2 className="font-bold">{artworkData.title}</h2>
                    <h3 className="capitalize">{artworkData.technique}</h3>
                </figcaption>
            </figure>
        </Link>
    )
}