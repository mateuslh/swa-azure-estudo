import { motion } from 'framer-motion';
import AzureIcon from './AzureIcon';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';
import SectionHeader from './SectionHeader';

const whenAzure = [
  'A empresa usa fortemente o ecossistema Microsoft (M365, AD, SQL Server, .NET)',
  'Identidade corporativa é central na arquitetura (Entra ID, SSO, MFA)',
  'Existe ambiente híbrido ou legado relevante para gerenciar',
  'Governança em escala é um requisito não-negociável',
  'Workloads SQL Server, Windows Server ou .NET são predominantes',
  'A estratégia de IA precisa de governança empresarial robusta',
  'Compliance e residência de dados exigem infraestrutura dedicada',
];

const whenAttention = [
  'A organização não possui maturidade FinOps — custos podem escapar',
  'Arquitetura de rede não está bem definida antes do primeiro deployment',
  'Não há plano de landing zone — resulta em ambientes difíceis de auditar',
  'Times têm pouca experiência com cloud governance corporativa',
  'A empresa busca neutralidade extrema de provedor cloud',
  'Workloads são 100% cloud-native sem dependência do ecossistema Microsoft',
];

export default function Conclusion() {
  return (
    <section id="conclusao" className="py-24 relative overflow-hidden animated-gradient-bg">
      <div className="grid-pattern absolute inset-0 opacity-30" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="spin-slow w-[800px] h-[800px] rounded-full border border-[#0078d4]/5" />
        <div className="absolute spin-slow w-[500px] h-[500px] rounded-full border border-[#50a3e0]/8" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Conclusão Técnica"
          title="Quando Usar"
          highlight="o Azure?"
          subtitle="Microsoft Azure não é apenas infraestrutura na nuvem — é uma plataforma corporativa completa para modernização, governança, integração, dados e IA em escala."
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-2xl p-8 border border-[#7fba00]/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#7fba00]/20 border border-[#7fba00]/40 flex items-center justify-center">
                <FiCheck className="text-[#7fba00] text-xl" />
              </div>
              <h3 className="text-white font-bold text-xl">Azure é mais indicado quando:</h3>
            </div>
            <ul className="space-y-3">
              {whenAzure.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#7fba00] font-bold mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card rounded-2xl p-8 border border-[#ffb900]/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#ffb900]/20 border border-[#ffb900]/40 flex items-center justify-center">
                <FiAlertTriangle className="text-[#ffb900] text-xl" />
              </div>
              <h3 className="text-white font-bold text-xl">Azure exige atenção quando:</h3>
            </div>
            <ul className="space-y-3">
              {whenAttention.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#ffb900] font-bold mt-0.5 flex-shrink-0">⚠</span>
                  <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-12 text-center border border-[#0078d4]/30 pulse-glow relative overflow-hidden"
        >
          <div className="absolute inset-0 azure-gradient opacity-5" />
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <AzureIcon size={72} className="float-animation" />
                <div className="absolute inset-0 bg-[#0078d4]/30 rounded-full blur-2xl" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Mensagem Final
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
              Microsoft Azure não deve ser tratado apenas como{' '}
              <span className="text-[#50a3e0] font-semibold">"infraestrutura na nuvem"</span>,
              mas como uma{' '}
              <span className="text-[#0078d4] font-semibold">plataforma corporativa completa</span>{' '}
              para modernização, governança, integração, dados e inteligência artificial em escala.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Identidade', 'Governança', 'Híbrido', 'Segurança', 'Dados', 'IA', 'DevOps', 'Compliance'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2 rounded-full text-sm font-medium border border-[#0078d4]/40 text-[#50a3e0] bg-[#0078d4]/10"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-gray-600 text-sm"
        >
          Documentação baseada em fontes oficiais Microsoft — Azure Docs, Microsoft Learn e Azure Blog.
        </motion.div>
      </div>
    </section>
  );
}
