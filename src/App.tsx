import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SynapseXLogo } from './components/Graphics'

const VIDEO = {
  section2:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4',
  metrics:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4',
  technology:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4',
  footer:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4',
}

function BgVideo({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}

/* ============ SECTION 2: Кинематографичный текст ============ */
function CinematicSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  })
  const y = useTransform(smooth, [0, 1], [60, -120])
  const opacity = useTransform(smooth, [0.3, 0.5], [0, 1])
  const transform = useMotionTemplate`rotateX(24deg) translateY(${y}px) translateZ(15px)`

  return (
    <section
      ref={ref}
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      <BgVideo src={VIDEO.section2} />
      <div
        className="absolute top-0 left-0 w-full z-10 pointer-events-none"
        style={{
          height: 180,
          background: 'linear-gradient(#010103, transparent)',
        }}
      />
      <div
        className="relative z-20 max-w-5xl"
        style={{ perspective: 400 }}
      >
        <motion.p
          style={{ transform, opacity }}
          className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center"
        >
          Нейро-ИИ интерфейс, построенный на архитектуре нервной системы
          человека. SynapseX преобразует синаптическую активность в
          вычислительный интеллект. Каждый сигнал становится измеримым,
          структурированным и видимым. Система непрерывно воссоздаёт внутреннее
          состояние в виде динамической нейронной карты. Биологический шум
          фильтруется в осмысленные когнитивные паттерны.
        </motion.p>
      </div>
    </section>
  )
}

/* ============ SECTION 3: Метрики ============ */
const METRICS = [
  { value: '2,4 мс', label: 'Синаптическая задержка' },
  { value: '99,7%', label: 'Точность сигнала' },
  { value: '140 млрд', label: 'Нейронные параметры' },
]

function MetricsSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <BgVideo src={VIDEO.metrics} />
      <div className="relative z-10 max-w-6xl mx-auto pt-32 pb-32 px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
        >
          Показатели производительности
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                {m.value}
              </div>
              <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ SECTION 4: Адаптивный интеллект ============ */
const TECH = [
  {
    title: 'Картирование коры',
    desc: 'Пространственная реконструкция активных зон мозга в реальном времени.',
  },
  {
    title: 'Изоляция сигнала',
    desc: 'Отделяет когнитивное намерение от биологического шума.',
  },
  {
    title: 'Прогноз состояния',
    desc: 'Предугадывает когнитивные переходы до их наступления.',
  },
  {
    title: 'Обратная связь',
    desc: 'Замкнутая корректировка на основе корреляции результатов.',
  },
]

function TechnologySection() {
  return (
    <section className="relative w-full h-screen h-[100dvh] overflow-hidden">
      <BgVideo src={VIDEO.technology} />
      <div className="relative z-10 flex flex-col h-full px-8 sm:px-12 md:px-16 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
            className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
          >
            Адаптивный
            <br />
            интеллект
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
          >
            Система изучает вашу нейронную базовую линию за 72 часа. После этого
            каждое когнитивное состояние отображается, прогнозируется и
            оптимизируется в реальном времени.
          </motion.p>
        </div>

        <div className="flex-1" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
        >
          {TECH.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                {t.title}
              </div>
              <div className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
                {t.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ============ SECTION 5: Архитектура ============ */
const LAYERS = [
  { n: 'Слой 1', name: 'Захват' },
  { n: 'Слой 2', name: 'Обработка' },
  { n: 'Слой 3', name: 'Интерфейс' },
]

function ArchitectureSection() {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            Архитектура
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
            Три слоя. Ноль трения.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            Сенсорный слой захватывает необработанные биоэлектрические сигналы.
            Слой обработки выделяет намерение. Слой интерфейса передаёт
            структурированный вывод в любую подключённую систему.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-20 flex flex-col items-center gap-4"
        >
          {LAYERS.map((l) => (
            <div
              key={l.n}
              className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                {l.n}
              </span>
              <span className="text-white text-[16px] sm:text-[18px] font-light">
                {l.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="relative w-full bg-black overflow-hidden flex flex-col md:flex-row min-h-[400px]">
      <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
        <video
          src={VIDEO.footer}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
        <div>
          <div className="flex items-center gap-2 mb-8 text-white/70">
            <SynapseXLogo size={18} />
            <span className="text-[15px] font-medium tracking-tight">
              SynapseX
            </span>
          </div>
          <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
            Следующая эволюция взаимодействия человека и машины. Создано для тех,
            кто отказывается быть ограниченным одной лишь биологией.
          </p>
        </div>
        <p className="text-white/25 text-[12px] mt-12">
          © 2026 SynapseX Labs. Все права защищены.
        </p>
      </div>
    </footer>
  )
}

/* ============ APP ============ */
export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }}>
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <CinematicSection />
      <MetricsSection />
      <TechnologySection />
      <ArchitectureSection />
      <Footer />
    </div>
  )
}
