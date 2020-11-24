import useSwr from 'swr'
import api from '../services/api'

// Criando função que recebe a rota do servidor /produtos
export default function Fetcher (url) {
    // O useSwr pega a url passada na função Fetcher e retorna uma função
    // A função retornada recebe url e passada para a api.get(url)
    const { data, mutate } = useSwr(url, async url => {
        const response = await api.get(url)
        return response.data
    }, {
        // A cada um segundo é feita uma nova chamada a api
        refreshInterval: 1000
    })

    return { data, mutate }
}