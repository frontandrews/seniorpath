import type { Transition, Variants } from 'motion/react'

export const springTransition: Transition = {
  bounce: 0.18,
  duration: 0.42,
  type: 'spring',
}

export const pageTransitionVariants: Variants = {
  animate: {
    opacity: 1,
    transition: {
      duration: 0.26,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
    },
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 1, 1],
    },
    y: 16,
  },
  initial: {
    opacity: 0,
    y: 18,
  },
}

export const staggerContainerVariants: Variants = {
  animate: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.06,
    },
  },
  initial: {},
}

export const sectionRevealVariants: Variants = {
  animate: {
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
    y: 0,
  },
  initial: {
    opacity: 0,
    y: 18,
  },
}

export const cardRevealVariants: Variants = {
  animate: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
    y: 0,
  },
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 14,
  },
}

export const swapPanelVariants: Variants = {
  animate: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1],
    },
    y: 0,
  },
  exit: {
    opacity: 0,
    rotateX: -6,
    scale: 0.98,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 1, 1],
    },
    y: -10,
  },
  initial: {
    opacity: 0,
    rotateX: 6,
    scale: 0.98,
    y: 10,
  },
}

export const hoverLiftMotionProps = {
  transition: springTransition,
  whileHover: {
    rotateX: -2,
    rotateY: 2,
    scale: 1.012,
    y: -6,
  },
  whileTap: {
    rotateX: 0,
    rotateY: 0,
    scale: 0.988,
    y: -2,
  },
} as const
