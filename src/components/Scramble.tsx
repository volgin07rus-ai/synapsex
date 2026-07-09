import { useEffect, useRef, useState } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]

/**
 * ScrambleIn — entrance reveal animation.
 * После задержки delay проявляет текст слева направо (0.5 символа за кадр),
 * ещё не открытые символы (до 3 впереди курсора) показываются случайным «шумом».
 */
export function ScrambleIn({
  text,
  delay,
  triggered,
}: {
  text: string
  delay: number
  triggered: boolean
}) {
  const [display, setDisplay] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!triggered) return
    let raf = 0
    let interval: ReturnType<typeof setInterval> | null = null
    const timer = setTimeout(() => {
      setStarted(true)
      let revealed = 0
      interval = setInterval(() => {
        revealed += 0.5
        const cursor = Math.floor(revealed)
        let out = ''
        for (let i = 0; i < text.length; i++) {
          const ch = text[i]
          if (ch === ' ') {
            out += ' '
            continue
          }
          if (i < cursor) {
            out += ch
          } else if (i < cursor + 3) {
            out += randChar()
          } else {
            out += ''
          }
        }
        setDisplay(out)
        if (cursor >= text.length) {
          setDisplay(text)
          if (interval) clearInterval(interval)
        }
      }, 25)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (interval) clearInterval(interval)
      cancelAnimationFrame(raf)
    }
  }, [triggered, text, delay])

  if (!triggered || !started) {
    return <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
  }
  return <span>{display}</span>
}

/**
 * ScrambleText — hover-driven scramble.
 * При наведении зашумляет все символы, затем проявляет слева направо
 * (4 кадра на символ, интервал 25мс). При уходе мыши мгновенно сбрасывается.
 */
export function ScrambleText({
  text,
  isHovered,
  className,
}: {
  text: string
  isHovered: boolean
  className?: string
}) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text)
      return
    }
    let interval: ReturnType<typeof setInterval> | null = null
    frame.current = 0
    interval = setInterval(() => {
      frame.current += 1
      const revealed = Math.floor(frame.current / 4)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === ' ') {
          out += ' '
        } else if (i < revealed) {
          out += ch
        } else {
          out += randChar()
        }
      }
      setDisplay(out)
      if (revealed >= text.length) {
        setDisplay(text)
        if (interval) clearInterval(interval)
      }
    }, 25)
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHovered, text])

  return <span className={className}>{display}</span>
}
