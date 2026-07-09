import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SynapseXLogo, SquashHamburger } from './Graphics'
import { ScrambleText } from './Scramble'

const spring = { type: 'spring' as const, stiffness: 350, damping: 28 }

function NavLink({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-[16px] font-normal text-white/85 hover:text-white transition-colors whitespace-nowrap"
    >
      <ScrambleText text={label} isHovered={hover} />
    </button>
  )
}

export function Navbar({ entranceComplete }: { entranceComplete: boolean }) {
  const [open, setOpen] = useState(false)
  const [dlHover, setDlHover] = useState(false)

  const scrollTo = (y: number) => {
    window.scrollTo({ top: y, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8"
    >
      {/* ===== Desktop ===== */}
      <div className="hidden sm:flex items-center gap-2">
        {/* Логотип */}
        <motion.div
          className={`${open ? 'hidden md:flex' : 'flex'} h-12 px-5 items-center gap-2 bg-white/15 backdrop-blur-md rounded-[14px] cursor-pointer`}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
          whileTap={{ scale: 0.98 }}
        >
          <SynapseXLogo size={18} className="text-white" />
          <span className="text-[16px] font-medium tracking-tight text-white">
            SynapseX
          </span>
        </motion.div>

        {/* Раскрывающееся меню */}
        <motion.div
          className="h-12 bg-white/15 backdrop-blur-md rounded-[14px] flex items-center overflow-hidden"
          animate={{ width: open ? 290 : 48 }}
          transition={spring}
        >
          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center justify-center shrink-0 ${
              open
                ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5'
                : 'w-12 h-12 rounded-[14px]'
            } transition-colors`}
          >
            <SquashHamburger open={open} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-5 pl-4 pr-2 whitespace-nowrap"
              >
                <NavLink
                  label="О системе"
                  onClick={() => scrollTo(window.innerHeight)}
                />
                <NavLink
                  label="Метрики"
                  onClick={() => scrollTo(window.innerHeight * 2)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Кнопка «Скачать» — Desktop */}
      <motion.button
        onMouseEnter={() => setDlHover(true)}
        onMouseLeave={() => setDlHover(false)}
        whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
        whileTap={{ scale: 0.97 }}
        className="hidden sm:flex h-12 px-6 items-center gap-2 bg-white rounded-full text-black"
      >
        <i className="bi bi-apple text-[16px]" />
        <ScrambleText
          text="Скачать"
          isHovered={dlHover}
          className="text-[15px] font-medium"
        />
      </motion.button>

      {/* ===== Mobile ===== */}
      <div className="flex sm:hidden items-center gap-2">
        <motion.div
          className="h-9 px-3 flex items-center gap-1.5 bg-white/15 backdrop-blur-md rounded-[10px] overflow-hidden"
          animate={{ width: open ? 0 : 'auto', opacity: open ? 0 : 1, paddingLeft: open ? 0 : 12, paddingRight: open ? 0 : 12 }}
          transition={spring}
        >
          <SynapseXLogo size={14} className="text-white" />
          <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
            SynapseX
          </span>
        </motion.div>

        <motion.div
          className="h-9 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center overflow-hidden"
          animate={{ width: open ? '100%' : 36 }}
          transition={spring}
        >
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-9 h-9 flex items-center justify-center shrink-0"
          >
            <SquashHamburger open={open} mobile />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4 pl-3 pr-2 whitespace-nowrap"
              >
                <button
                  onClick={() => scrollTo(window.innerHeight)}
                  className="text-[13px] text-white/85"
                >
                  О системе
                </button>
                <button
                  onClick={() => scrollTo(window.innerHeight * 2)}
                  className="text-[13px] text-white/85"
                >
                  Метрики
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Кнопка «Скачать» — Mobile */}
      <button className="flex sm:hidden h-9 px-3.5 items-center gap-1.5 bg-white rounded-full text-black">
        <i className="bi bi-apple text-[13px]" />
        <span className="text-[13px] font-medium">Скачать</span>
      </button>
    </motion.nav>
  )
}
