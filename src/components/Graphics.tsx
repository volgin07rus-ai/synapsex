import { motion } from 'framer-motion'

const QUADRANT =
  'M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z'

/** Абстрактный логотип SynapseX — 4-кратная поворотная симметрия. */
export function SynapseXLogo({
  size = 18,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 90, 180, 270].map((deg) => (
        <path key={deg} d={QUADRANT} transform={`rotate(${deg})`} />
      ))}
    </svg>
  )
}

/** Анимированный гамбургер со «сплющиванием» в крестик. */
export function SquashHamburger({
  open,
  mobile = false,
}: {
  open: boolean
  mobile?: boolean
}) {
  const w = mobile ? 15 : 18
  const h = mobile ? 10 : 12
  const bar = mobile ? 1.2 : 1.5
  const spring = { type: 'spring' as const, stiffness: 300, damping: 20 }
  const mid = (h - bar) / 2

  return (
    <div className="relative" style={{ width: w, height: h }}>
      <motion.span
        className="absolute left-0 bg-white"
        style={{ width: w, height: bar, top: 0, borderRadius: bar }}
        animate={open ? { top: mid, rotate: 45 } : { top: 0, rotate: 0 }}
        transition={spring}
      />
      <motion.span
        className="absolute left-0 bg-white"
        style={{ width: w, height: bar, top: mid, borderRadius: bar }}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={spring}
      />
      <motion.span
        className="absolute left-0 bg-white"
        style={{ width: w, height: bar, top: h - bar, borderRadius: bar }}
        animate={open ? { top: mid, rotate: -45 } : { top: h - bar, rotate: 0 }}
        transition={spring}
      />
    </div>
  )
}
