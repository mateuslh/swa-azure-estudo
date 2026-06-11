import { motion } from 'framer-motion';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';
import SectionHeader from './SectionHeader';

const advantages = [
  {
    title: 'Forte Integração Corporativa',
    desc: 'Empresas que usam Microsoft 365, Windows Server, SQL Server, Active Directory, Teams, Dynamics ou Power Platform têm adoção com mínimo atrito.',
    detail: 'Identidade, compliance, auditoria e controle de acesso centralizados via Microsoft Entra ID e RBAC nativo.',
    icon: '🏢',
  },
  {
    title: 'Estratégia Híbrida Excelente',
    desc: 'Azure Arc estende governança para on-premises, multicloud e edge. Essencial para empresas com restrições regulatórias, legados ou plantas industriais.',
    detail: 'Azure VMware Solution facilita migração de workloads VMware sem reescrever aplicações.',
    icon: '🔗',
  },
  {
    title: 'Workloads Windows e SQL Server',
    desc: 'Caminhos de migração naturais com Azure SQL, Azure SQL Managed Instance e Azure Hybrid Benefit para licenças existentes.',
    detail: 'Economia significativa com Azure Hybrid Benefit para empresas com SA ativo.',
    icon: '💾',
  },
  {
    title: 'Governança em Escala',
    desc: 'ARM, Management Groups, Azure Policy, RBAC, tags e Cost Management formam base consistente para múltiplas subscriptions e times.',
    detail: 'Landing zones e blueprints aceleram criação de ambientes seguros e auditáveis.',
    icon: '⚖️',
  },
  {
    title: 'IA Corporativa Madura',
    desc: 'Microsoft Foundry e Azure OpenAI bem posicionados para IA empresarial com governança, integração com identidade e controle de dados.',
    detail: 'Responsabilidade de IA, Content Safety e observabilidade nativas para produção.',
    icon: '🤖',
  },
  {
    title: 'Ecossistema DevOps Completo',
    desc: 'Azure DevOps + GitHub Actions formam uma das plataformas DevOps mais completas do mercado, com integração end-to-end.',
    detail: 'GitHub Copilot, Codespaces e integração com Azure fazem do fluxo dev → cloud extremamente fluido.',
    icon: '⚙️',
  },
];

const disadvantages = [
  {
    title: 'Complexidade Operacional',
    desc: 'Muitos serviços, SKUs e opções de rede. Sem landing zone definida, cria-se ambientes difíceis de auditar.',
    severity: 'alto',
    impact: 'Sem arquitetura de rede hub-spoke e políticas corretas, o ambiente escala o caos junto.',
  },
  {
    title: 'Curva de Aprendizado em Rede',
    desc: 'VNets, NSGs, Route Tables, Private DNS Zones, Private Link, ExpressRoute — rede Azure exige domínio profundo.',
    severity: 'alto',
    impact: 'Arquitetura de rede mal definida é a causa número 1 de retrabalho em projetos Azure enterprise.',
  },
  {
    title: 'Custo Pode Crescer Rapidamente',
    desc: 'Pay-as-you-go pode gerar gastos inesperados com recursos esquecidos, tráfego de saída e PaaS mal parametrizado.',
    severity: 'médio',
    impact: 'Tags obrigatórias e budgets são necessários desde o dia 1 para controle efetivo.',
  },
  {
    title: 'Disponibilidade por Região',
    desc: 'Nem todos os serviços estão em todas as regiões. Afeta residência de dados, compliance e DR.',
    severity: 'médio',
    impact: 'Validar disponibilidade antes de comprometer arquitetura com serviço em região específica.',
  },
  {
    title: 'Dependência do Ecossistema Microsoft',
    desc: 'Vantagem para empresas Microsoft, mas limitação para estratégia multicloud simétrica.',
    severity: 'baixo',
    impact: 'Avaliar lock-in antes de adotar serviços proprietários sem alternativas abertas.',
  },
];

const severityColor = { alto: '#ff4444', médio: '#ffb900', baixo: '#7fba00' };

export default function Advantages() {
  return (
    <section id="vantagens" className="py-24 section-bg-1 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Vantagens & Limitações"
          title="Análise"
          highlight="Técnica Honesta"
          subtitle="Pontos fortes e fracos do Azure para arquitetos que precisam tomar decisões baseadas em fatos."
        />

        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <FiCheck className="text-[#7fba00] text-3xl" />
            Vantagens Competitivas
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 border-t-2 border-[#0078d4]/40 group"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{adv.icon}</span>
                  <h4 className="text-white font-semibold text-base leading-tight">{adv.title}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{adv.desc}</p>
                <div className="px-3 py-2 rounded-lg bg-[#0078d4]/10 border border-[#0078d4]/20">
                  <p className="text-[#50a3e0] text-xs leading-relaxed">{adv.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <FiAlertTriangle className="text-[#ffb900] text-3xl" />
            Limitações e Pontos de Atenção
          </motion.h3>
          <div className="space-y-4">
            {disadvantages.map((dis, i) => (
              <motion.div
                key={dis.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 group"
                style={{ borderLeft: `3px solid ${severityColor[dis.severity]}` }}
              >
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-semibold">{dis.title}</h4>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `${severityColor[dis.severity]}20`, color: severityColor[dis.severity] }}
                      >
                        Risco {dis.severity}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{dis.desc}</p>
                  </div>
                  <div className="sm:max-w-xs">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Impacto</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{dis.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
