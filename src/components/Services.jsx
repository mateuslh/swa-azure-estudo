import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiServer, FiDatabase, FiShield, FiGlobe, FiCode, FiCpu, FiLink, FiPackage, FiChevronDown } from 'react-icons/fi';
import SectionHeader from './SectionHeader';
import { serviceCategories } from '../data/services';

const iconMap = {
  FiServer, FiDatabase, FiShield, FiGlobe, FiCode, FiCpu, FiLink, FiPackage,
};

const colors = {
  compute: '#0078d4',
  storage: '#50a3e0',
  database: '#00bcf2',
  network: '#0078d4',
  security: '#ff6b35',
  devops: '#7fba00',
  ai: '#a020f0',
  integration: '#50a3e0',
};

function ServiceCard({ svc, color, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
          <div>
            <h4 className="text-white font-bold text-base leading-tight">{svc.name}</h4>
            <p className="text-xs mt-0.5" style={{ color }}>{svc.tagline}</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-3 pl-5">{svc.use}</p>

        <div className="pl-5 mb-3">
          <div className="text-xs px-3 py-2 rounded-lg leading-relaxed"
            style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>
            <span className="font-semibold">⚡ </span>{svc.note}
          </div>
        </div>

        {svc.detail && (
          <div className="pl-5">
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <FiChevronDown
                className="transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
              />
              {expanded ? 'Ocultar detalhes técnicos' : 'Ver detalhes técnicos'}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 space-y-1.5 overflow-hidden"
                >
                  {svc.detail.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                      <span style={{ color }} className="flex-shrink-0 mt-0.5">▸</span>
                      {d}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [active, setActive] = useState('compute');
  const current = serviceCategories.find(c => c.id === active);

  return (
    <section id="servicos" className="py-24 section-bg-3 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Catálogo de Serviços"
          title="Principais"
          highlight="Serviços Azure"
          subtitle="200+ serviços — aqui estão os mais relevantes para arquitetura corporativa, com contexto de quando usar e detalhes técnicos."
        />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {serviceCategories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const color = colors[cat.id] || '#0078d4';
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 tab-btn ${active === cat.id ? 'active' : 'text-gray-400 hover:text-gray-200'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={active === cat.id ? { color, background: `${color}15`, borderBottomColor: color } : {}}
              >
                {Icon && <Icon />}
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {current.services.map((svc, i) => (
                  <ServiceCard
                    key={svc.name}
                    svc={svc}
                    color={colors[current.id] || '#0078d4'}
                    index={i}
                  />
                ))}
              </div>

              {current.id === 'ai' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 glass-card rounded-2xl p-7 border border-[#a020f0]/25"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🤖</span>
                    <h3 className="text-white font-bold text-lg">Stack de IA no Azure — Como os serviços se conectam</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    O padrão típico para IA corporativa: <span className="text-[#a020f0]">Azure OpenAI</span> fornece o LLM,{' '}
                    <span className="text-[#50a3e0]">Azure AI Search</span> indexa os documentos e provê o retrieval (RAG),{' '}
                    <span className="text-[#a020f0]">Microsoft Foundry</span> orquestra o flow completo com avaliação e governança,{' '}
                    e <span className="text-[#7fba00]">Azure Machine Learning</span> cuida de modelos fine-tuned e MLOps.
                    Toda a stack se integra com Entra ID, Key Vault e Azure Monitor — mesmos controles de segurança e observabilidade do resto da plataforma.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
