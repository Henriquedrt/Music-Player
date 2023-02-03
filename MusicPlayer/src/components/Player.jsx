import { useRef, useState, useEffect } from "react"
import napster from "../services/napster"

function Player() {

    const [isPlaying, setIsPlaying] = useState(false)
    const [tracks, setTracks] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const music = useRef()
    const key = "ZTVhYTU3MWEtZjRhNy00MmRmLWJiZDAtNjQwNTAwN2E0ODhi"

    useEffect(() => {
        getMusics()
    }, [])

    useEffect(() => {
        console.log(tracks)
    }, [tracks])

    const getMusics = async () => {
        let musics = await napster.get(`top?apikey=${key}`).then(r => r)
        setTracks(musics.data.tracks)
    }

    const loadSong = url => {
        music.current.src = url
        play()
    }

    const play = () => {
        music.current.play()
        setIsPlaying(true)
    }

    const pause = () => {
        music.current.pause()
        setIsPlaying(false)
    }

    const next = () => {
        setCurrentIndex(i => i > 19 ?  0 : i + 1)
    }

    const prev = () => {
        setCurrentIndex(i => i < 0 ?  19 : i - 1)
    }

    return (
        <div>
            {isPlaying ? (
                <>
                    <h2>Está tocando a música: {tracks[currentIndex]?.name}</h2>
                    <h3>Artista: {tracks[currentIndex]?.artistName}</h3>
                    <img src={`http://direct.rhapsody.com/imageserver/v2/albums/${tracks[currentIndex]?.albumId}/images/400x400.jpg`} alt="" />
                </>
            ) : (
                <h2>A música está parada</h2>
            )}
            <audio ref={music} src={tracks[currentIndex]?.url || "https://listen.hs.llnwd.net/g2/prvw/4/2/4/9/8/911189424.mp3"} ></audio>
            <button onClick={ prev }>Anterior</button>
            <button onClick={ isPlaying ? pause : play}>
                { isPlaying ? "pause" : "play"}
            </button>
            <button onClick={ next }>Próximo</button>
        </div>
    )
}

export default Player