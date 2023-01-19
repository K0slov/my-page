import { useEffect, useState } from 'react'
import axios from 'axios'
import CardApi from '../lib/CardApi'

interface Data {
    id: number
    name: string
    html_url: string
    description: string
    language: []
    size: number
}

export function CardProjectApi( ) {
    const [posts, setPosts] = useState<Data[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        axios.get(`https://api.github.com/users/SperandioIcaro/repos`)
            .then(response => {
                setPosts(response.data)
                setLoading(false)
                console.log(response.data)
            })
            .catch(error => {
                setError(error.message)
                setLoading(false)
                console.log(error.message)
            })
    }, [])

    return (
        <div className='items-center justify-center p-6'>
            
            <h1 className='text-4xl text-center font-Press text-black mb-4'>
              Meus Projetos
            </h1>
            <div className='grid grid-flow-row gap-3 grid-cols-4 px-20'>
                
                {loading && <p className='text-xl text-center'>Loading...</p>}
                {error && <p>{error}</p>}
                {posts.map(post => (
                    <CardApi stargazers_count={post.size} key={post.id} {...post}/>
                ))}
            </div>        
        </div>
    )
}