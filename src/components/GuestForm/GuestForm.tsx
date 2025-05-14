import { motion, AnimatePresence } from "framer-motion"
import { ChangeEventHandler, FC, FormEventHandler, useEffect, useRef, useState } from "react"
import AnimatedWrapper from "../AnimatedWrapper"
import Button from "../Button/Button" // Подключи свою кнопку
import "./GuestForm.css"
import NormText from "../NormText/NormText"
import ZurText from "../ZurText/ZurText"

type FormData = {
  name: string
  attendance: string
  alcohol: string[]
}

const GuestForm: FC<{
  extraClassName?: string
  xyAnimation: number
  isSmallScreen: boolean
}> = ({ xyAnimation, isSmallScreen }) => {
  const [form, setForm] = useState<FormData>({
    name: "",
    attendance: "",
    alcohol: [],
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSubmitted) {
      const timeout = setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [isSubmitted])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, checked } = e.target
    setForm((prev) => {
      const alcohol = checked ? [...prev.alcohol, value] : prev.alcohol.filter((item) => item !== value)
      return { ...prev, alcohol }
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      const url =
        "https://script.google.com/macros/s/AKfycbzJXbW9g9L4zvklStwxGigCNoiAMiwTLPLIFJ6-U6BJ8l1HWLqyDkX5zYsFTANizguk/exec"
      const formData = new FormData(e.currentTarget)
      setIsSubmitted(true)
      await fetch(url, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })
    } catch (error) {
      setIsSubmitted(true)
      console.error("Ошибка:", error)
    }
  }
  return (
    <div ref={successRef}>
      <AnimatePresence>
        <motion.div
          key={isSubmitted ? "success" : "form"}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 1 }}
        >
          {isSubmitted ? (
            <div className="success">
              <ZurText
                marginTop={isSmallScreen ? "60px" : "100px"}
                maxWidth="560px"
                text="Форма успешно отправлена!"
              />
              <NormText
                marginTop="10px"
                maxWidth="421px"
                text="Спасибо за ваши ответы, это очень поможет нам в организации!"
              />
            </div>
          ) : (
            <form className="guest-form" onSubmit={handleSubmit}>
              <AnimatedWrapper x={-xyAnimation}>
                <ZurText marginTop="100px" maxWidth="560px" text="Анкета гостя" />
              </AnimatedWrapper>
              <AnimatedWrapper x={xyAnimation}>
                <NormText
                  marginTop="10px"
                  maxWidth={isSmallScreen ? "315px" : "421px"}
                  text="Просим вас ответить на несколько вопросов до 20 июля, это поможет нам в организации торжества"
                />
              </AnimatedWrapper>
              <AnimatedWrapper amount={0.3}>
                <div className="guest-form__form">
                  <div className="guest-form__group">
                    <label className="guest-form__label">Ваше имя и фамилия</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      className="guest-form__input"
                      required
                    />
                  </div>
                  <div className="guest-form__group">
                    <div className="guest-form__legend">Сможете ли вы присутствовать?</div>
                    <label className="guest-form__radio">
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        checked={form.attendance === "yes"}
                        onChange={handleInputChange}
                      />
                      Смогу / сможем присутствовать
                    </label>
                    <label className="guest-form__radio">
                      <input
                        type="radio"
                        name="attendance"
                        value="maybe"
                        checked={form.attendance === "maybe"}
                        onChange={handleInputChange}
                      />
                      Затрудняюсь ответить, сообщу позже
                    </label>
                    <label className="guest-form__radio">
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={form.attendance === "no"}
                        onChange={handleInputChange}
                      />
                      Не смогу прийти
                    </label>
                  </div>

                  <div className="guest-form__group">
                    <div className="guest-form__legend">Какой алкоголь предпочитаете?</div>
                    <p className="guest-form__hint">Можно выбрать несколько вариантов</p>
                    {["Игристое", "Вино белое", "Вино красное", "Виски", "Не пью алкоголь"].map((item) => (
                      <label key={item} className="guest-form__checkbox">
                        <input
                          type="checkbox"
                          name="alcohol"
                          value={item}
                          checked={form.alcohol.includes(item)}
                          onChange={handleCheckboxChange}
                        />
                        {item}
                      </label>
                    ))}
                  </div>

                  <div className="guest-form__submit">
                    <Button type="submit" label="Отправить" link="" className="submit" />
                  </div>
                </div>
              </AnimatedWrapper>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default GuestForm
