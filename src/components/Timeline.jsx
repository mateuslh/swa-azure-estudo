import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const events = [
  {
    year: '2008',
    title: 'Anúncio Público',
    desc: 'Microsoft apresenta o "Windows Azure" na Professional Developers Conference em Los Angeles. Ray Ozzie, Chief Software Architect, posiciona a plataforma como infraestrutura escalável para aplicações na nuvem.',
    tag: 'PDC 2008',
    color: '#0078d4',
  },
  {
    year: '2010',
    title: 'Disponibilidade Geral',
    desc: '1º de fevereiro — Windows Azure e SQL Azure entram em produção com SLA oficial para clientes e parceiros. A Microsoft transforma sua estratégia de software instalado para cloud.',
    tag: 'GA',
    color: '#50a3e0',
  },
  {
    year: '2014',
    title: 'Rebranding: Microsoft Azure',
    desc: 'A plataforma deixa de se chamar "Windows Azure" e passa a "Microsoft Azure", refletindo a expansão para workloads Linux, open source e não-Windows.',
    tag: 'Rebranding',
    color: '#00bcf2',
  },
  {
    year: '2016',
    title: 'Expansão Global & Híbrido',
    desc: 'Azure Arc e Azure Stack consolidam a estratégia híbrida. Expansão para mais de 50 regiões globais. Lançamento de AKS, integração com GitHub.',
    tag: 'Híbrido',
    color: '#7fba00',
  },
  {
    year: '2023',
    title: 'Era da IA Corporativa',
    desc: 'Azure OpenAI Service em GA. Microsoft Copilot integrado a todo o ecossistema. Investimento bilionário na OpenAI. Microsoft Foundry como plataforma unificada de IA enterprise.',
    tag: 'AI Era',
    color: '#a020f0',
  },
  {
    year: 'Hoje',
    title: 'Plataforma Completa',
    desc: 'Mais de 200 serviços, 70+ regiões, posição de liderança em IA corporativa, identidade e ambientes híbridos. Segunda maior cloud pública do mundo.',
    tag: '2025+',
    color: '#ff6b35',
  },
];

export default function Timeline() {
  return (
    <section id="origem" className="py-24 section-bg-1 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Origem do Azure"
          title="Uma"
          highlight="Jornada de 15+ Anos"
          subtitle="De plataforma Windows-only em 2008 até a maior suíte cloud corporativa do mundo."
        />

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0078d4] via-[#50a3e0] to-[#a020f0]" />

          <div className="space-y-12">
            {events.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start gap-8 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } flex-row`}
              >
                <div className={`hidden sm:flex flex-1 ${i % 2 === 0 ? 'justify-end pr-8' : 'pl-8'}`}>
                  {i % 2 === 0 && (
                    <div className="glass-card rounded-2xl p-6 max-w-sm text-right">
                      <div
                        className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3"
                        style={{ background: `${event.color}20`, color: event.color }}
                      >
                        {event.tag}
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">{event.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{event.desc}</p>
                    </div>
                  )}
                </div>

                <div className="relative flex-shrink-0 ml-0 sm:ml-0">
                  <motion.div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm z-10"
                    style={{ background: `${event.color}20`, border: `2px solid ${event.color}`, color: event.color }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {event.year === 'Hoje' ? '★' : event.year.slice(-2)}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${event.color}` }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </motion.div>
                </div>

                <div className={`sm:hidden flex-1`}>
                  <div className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${event.color}20`, color: event.color }}
                      >
                        {event.year} · {event.tag}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{event.desc}</p>
                  </div>
                </div>

                <div className={`hidden sm:flex flex-1 ${i % 2 !== 0 ? 'justify-start pl-8' : 'pr-8'}`}>
                  {i % 2 !== 0 && (
                    <div className="glass-card rounded-2xl p-6 max-w-sm">
                      <div
                        className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3"
                        style={{ background: `${event.color}20`, color: event.color }}
                      >
                        {event.tag}
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">{event.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{event.desc}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
