import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AzureIcon from './AzureIcon';
import { FiArrowDown } from 'react-icons/fi';

const pillars = [
  { label: 'IaaS', desc: 'VMs, redes, discos e infraestrutura sob demanda', color: '#0078d4' },
  { label: 'PaaS', desc: 'App Service, Functions, AKS e serviços gerenciados', color: '#50a3e0' },
  { label: 'Dados', desc: 'SQL, NoSQL, analytics e Microsoft Fabric', color: '#00bcf2' },
  { label: 'IA', desc: 'Foundry, Azure OpenAI e agentes corporativos', color: '#a020f0' },
  { label: 'Segurança', desc: 'Entra ID, Defender, Key Vault e Sentinel', color: '#ff6b35' },
  { label: 'Híbrido', desc: 'Azure Arc, ExpressRoute e VMware Solution', color: '#7fba00' },
];

function Particle({ style }) {
  return <div className="hero-particle" style={style} />;
}

export default function Hero() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 6 + 2}px`,
    height: `${Math.random() * 6 + 2}px`,
    background: i % 3 === 0 ? '#0078d4' : i % 3 === 1 ? '#50a3e0' : '#00bcf2',
    opacity: Math.random() * 0.6 + 0.2,
    animationDuration: `${Math.random() * 15 + 10}s`,
    animationDelay: `${Math.random() * 10}s`,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient-bg grid-pattern">
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="spin-slow w-[600px] h-[600px] rounded-full border border-[#0078d4]/10" />
        <div className="absolute spin-slow w-[400px] h-[400px] rounded-full border border-[#50a3e0]/10" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
        <div className="absolute spin-slow w-[200px] h-[200px] rounded-full border border-[#00bcf2]/20" style={{ animationDuration: '8s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <AzureIcon size={96} className="float-animation" />
            <div className="absolute inset-0 bg-[#0078d4]/20 rounded-full blur-2xl" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0078d4]/40 bg-[#0078d4]/10 text-[#50a3e0] text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00bcf2] animate-pulse" />
            Plataforma Cloud Enterprise — Microsoft Azure
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Microsoft</span>{' '}
            <span className="shimmer-text">Azure</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto mb-4 leading-relaxed">
            Plataforma cloud da Microsoft para computação, dados, IA, segurança,
            integração, DevOps e workloads empresariais em{' '}
            <span className="text-[#50a3e0]">escala global.</span>
          </p>

          <p className="text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
            Visão técnica e estratégica para arquitetos sênior — origem, arquitetura,
            serviços, governança, comparativo com AWS e Google Cloud, cobertura global e modelos de preço.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto mb-12"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="glass-card rounded-xl p-4 text-center group cursor-default"
              style={{ '--hover-color': p.color }}
            >
              <div
                className="text-xs font-bold mb-1 px-2 py-0.5 rounded-full inline-block"
                style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}
              >
                {p.label}
              </div>
              <p className="text-xs text-gray-500 mt-2 leading-tight">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#origem"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0078d4] hover:bg-[#006cbd] text-white font-semibold rounded-xl transition-all duration-200 pulse-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explorar Arquitetura
            <FiArrowDown className="animate-bounce" />
          </motion.a>
          <motion.a
            href="#comparativo"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#0078d4]/50 text-[#50a3e0] font-semibold rounded-xl hover:bg-[#0078d4]/10 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Azure vs Concorrentes
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '70+', label: 'Regiões Globais' },
            { value: '200+', label: 'Serviços Cloud' },
            { value: '2008', label: 'Ano de Fundação' },
            { value: '99.9%+', label: 'SLA Uptime' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.9 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold shimmer-text">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowDown className="text-[#0078d4] text-2xl opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
