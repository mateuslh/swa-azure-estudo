import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const rows = [
  { criterion: 'Posicionamento', azure: 'Enterprise, Microsoft stack, híbrido, identidade, IA corporativa', aws: 'Amplitude de serviços, maturidade IaaS, ecossistema, liderança histórica', gcp: 'Dados, analytics, Kubernetes, IA/ML e infraestrutura Google' },
  { criterion: 'Infraestrutura Global', azure: '70+ regiões anunciadas', aws: '39 regiões, 123 Availability Zones', gcp: '43 regiões, 130 zonas' },
  { criterion: 'Estratégia Híbrida', azure: 'Muito forte — Azure Arc, ExpressRoute, Azure VMware Solution', aws: 'Forte — Outposts, Direct Connect, EKS Anywhere', gcp: 'Forte — Anthos / Google Distributed Cloud' },
  { criterion: 'Identidade', azure: 'Microsoft Entra ID — diferencial forte em empresas Microsoft', aws: 'IAM extremamente maduro, menos integrado ao AD corporativo', gcp: 'IAM robusto, integrado ao ecossistema Google' },
  { criterion: 'Kubernetes', azure: 'AKS gerenciado', aws: 'EKS gerenciado', gcp: 'GKE — referência técnica do mercado' },
  { criterion: 'Banco de Dados', azure: 'Azure SQL, Cosmos DB, PostgreSQL, Synapse, Fabric', aws: 'RDS, Aurora, DynamoDB, Redshift', gcp: 'BigQuery, Spanner, Cloud SQL, Firestore' },
  { criterion: 'DevOps', azure: 'Azure DevOps + GitHub (Microsoft)', aws: 'CodePipeline, CodeBuild, CodeDeploy', gcp: 'Cloud Build, Artifact Registry, Cloud Deploy' },
  { criterion: 'Melhor Cenário', azure: 'Empresas Microsoft, híbrido, governança enterprise, IA controlada', aws: 'Cloud-native, ampla variedade de serviços, maturidade operacional', gcp: 'Analytics massivo, IA/ML, Kubernetes especializado, dados' },
];

const decisionCriteria = [
  'Stack atual da empresa',
  'Modelo de identidade',
  'Requisitos de compliance',
  'Capacidade operacional interna',
  'Maturidade DevOps/SRE',
  'Estratégia de dados',
  'Necessidade híbrida',
  'Latência regional',
  'Modelo financeiro',
  'Lock-in aceitável',
];

export default function Comparison() {
  return (
    <section id="comparativo" className="py-24 section-bg-2 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Comparativo Cloud"
          title="Azure vs AWS"
          highlight="vs Google Cloud"
          subtitle="Comparativo técnico honesto para embasar decisões arquiteturais. A escolha raramente deve ser apenas por quantidade de serviços."
        />

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { name: 'Microsoft Azure', color: '#0078d4', share: '24%', label: '2ª maior cloud', flag: '🏆' },
            { name: 'Amazon AWS', color: '#ff9900', share: '31%', label: 'Líder de mercado', flag: '👑' },
            { name: 'Google Cloud', color: '#4285f4', share: '11%', label: '3ª maior cloud', flag: '📊' },
          ].map((cloud, i) => (
            <motion.div
              key={cloud.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5 text-center"
              style={{ borderTop: `3px solid ${cloud.color}` }}
            >
              <div className="text-3xl mb-2">{cloud.flag}</div>
              <div className="font-bold text-white text-sm mb-1">{cloud.name}</div>
              <div className="text-2xl font-bold" style={{ color: cloud.color }}>{cloud.share}</div>
              <div className="text-xs text-gray-500 mt-1">{cloud.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-2xl glass-card mb-10"
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#0078d4]/20">
                <th className="text-left p-4 text-gray-400 text-sm font-medium w-36">Critério</th>
                <th className="text-left p-4 text-[#0078d4] text-sm font-semibold">
                  <span className="flex items-center gap-2">🔵 Azure</span>
                </th>
                <th className="text-left p-4 text-[#ff9900] text-sm font-semibold">
                  <span className="flex items-center gap-2">🟠 AWS</span>
                </th>
                <th className="text-left p-4 text-[#4285f4] text-sm font-semibold">
                  <span className="flex items-center gap-2">🔷 GCP</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.criterion}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors"
                >
                  <td className="p-4 text-gray-300 text-sm font-medium">{row.criterion}</td>
                  <td className="p-4 text-gray-400 text-sm leading-relaxed comparison-azure pl-6">{row.azure}</td>
                  <td className="p-4 text-gray-400 text-sm leading-relaxed comparison-aws pl-6">{row.aws}</td>
                  <td className="p-4 text-gray-400 text-sm leading-relaxed comparison-gcp pl-6">{row.gcp}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-white font-bold text-xl mb-6 text-center">Critérios de Decisão para Arquitetos</h3>
          <p className="text-gray-400 text-center mb-6 text-sm">
            A escolha de cloud raramente deve ser feita apenas por serviços disponíveis. Considere:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {decisionCriteria.map((criterion, i) => (
              <motion.div
                key={criterion}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-[#0078d4]/10 border border-[#0078d4]/20"
              >
                <span className="text-[#0078d4] font-bold text-sm flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-gray-300 text-xs">{criterion}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
