import { motion } from "framer-motion"
import { FC } from "react"
import "./Schedule.scss"

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.4,
    },
  },
}

const rowVariants = {
  hidden: (custom: { x: number; y: number; scale: number }) => ({
    opacity: 0,
    x: custom.x,
    y: custom.y,
    scale: custom.scale,
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.8 },
  },
}

interface ScheduleProps {
  xyAnimation: number
}

const Schedule: FC<ScheduleProps> = ({ xyAnimation }) => {
  const less = xyAnimation - 15
  const events = [
    {
      time: "14:30",
      title: "Welcome",
      description: "Время для встреч, первых объятий и неспешных разговоров в приятной атмосфере",
    },
    {
      time: "15:00",
      title: "Церемония",
      description: "Поддержка родных и любимых в самый трепетный момент — пусть он объединит нас всех",
    },
    {
      time: "16:00",
      title: "Банкет",
      description: "Насладитесь этим вечером, будет много танцев, веселья и вкусной еды",
    },
  ]

  return (
    <motion.div
      className="schedule"
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {events.map((ev, idx) => (
        <motion.div
          key={idx}
          className="event-row"
          custom={{ x: -less, y: 0, scale: 1 }}
          variants={rowVariants}
        >
          <div className="time">{ev.time}</div>

          <motion.img
            src="https://static.tildacdn.com/tild6339-6536-4637-b732-323462356363/Group_93_1.svg"
            alt="Звезда"
            className="icon"
            custom={{ x: 0, y: -less, scale: 1 }}
            variants={rowVariants}
          />

          <div className="event-info">
            <motion.div
              className="event-title"
              custom={{ x: less - 10, y: 0, scale: 1 }}
              variants={rowVariants}
            >
              {ev.title}
            </motion.div>
            <motion.div
              className="event-description"
              custom={{ x: -less, y: 0, scale: 1 }}
              variants={rowVariants}
            >
              {ev.description}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Schedule
