import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const controls = [
  { area: 'Identidade', icon: '🔐', items: ['MFA obrigatório', 'Conditional Access', 'PIM para acessos privilegiados', 'RBAC mínimo necessário'] },
  { area: 'Rede', icon: '🌐', items: ['Hub-spoke ou VWAN', 'Private Link para PaaS', 'Firewall centralizado', 'NSG e Route Tables'] },
  { area: 'Segurança', icon: '🛡️', items: ['Defender for Cloud', 'Microsoft Sentinel', 'Key Vault para segredos', 'Criptografia em repouso/trânsito'] },
  { area: 'Custos', icon: '💰', items: ['Budgets e alertas', 'Tags obrigatórias', 'Cost Management', 'Revisão mensal'] },
  { area: 'Observabilidade', icon: '📊', items: ['Azure Monitor', 'Application Insights', 'Log Analytics + KQL', 'Dashboards e alertas'] },
  { area: 'Compliance', icon: '📋', items: ['Azure Policy', 'Iniciativas de compliance', 'Auditoria contínua', 'Bloqueio de configs proibidas'] },
  { area: 'IaC', icon: '⚙️', items: ['Bicep ou Terraform', 'Pipelines de IaC no CI/CD', 'State remoto', 'Módulos reutilizáveis'] },
  { area: 'Resiliência', icon: '🔄', items: ['Availability Zones', 'Backups automatizados', 'DR testado periodicamente', 'RTO/RPO definidos e documentados'] },
];

const wafPillars = [
  { name: 'Confiabilidade', icon: '🏗️', color: '#0078d4', desc: 'Alta disponibilidade, backups, zonas e testes de caos' },
  { name: 'Segurança', icon: '🔒', color: '#ff6b35', desc: 'Defesa em profundidade, menor privilégio, criptografia' },
  { name: 'Otimização de Custos', icon: '💵', color: '#7fba00', desc: 'Right-sizing, reservas, FinOps e eliminação de desperdício' },
  { name: 'Excelência Operacional', icon: '⚙️', color: '#50a3e0', desc: 'IaC, CI/CD, observabilidade e cultura DevOps' },
  { name: 'Eficiência de Performance', icon: '⚡', color: '#ffb900', desc: 'Escala horizontal, cache, CDN e monitoramento de perf' },
];

export default function Governance() {
  return (
    <section id="governanca" className="py-24 section-bg-2 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Governança & Boas Práticas"
          title="Azure"
          highlight="Landing Zone"
          subtitle="Fundação obrigatória para ambientes enterprise. Governança, segurança, identidade e rede antes do primeiro workload."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {controls.map((ctrl, i) => (
            <motion.div
              key={ctrl.area}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-card rounded-2xl p-5 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl group-hover:scale-110 transition-transform">{ctrl.icon}</span>
                <h4 className="text-white font-semibold">{ctrl.area}</h4>
              </div>
              <ul className="space-y-2">
                {ctrl.items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 + j * 0.05 }}
                    className="flex items-start gap-2 text-gray-400 text-xs leading-relaxed"
                  >
                    <span className="text-[#0078d4] mt-0.5 flex-shrink-0">▸</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-white font-bold text-xl mb-2 text-center">Azure Well-Architected Framework</h3>
          <p className="text-gray-500 text-sm text-center mb-8">
            5 pilares para avaliação e melhoria contínua de workloads no Azure
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {wafPillars.map((pillar, i) => (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-5 rounded-2xl border transition-all duration-300 hover:scale-105"
                style={{
                  background: `${pillar.color}08`,
                  borderColor: `${pillar.color}30`,
                }}
              >
                <div className="text-3xl mb-3">{pillar.icon}</div>
                <h4 className="text-white font-semibold text-sm mb-2">{pillar.name}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
