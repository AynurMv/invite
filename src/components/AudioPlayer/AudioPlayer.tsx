import pauseIcon from "@assets/kartinki/pause.svg"
import playIcon from "@assets/kartinki/play.svg"
import musicTrack from "@assets/toploader-dancing-in-the-moonlight.mp3"
import { useEffect, FC, Dispatch, RefObject, SetStateAction } from "react"
import "./AudioPlayer.scss"

type AudioPlayerPropsType = {
  togglePlay: () => void
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  audioRef: RefObject<HTMLAudioElement | null>
}

const AudioPlayer: FC<AudioPlayerPropsType> = ({ togglePlay, isPlaying, setIsPlaying, audioRef }) => {
  useEffect(() => {
    togglePlay()
    const audio = audioRef.current
    if (!audio) return
    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener("ended", handleEnded)
    return () => audio.removeEventListener("ended", handleEnded)
  }, [])

  return (
    <div id="music-toggle">
      <audio ref={audioRef} src={musicTrack} preload="auto" loop={false} />
      <button className={isPlaying ? "pause" : "play"} type="button" onClick={togglePlay}>
        <img src={isPlaying ? pauseIcon : playIcon} />
      </button>
    </div>
  )
}

export default AudioPlayer
