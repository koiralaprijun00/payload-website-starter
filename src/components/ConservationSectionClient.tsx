'use client'
import { motion } from 'framer-motion'
import ConservationSection, { ConservationSectionProps } from './ConservationSection'

const ConservationSectionClient = (props: ConservationSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
  >
    <ConservationSection {...props} />
  </motion.div>
)

export default ConservationSectionClient
