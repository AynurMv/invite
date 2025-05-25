import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedWrapperProps {
  children: ReactNode
  x?: number
  y?: number
  scale?: number
  duration?: number
  delay?: number
  amount?: number
  className?: string
  style?: object
}

const AnimatedWrapper = ({
  children,
  x = 0,
  y = 0,
  scale = 1,
  duration = 1,
  delay = 0.7,
  amount = 0.9,
  className = "",
  style = {},
}: AnimatedWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration, delay }}
      viewport={{ once: true, amount }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedWrapper
