'use client'
import { motion } from 'framer-motion'
import HomePageProjects, { HomePageProjectsProps } from './HomePageProjects'

const HomePageProjectsClient = (props: HomePageProjectsProps) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
  >
    <HomePageProjects {...props} />
  </motion.section>
)

export default HomePageProjectsClient
