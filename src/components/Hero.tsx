import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ScrambleIn } from './Scramble'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4'

const EASE = [0.215, 0.61, 0.355, 1.0] as const

export function Hero({ entranceComplete }: { entranceComplete: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)
  const lastX = useRef<number | null>(null)

  // Скраб видео горизонтальным движением мыши (delta-based, чувствительность 0.8).
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const applySeek = () => {
      if (seeking.current) return
      const dur = video.duration || 0
      const clamped = Math.max(0, Math.min(dur, targetTime.current))
      if (Math.abs(clamped - video.currentTime) < 0.001) return
      seeking.current = true
      video.currentTime = clamped
    }

    const onSeeked = () => {
      seeking.current = false
      applySeek() // цепляем следующий seek, чтобы не терять кадры
    }

    const onMove = (e: MouseEvent) => {
      if (lastX.current === null) {
        lastX.current = e.clientX
        return
      }
      const dx = e.clientX - lastX.current
      lastX.current = e.clientX
      const dur = video.duration || 0
      // масштабируем движение относительно ширины окна
      targetTime.current += (dx / window.innerWidth) * dur * 0.8
      targetTime.current = Math.max(0, Math.min(dur, targetTime.current))
      applySeek()
    }

    video.addEventListener('seeked', onSeeked)
    window.addEventListener('mousemove', onMove)
    video.pause()
    return () => {
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section className="relative w-full h-screen h-[100dvh] overflow-hidden">
      {/* Фоновое видео (скраб мышью, без автоплея) */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Точечная сетка */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      {/* Фоновый вотермарк */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          style={{
            fontFamily: '"Oswald", sans-serif',
            fontSize: 'clamp(70px, 18vw, 320px)',
            letterSpacing: '-4px',
            transform: 'translateY(50px)',
            opacity: 0.1,
            backgroundImage:
              'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            whiteSpace: 'nowrap',
          }}
          className="uppercase font-bold"
        >
          ЭВОЛЮЦИЯ
        </span>
      </div>

      {/* Контент */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col h-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
      >
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Левая колонка */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(34px,7.5vw,80px)]">
              <ScrambleIn text="Разум" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="и тело" delay={500} triggered={entranceComplete} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={
                entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }
              }
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
            >
              Создан на стыке нейробиологии и искусственного интеллекта. SynapseX
              непрерывно отображает нейронные связи, когнитивную нагрузку и
              физиологические состояния в единый адаптивный слой интеллекта.
            </motion.p>
          </div>

          {/* Правый заголовок */}
          <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(34px,7.5vw,80px)] text-left md:text-right">
            <ScrambleIn text="Единая" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="сеть" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  )
}
