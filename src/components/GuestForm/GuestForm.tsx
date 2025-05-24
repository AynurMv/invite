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
  hasChildren: string
  congrats: string[]
}

const GuestForm: FC<{
  extraClassName?: string
  xyAnimation: number
  isSmallScreen: boolean
}> = ({ xyAnimation, isSmallScreen }) => {
  const [form, setForm] = useState<FormData>({
    name: "",
    attendance: "",
    hasChildren: "",
    congrats: [],
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
      const congrats = checked ? [...prev.congrats, value] : prev.congrats.filter((item) => item !== value)
      return { ...prev, congrats }
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      const url =
        "https://script.google.com/macros/s/AKfycbxZPQspM_8pmarZ4HoCVlpBl6bv2pks6VtiNq_R_8jjnqoIC6BPHBcboHAEY0sRtG5-/exec"
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
                      Да
                    </label>
                    <label className="guest-form__radio">
                      <input
                        type="radio"
                        name="attendance"
                        value="plusOne"
                        checked={form.attendance === "plusOne"}
                        onChange={handleInputChange}
                      />
                      Да с партнером
                    </label>
                    <label className="guest-form__radio">
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={form.attendance === "no"}
                        onChange={handleInputChange}
                      />
                      Нет
                    </label>
                    <label className="guest-form__radio">
                      <input
                        type="radio"
                        name="attendance"
                        value="maybe"
                        checked={form.attendance === "maybe"}
                        onChange={handleInputChange}
                      />
                      Сообщу позже
                    </label>
                  </div>

                  <div className="guest-form__group">
                    <div className="guest-form__legend">Будете ли вы с детьми?</div>
                    <label className="guest-form__radio">
                      <input
                        type="radio"
                        name="hasChildren"
                        value="yes"
                        checked={form.hasChildren === "yes"}
                        onChange={handleInputChange}
                      />
                      Да
                    </label>
                    <label className="guest-form__radio">
                      <input
                        type="radio"
                        name="hasChildren"
                        value="no"
                        checked={form.hasChildren === "no"}
                        onChange={handleInputChange}
                      />
                      Нет
                    </label>
                    <label className="guest-form__radio">
                      <input
                        type="radio"
                        name="hasChildren"
                        value="maybe"
                        checked={form.hasChildren === "maybe"}
                        onChange={handleInputChange}
                      />
                      Сообщу позже
                    </label>
                  </div>
                  <div className="guest-form__group">
                    <div className="guest-form__legend">Планируете ли вы выступить с поздравлением?</div>
                    <p className="guest-form__hint">Можно выбрать несколько вариантов</p>
                    {[
                      "Да, хотим сказать несколько слов",
                      "Нет, лучше передадим лично",
                      "Запишем видео / напишем открытку",
                    ].map((item) => (
                      <label key={item} className="guest-form__checkbox">
                        <input
                          type="checkbox"
                          name="congrats"
                          value={item}
                          checked={form.congrats.includes(item)}
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
