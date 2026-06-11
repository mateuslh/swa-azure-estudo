import { motion } from 'framer-motion';

export default function SectionHeader({ badge, title, highlight, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0078d4]/40 bg-[#0078d4]/10 text-[#50a3e0] text-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-[#0078d4]" />
          {badge}
        </div>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
        {title}{' '}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
