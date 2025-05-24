import yorek from "@assets/kartinki/serdtse.svg"
import animePhoto from "@assets/photo/anime.jpg"
import aynurbekPhoto from "@assets/photo/Aynurbek2.png"
import bolgarPhoto from "@assets/photo/bolgar.jpg"
import ikeuPhoto from "@assets/photo/ikeu.jpg"
import zilyousssPhoto from "@assets/photo/zilechka.jpg"
import { Dispatch, FC, RefObject, SetStateAction } from "react"
import AnimatedPolaroid from "../AnimatedPolaroid"
import AnimatedWrapper from "../AnimatedWrapper"
import AudioPlayer from "../AudioPlayer/AudioPlayer"
import Button from "../Button/Button"
import CountdownTimer from "../CountdownTimer/CountdownTimer"
import DateWithRound from "../DateWithRound/DateWithRound"
import GuestForm from "../GuestForm/GuestForm"
import NormText from "../NormText/NormText"
import Schedule from "../Schedule/Schedule"
import Sheshek from "../Sheshek"
import Sizik from "../Sizik/Sizik"
import ZurText from "../ZurText/ZurText"

type ContentPagePropsType = {
  isSmallScreen: boolean
  animationCompleted: boolean
  togglePlay: () => void
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  audioRef: RefObject<HTMLAudioElement | null>
}

const ContentPage: FC<ContentPagePropsType> = ({
  isSmallScreen,
  animationCompleted,
  togglePlay,
  isPlaying,
  setIsPlaying,
  audioRef,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const textMaxWidthOne = isSmallScreen ? "280px" : "420px"
  const maxWidthOne = isSmallScreen ? "350px" : "520px"
  const maxWidthTwo = isSmallScreen ? "350px" : "580px"

  const marginTop10 = isSmallScreen ? "7px" : "10px"
  const marginTop20 = isSmallScreen ? "15px" : "20px"
  const marginTop100 = isSmallScreen ? "70px" : "100px"
  const centerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }

  const scale = 0.9
  const xyAnimation = 30

  return (
    <div className={`content ${animationCompleted ? "visible" : ""}`}>
      <AudioPlayer
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />
      <div className="polaroids-container">
        <AnimatedWrapper x={-xyAnimation} amount={0.1}>
          <AnimatedPolaroid label="Айнур" className="polaroid-aynur" imageUrl={aynurbekPhoto} />
        </AnimatedWrapper>
        <AnimatedWrapper x={xyAnimation} amount={0.1}>
          <AnimatedPolaroid label="Зиля" className="polaroid-zilya" imageUrl={zilyousssPhoto} />
        </AnimatedWrapper>
      </div>
      <AnimatedWrapper scale={scale}>
        <ZurText marginTop="50px" maxWidth={textMaxWidthOne} text="Айнур + Зиля" />
        <ZurText
          marginTop={marginTop10}
          maxWidth={textMaxWidthOne}
          text="="
          lineHeight={isSmallScreen ? "47px" : "58px"}
        />
      </AnimatedWrapper>
      <AnimatedWrapper y={xyAnimation}>
        <img src={yorek} />
      </AnimatedWrapper>
      <AnimatedWrapper x={-xyAnimation}>
        <ZurText marginTop={marginTop20} maxWidth={textMaxWidthOne} text="Узнали?" />
      </AnimatedWrapper>
      <AnimatedWrapper x={xyAnimation} style={centerStyle}>
        <NormText
          marginTop={marginTop20}
          maxWidth={isSmallScreen ? "300px" : "420px"}
          text="Время пронеслось незаметно и у этих двух милых деток скоро свадьба!"
        />
        <NormText marginTop="0px" maxWidth={textMaxWidthOne} text="Да-да, мы сами в шоке!" />
        <AnimatedWrapper x={-10} style={{ position: "relative" }}>
          <img
            className="yildiz"
            src="https://static.tildacdn.com/tild6339-6536-4637-b732-323462356363/Group_93_1.svg"
          />
        </AnimatedWrapper>
      </AnimatedWrapper>
      <AnimatedPolaroid className="polaroid-ikeu" label="Сердца полны любви" imageUrl={ikeuPhoto} />
      <AnimatedWrapper x={-xyAnimation}>
        <ZurText
          marginTop={isSmallScreen ? "170px" : "20px"}
          maxWidth={maxWidthOne}
          text="Дорогие и любимые"
        />
      </AnimatedWrapper>
      <AnimatedWrapper x={xyAnimation} style={centerStyle}>
        <NormText
          marginTop={marginTop20}
          maxWidth={maxWidthOne}
          text="Наша свадьба без вас не будет такой счастливой, уютной и веселой!"
        />
        <NormText
          marginTop="0px"
          maxWidth={isSmallScreen ? "250px" : "620px"}
          text="Приглашаем отметить этот день вместе с нами!"
        />
      </AnimatedWrapper>
      <DateWithRound />
      <AnimatedWrapper scale={scale}>
        <ZurText marginTop="160px" maxWidth={textMaxWidthOne} text="Программа дня" />
      </AnimatedWrapper>
      <Schedule xyAnimation={xyAnimation} />
      <AnimatedWrapper y={-xyAnimation}>
        <ZurText marginTop="131px" maxWidth={maxWidthOne} text="Место проведения" />
      </AnimatedWrapper>
      <AnimatedWrapper amount={0.5}>
        <AnimatedPolaroid
          className="polaroid-bolgar"
          label="Банкетный зал «Болгар»"
          label2="в ресторане «Орловский дворец»"
          imageUrl={bolgarPhoto}
        />
      </AnimatedWrapper>
      <AnimatedWrapper x={xyAnimation}>
        <NormText
          marginTop={isSmallScreen ? "104px" : "0px"}
          maxWidth={isSmallScreen ? "275px" : "320px"}
          text="Мы ждем вас в ресторане «Орловский дворец» в городе Набережные Челны"
        />
      </AnimatedWrapper>
      <AnimatedWrapper>
        <Button
          label="ПОСТРОИТЬ МАРШРУТ"
          link="https://yandex.ru/maps/org/orlovskiy_dvorets/107504788052?si=qukqvxb8mb5v0kefr2rvnxwjd0"
        />
      </AnimatedWrapper>
      <AnimatedWrapper>
        <ZurText marginTop={marginTop100} maxWidth={maxWidthOne} text="Дресс-код" />
      </AnimatedWrapper>
      <AnimatedWrapper x={-xyAnimation}>
        <NormText
          marginTop={marginTop10}
          maxWidth={maxWidthTwo}
          text="Дорогие друзья! Мы будем счастливы видеть вас на нашей свадьбе в том, в чём вам удобно и приятно — мы не устанавливаем дресс-код"
        />
      </AnimatedWrapper>
      <AnimatedWrapper x={xyAnimation} delay={1}>
        <NormText
          marginTop="5px"
          maxWidth={maxWidthTwo}
          text="Единственная просьба: по возможности избегайте слишком ярких цветов, чтобы атмосфера праздника осталась нежной и уютной"
        />
      </AnimatedWrapper>
      <AnimatedWrapper x={-xyAnimation}>
        <ZurText marginTop={marginTop100} maxWidth={maxWidthOne} text="Пожелания" />
      </AnimatedWrapper>
      <AnimatedWrapper>
        <Sheshek />
      </AnimatedWrapper>
      <AnimatedWrapper x={-xyAnimation}>
        <NormText
          marginTop={marginTop10}
          maxWidth={isSmallScreen ? "350px" : "680px"}
          text="Цветы, конечно, прекрасны, но мы боимся, что они завянут раньше, чем закончатся наши танцы! Лучше подарите нам ваши улыбки и хорошее настроение"
        />
      </AnimatedWrapper>
      <AnimatedWrapper>
        <Sizik />
      </AnimatedWrapper>
      <AnimatedWrapper x={xyAnimation}>
        <NormText
          marginTop={marginTop10}
          maxWidth={isSmallScreen ? "300px" : "550px"}
          text="Если вы хотите сделать нам ценный и нужный подарок, мы будем очень благодарны за вклад в бюджет нашей молодой семьи"
        />
      </AnimatedWrapper>
      <GuestForm xyAnimation={xyAnimation} isSmallScreen={isSmallScreen} />
      <div className="contacts">
        <AnimatedWrapper>
          <h1>Контакты</h1>
          <img
            className="samoletik"
            src="https://static.tildacdn.com/tild3266-6164-4261-b438-323265386237/Group_95_1.svg"
          />
        </AnimatedWrapper>
      </div>
      <AnimatedWrapper x={-xyAnimation}>
        <NormText
          marginTop={isSmallScreen ? "0px" : "30px"}
          maxWidth={isSmallScreen ? "330px" : "520px"}
          style={{ fontFamily: "Pips" }}
          text="Если вы приготовили для нас сюрприз, не забудьте предупредить об этом нашего свадебного координатора"
        />
      </AnimatedWrapper>
      <AnimatedWrapper x={xyAnimation} className="kursiv">
        <NormText marginTop={marginTop20} maxWidth={maxWidthOne} text="Эльвина: +7 (927) 675-59-29" />
      </AnimatedWrapper>
      <AnimatedWrapper>
        <a href="https://t.me/zilya_mv">
          <img
            className="telega"
            src="https://static.tildacdn.com/tild3136-3338-4235-b364-313135633861/Black_14.svg"
          />
        </a>
      </AnimatedWrapper>
      <CountdownTimer
        target={new Date(2025, 6, 27, 14, 0, 0)}
        maxWidthOne={maxWidthOne}
        xyAnimation={xyAnimation}
      />
      <AnimatedWrapper y={xyAnimation}>
        <img className="yorek" src={yorek} />
      </AnimatedWrapper>
      <AnimatedWrapper className="konets" amount={0.5} delay={1}>
        <AnimatedPolaroid
          className="polaroid-anime"
          label="С большой любовью,"
          label2="Айнур и Зиля!"
          imageUrl={animePhoto}
        />
      </AnimatedWrapper>
    </div>
  )
}

export default ContentPage
