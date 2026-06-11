import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import SectionHeader from './SectionHeader';

const models = [
  {
    title: 'Pay-as-you-go',
    desc: 'Paga pelo consumo efetivo. Sem custo inicial.',
    use: 'Testes, POCs e workloads variáveis',
    icon: '💳',
    color: '#50a3e0',
    highlight: false,
  },
  {
    title: 'Reserved Instances',
    desc: 'Compromisso de 1 ou 3 anos com desconto significativo.',
    use: 'Workloads estáveis e previsíveis',
    icon: '📅',
    color: '#0078d4',
    highlight: true,
    savings: 'até 72% de economia',
  },
  {
    title: 'Savings Plan',
    desc: 'Compromisso de gasto/hora com preços reduzidos.',
    use: 'Consumo constante com variação de SKU',
    icon: '💰',
    color: '#7fba00',
    highlight: false,
    savings: 'até 65% de economia',
  },
  {
    title: 'Azure Hybrid Benefit',
    desc: 'Aproveita licenças existentes de Windows Server ou SQL Server.',
    use: 'Empresas com licenciamento Microsoft',
    icon: '♻️',
    color: '#00bcf2',
    highlight: false,
    savings: 'até 85% em alguns cenários',
  },
  {
    title: 'Spot VMs',
    desc: 'Capacidade ociosa com desconto, sujeita a interrupção.',
    use: 'Batch, CI/CD, renderização',
    icon: '⚡',
    color: '#ffb900',
    highlight: false,
    savings: 'até 90% de economia',
  },
  {
    title: 'Free Tier',
    desc: 'Créditos iniciais e serviços gratuitos limitados.',
    use: 'Aprendizado e validações iniciais',
    icon: '🎁',
    color: '#a020f0',
    highlight: false,
  },
];

const warnings = [
  { icon: '🖥️', warn: 'VM ligada gera custo mesmo sem uso' },
  { icon: '💽', warn: 'Disco persiste custo com VM desligada' },
  { icon: '📊', warn: 'Logs em excesso encarecem Azure Monitor' },
  { icon: '🌐', warn: 'Tráfego de saída (egress) pode ser expressivo' },
  { icon: '🗃️', warn: 'Bancos PaaS ficam caros se superdimensionados' },
  { icon: '🏷️', warn: 'Tags obrigatórias desde o dia 1' },
  { icon: '⏰', warn: 'Dev/test devem ter desligamento automatizado' },
  { icon: '📉', warn: 'Budgets e alertas são essenciais' },
];

export default function Pricing() {
  return (
    <section id="precos" className="py-24 section-bg-1 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="FinOps & Preços"
          title="Modelos de"
          highlight="Precificação"
          subtitle="Pay-as-you-go reduz investimento inicial, mas exige disciplina FinOps para evitar gastos inesperados."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {models.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-2xl p-6 relative ${model.highlight ? 'border border-[#0078d4]/50' : ''}`}
            >
              {model.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#0078d4] text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Mais Usado
                  </span>
                </div>
              )}
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{model.icon}</span>
                <div>
                  <h4 className="text-white font-bold text-base">{model.title}</h4>
                  {model.savings && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${model.color}20`, color: model.color }}>
                      {model.savings}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{model.desc}</p>
              <div className="p-3 rounded-lg text-xs"
                style={{ background: `${model.color}10`, color: model.color, border: `1px solid ${model.color}20` }}>
                ✓ {model.use}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 border border-[#ffb900]/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiAlertCircle className="text-[#ffb900] text-2xl flex-shrink-0" />
            <h3 className="text-white font-bold text-xl">Armadilhas de Custo — FinOps Essencial</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {warnings.map((w, i) => (
              <motion.div
                key={w.warn}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#ffb900]/5 border border-[#ffb900]/20"
              >
                <span className="text-xl flex-shrink-0">{w.icon}</span>
                <span className="text-gray-400 text-xs leading-relaxed">{w.warn}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
