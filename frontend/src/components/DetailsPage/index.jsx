import { useEffect } from 'react'
import CommentSection from '../CommentSection'

export default function DetailsPage(props) {
    // Render details data saved in localStorage if no data in App state
    useEffect(() => {
        if (props.id) {
            localStorage.setItem('detailsData', JSON.stringify(props))
        } else {
            const storedData = JSON.parse(localStorage.getItem('detailsData'))
            props.updateDetails(storedData)
        }
    })

    if (props.id) {
        return (
            <div className="bg-gray-100 pt-12">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="w-screen">
                        <div className="flex items-start">
                            <figure className="h-[85vh] mx-10 w-[40vw]">
                                <img
                                    className="h-[70vh] w-full object-cover"
                                    src={props.images.web.url}
                                />
                                <figcaption>
                                    <p className="mt-1 text-lg leading-normal text-gray-900 text-center">{props.fun_fact}</p>
                                </figcaption>
                            </figure>
                            <div className="w-[40vw] md:pl-8">
                                <h1 className="text-3xl font-bold leading-tight text-gray-900">{props.title}</h1>
                                <p className="text-xl font-bold leading-normal text-gray-900 capitalize">General Info</p>
                                <p className="mt-1 text-lg leading-normal text-gray-900 capitalize">{props.creation_date && `Circa: ${props.creation_date}`}</p>
                                <p className="mt-1 text-lg leading-normal text-gray-900 capitalize">{props.technique && `Technique: ${props.technique}`}</p>
                                <div className="mt-6">
                                    <h2 className="text-xl font-bold leading-tight text-gray-900">Exhibitions</h2>
                                    <ul className="mt-1">
                                        {props.exhibitions.current.map((exhibition) => (
                                            <li key={exhibition.id} className="text-lg font-medium leading-normal text-gray-700 py-1">
                                                – {exhibition.title.split(':')[0]}:<i>{exhibition.title.split(':')[1]}</i>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CommentSection artworkId={props.id} />
            </div>
        )
    } else {
        return <h3>Loading your artwork...</h3>
    }
}