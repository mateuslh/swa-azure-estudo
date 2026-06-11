import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import WorldMap from './WorldMap';

const brazilInfo = [
  {
    label: 'Brazil South',
    loc: 'Estado de São Paulo',
    detail: 'Primeira região brasileira — disponível com Availability Zones. Pareada com South Central US para DR. Suporta a maioria dos serviços Azure.',
    color: '#0078d4',
    az: true,
  },
  {
    label: 'Brazil Southeast',
    loc: 'Rio de Janeiro',
    detail: 'Região secundária — foco em cenários de disaster recovery e workloads específicos que exigem residência de dados no Brasil. Cobertura de serviços menor.',
    color: '#50a3e0',
    az: false,
  },
];

const considerations = [
  { icon: '📡', title: 'Latência', desc: 'Brazil South oferece < 20ms para usuários no Sudeste. Para Norte/Nordeste, avaliar latência vs US East.' },
  { icon: '🏛️', title: 'Residência de Dados (LGPD)', desc: 'LGPD não proíbe transferência internacional, mas exige bases legais. Alguns contratos exigem dado em território nacional.' },
  { icon: '🔄', title: 'Disaster Recovery', desc: 'Brazil South → South Central US é a região pareada padrão. Avaliar se DR fora do país atende requisitos legais e contratuais.' },
  { icon: '⚡', title: 'Disponibilidade de Serviços', desc: 'Validar disponibilidade na matriz oficial antes de comprometer arquitetura. Brazil South tem cobertura de ~85% dos serviços Azure.' },
  { icon: '💰', title: 'Custo por Região', desc: 'Brazil South costuma ser 30-50% mais cara que East US. Modelar custo antes de definir residência padrão de todos os recursos.' },
  { icon: '📋', title: 'Compliance Setorial', desc: 'BACEN, ANS, ANATEL e outros reguladores podem exigir regiões específicas. Sempre validar com jurídico antes de definir a arquitetura.' },
];

export default function GlobalCoverage() {
  return (
    <section id="cobertura" className="py-24 section-bg-3 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Cobertura Global"
          title="Infraestrutura"
          highlight="Mundial"
          subtitle="70+ regiões anunciadas — uma das maiores coberturas globais entre provedores cloud. Hover nos pontos para ver detalhes."
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {[
            { value: '70+', label: 'Regiões Anunciadas', sub: '140+ países atendidos', color: '#0078d4', icon: '🌍' },
            { value: '3+', label: 'Zonas por Região', sub: 'Datacenters independentes', color: '#50a3e0', icon: '🏗️' },
            { value: '2', label: 'Regiões no Brasil', sub: 'São Paulo + Rio de Janeiro', color: '#7fba00', icon: '🇧🇷' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-5xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-white font-semibold text-base mb-1">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-4 mb-12 border border-[#0078d4]/20"
        >
          <div className="flex items-center gap-2 mb-3 px-2">
            <span className="text-sm text-gray-400">Regiões Azure no mundo — passe o mouse nos pontos para ver detalhes</span>
          </div>
          <WorldMap />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border border-[#7fba00]/20"
          >
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
              🇧🇷 Presença no Brasil
            </h3>
            <div className="space-y-5">
              {brazilInfo.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl"
                  style={{ background: `${r.color}10`, border: `1px solid ${r.color}30` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-base" style={{ color: r.color }}>{r.label}</span>
                    {r.az
                      ? <span className="text-xs px-2 py-0.5 rounded-full bg-[#7fba00]/20 text-[#7fba00] border border-[#7fba00]/30">AZ disponível</span>
                      : <span className="text-xs px-2 py-0.5 rounded-full bg-[#50a3e0]/20 text-[#50a3e0] border border-[#50a3e0]/30">Sem AZ</span>
                    }
                  </div>
                  <div className="text-gray-400 text-sm font-medium mb-2">{r.loc}</div>
                  <div className="text-gray-500 text-sm leading-relaxed">{r.detail}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-white font-bold text-xl mb-6">Decisões Arquiteturais por Região</h3>
            <div className="space-y-4">
              {considerations.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#0078d4]/08 border border-[#0078d4]/15 hover:bg-[#0078d4]/12 transition-colors"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-white text-sm font-semibold mb-1">{item.title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
