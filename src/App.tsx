/* eslint-disable sonarjs/no-nested-functions */
import yorek from "@assets/kartinki/serdtse.svg"
import animePhoto from "@assets/photo/anime.jpg"
import aynurbekPhoto from "@assets/photo/Aynurbek2.png"
import bolgarPhoto from "@assets/photo/bolgar.jpg"
import ikeuPhoto from "@assets/photo/ikeu.jpg"
import zilyousssPhoto from "@assets/photo/zilechka.jpg"
import { ReactNode, useEffect, useRef, useState } from "react"
import { PuffLoader } from "react-spinners"
import ContentPage from "./components/ContentPage/ContentPage"
import EnvelopeInviteAnimation from "./components/EnvelopeInviteAnimation/EnvelopeInviteAnimation"
import "./App.scss"

function App() {
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const [resourcesLoaded, setResourcesLoaded] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const imageUrls = [aynurbekPhoto, zilyousssPhoto, ikeuPhoto, bolgarPhoto, animePhoto, yorek]

    const imagePromises = imageUrls.map(
      (url) =>
        new Promise<void>((res, rej) => {
          const img = new Image()
          img.src = url
          img.onload = () => res()
          img.onerror = () => rej()
        }),
    )

    Promise.all([...imagePromises])
      .then(() => setResourcesLoaded(true))
      .catch(() => {
        setResourcesLoaded(true)
      })
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying((prev) => !prev)
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isSmallScreen = windowWidth < 640
  let content: ReactNode

  if (!animationCompleted) {
    content = (
      <EnvelopeInviteAnimation
        isSmallScreen={isSmallScreen}
        onOpenComplete={() => {
          setAnimationCompleted(true)
          togglePlay()
        }}
      />
    )
  } else if (!resourcesLoaded) {
    content = (
      <div className="loading">
        <PuffLoader color="#253759" size={100} />
      </div>
    )
  } else {
    content = (
      <ContentPage
        isSmallScreen={isSmallScreen}
        animationCompleted={animationCompleted}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />
    )
  }

  return <div className="app">{content}</div>
}

export default App
