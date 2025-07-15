'use client'
import { motion } from 'framer-motion'
import HomePageImpact, { HomePageImpactProps } from './HomePageImpact'

const HomePageImpactClient = (props: HomePageImpactProps) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
  >
    <HomePageImpact {...props} />
  </motion.section>
)

export default HomePageImpactClient
