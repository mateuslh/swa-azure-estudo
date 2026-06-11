import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

const hierarchyLayers = [
  {
    label: 'Tenant (Microsoft Entra ID)',
    color: '#a020f0',
    bg: 'rgba(160,32,240,0.08)',
    border: 'rgba(160,32,240,0.35)',
    desc: 'Raiz de identidade — diretório único da organização',
    width: '100%',
    details: [
      'Um tenant = um diretório Entra ID para toda a organização',
      'Contém todos os usuários, grupos, service principals e aplicações registradas',
      'Global admins têm acesso irrestrito — mínimo de 2 contas break-glass',
      'Tenant ID fixo e global — não muda com renomeação de domínio',
    ],
  },
  {
    label: 'Management Groups',
    color: '#0078d4',
    bg: 'rgba(0,120,212,0.08)',
    border: 'rgba(0,120,212,0.35)',
    desc: 'Agrupamento lógico para governança em escala',
    width: '88%',
    details: [
      'Hierarquia de até 6 níveis abaixo do root Management Group',
      'Azure Policy e RBAC aplicados aqui herdam para todas as subscriptions filhas',
      'Root MG contém todas as subscriptions — ideal para policies globais (compliance base)',
      'Separar Platform (infra) de Landing Zones (workloads) na hierarquia',
    ],
  },
  {
    label: 'Subscriptions',
    color: '#50a3e0',
    bg: 'rgba(80,163,224,0.08)',
    border: 'rgba(80,163,224,0.35)',
    desc: 'Unidade de billing, quota e isolamento administrativo',
    width: '76%',
    details: [
      'Unidade de fatura — cada subscription tem um billing owner e cost center',
      'Limites de quota por subscription (ex: 20.000 vCPUs por região) — scale-out via múltiplas subs',
      'Isolamento de blast radius — falha em uma subscription não afeta outras',
      'Padrão: separar prod / non-prod / sandbox em subscriptions distintas',
    ],
  },
  {
    label: 'Resource Groups',
    color: '#00bcf2',
    bg: 'rgba(0,188,242,0.08)',
    border: 'rgba(0,188,242,0.35)',
    desc: 'Container lógico com ciclo de vida comum',
    width: '63%',
    details: [
      'Todos os recursos de um RG são criados/deletados juntos — lifecycle coupling',
      'RBAC no RG: escopo mínimo para permissões de time — não dar Owner na subscription',
      'Região do RG é apenas metadado — recursos podem estar em regiões diferentes',
      'Locks: ReadOnly ou Delete para proteger recursos críticos contra mudança acidental',
    ],
  },
  {
    label: 'Resources',
    color: '#7fba00',
    bg: 'rgba(127,186,0,0.08)',
    border: 'rgba(127,186,0,0.35)',
    desc: 'Instâncias concretas de serviços Azure',
    width: '50%',
    details: [
      'Toda instância tem um Resource ID único: /subscriptions/{sub}/resourceGroups/{rg}/providers/{provider}/{type}/{name}',
      'Tags: key-value para billing, ownership, ambiente, criticidade — obrigatórias via Policy',
      'ARM templates ou Bicep para provisionamento reproduzível e auditável',
      'Activity Log registra quem fez o quê em cada recurso — 90 dias por padrão',
    ],
  },
];

const armConcepts = [
  {
    title: 'Azure Resource Manager (ARM)',
    icon: '⚙️',
    color: '#0078d4',
    desc: 'Plano de controle unificado para todos os recursos. Toda operação — via portal, CLI, SDK, Terraform ou Bicep — passa pelo ARM. Garante consistência, RBAC e auditoria em todas as interações.',
    points: [
      'API REST idempotente: PUT no mesmo recurso é seguro — cria se não existe, atualiza se existe',
      'Authenticação via Entra ID em todas as operações — sem bypass possível',
      'Templates ARM/Bicep: estado declarativo versionável em Git como IaC',
      'Resource locking via ARM: impede delete acidental de recursos críticos',
    ],
  },
  {
    title: 'RBAC (Role-Based Access Control)',
    icon: '🔑',
    color: '#ff6b35',
    desc: 'Controle de acesso granular em qualquer escopo da hierarquia. Segue princípio de menor privilégio. Roles podem ser herdadas (Management Group → Subscription → RG → Resource).',
    points: [
      'Built-in roles: Owner, Contributor, Reader + 90+ específicos por serviço',
      'Custom roles: combinação granular de actions para permissão exata necessária',
      'Scope: atribuir no escopo MAIS RESTRITO possível — never Owner em subscription em produção',
      'PIM (Privileged Identity Management): roles privilegiados just-in-time com aprovação e MFA',
    ],
  },
  {
    title: 'Azure Policy',
    icon: '📋',
    color: '#a020f0',
    desc: 'Governança declarativa aplicada automaticamente. Define o que pode e não pode existir no ambiente. Primeiro Audit para entender o estado atual, depois Deny para prevenir desvios.',
    points: [
      'Effects: Audit (log), Deny (bloquear criação), Modify (adicionar tag/config), DeployIfNotExists',
      'Iniciativas: agrupa policies relacionadas — ex: "Require tags", "CIS Benchmark Level 1"',
      'Compliance Dashboard: percentual de conformidade por escopo e iniciativa',
      'Remediation: corrige recursos existentes não-conformes de forma controlada',
    ],
  },
  {
    title: 'Naming & Tagging',
    icon: '🏷️',
    color: '#7fba00',
    desc: 'Convenção de nomes e tags obrigatórias são infraestrutura de governança. Sem padrão, o ambiente vira caos em 6 meses. Tags são a base para alocação de custo e automação.',
    points: [
      'Padrão de nome: {tipo}-{produto}-{ambiente}-{região}-{número} ex: vm-erp-prod-brazilsouth-001',
      'Tags obrigatórias via Policy: environment, product, cost-center, owner, criticality',
      'Resource Group como unidade de billing quando tags granulares não são suficientes',
      'Azure Cost Management usa tags para chargeback e showback por time/produto',
    ],
  },
];

const subscriptionPatterns = [
  { name: 'Plataforma', subs: ['Connectivity', 'Identity', 'Management'], color: '#0078d4', desc: 'Infraestrutura central compartilhada: hub de rede, ExpressRoute, DNS, monitoramento central.' },
  { name: 'Landing Zones', subs: ['Produção', 'NonProd', 'Sandbox'], color: '#50a3e0', desc: 'Subscriptions de workload. Produção separada para blast radius. Sandbox com orçamento fixo para experimentos.' },
  { name: 'Casos especiais', subs: ['CorpIT', 'Online', 'SAP/Legacy'], color: '#7fba00', desc: 'Subscriptions dedicadas para workloads com requisitos únicos de rede, compliance ou governance.' },
];

export default function Architecture() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [activeARM, setActiveARM] = useState(0);

  return (
    <section id="arquitetura" className="py-24 section-bg-2 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Visão Arquitetural"
          title="Modelo de"
          highlight="Organização Azure"
          subtitle="Azure Resource Manager como plano de controle unificado. Hierarquia com herança de políticas, RBAC e billing — clique nas camadas para ver detalhes."
        />

        {/* Hierarquia + detalhe */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#0078d4]/20 border border-[#0078d4]/40 flex items-center justify-center text-[#0078d4] text-xs">H</span>
              Hierarquia de Recursos
              <span className="text-xs text-gray-500 font-normal ml-1">— clique para detalhar</span>
            </h3>

            <div className="flex flex-col items-center space-y-2">
              {hierarchyLayers.map((layer, i) => (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative w-full flex justify-center"
                >
                  <motion.button
                    onClick={() => setSelectedLayer(selectedLayer === i ? null : i)}
                    className="rounded-xl px-5 py-3 w-full text-left transition-all duration-200 cursor-pointer"
                    style={{
                      width: layer.width,
                      background: selectedLayer === i ? `${layer.color}18` : layer.bg,
                      border: `1px solid ${selectedLayer === i ? layer.color : layer.border}`,
                      boxShadow: selectedLayer === i ? `0 0 20px ${layer.color}25` : 'none',
                    }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-sm" style={{ color: layer.color }}>{layer.label}</span>
                      <span className="text-gray-500 text-xs hidden sm:block">{layer.desc}</span>
                      <span className="text-gray-600 text-xs flex-shrink-0">{selectedLayer === i ? '▲' : '▼'}</span>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {selectedLayer === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-full left-0 right-0 z-10 mt-1 overflow-hidden"
                        style={{ width: layer.width, marginLeft: 'auto', marginRight: 'auto' }}
                      >
                        <div
                          className="rounded-xl p-4"
                          style={{ background: `${layer.color}10`, border: `1px solid ${layer.color}30` }}
                        >
                          <ul className="space-y-1.5">
                            {layer.details.map((d, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                                <span style={{ color: layer.color }} className="flex-shrink-0 mt-0.5">▸</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {i < hierarchyLayers.length - 1 && (
                    <motion.div
                      className="absolute text-gray-600 text-xs"
                      style={{ bottom: selectedLayer === i ? '-36px' : '-18px' }}
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      ↓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-8 p-5 rounded-xl"
              style={{ background: 'rgba(0,120,212,0.06)', border: '1px solid rgba(0,120,212,0.2)' }}
            >
              <div className="text-xs text-[#50a3e0] font-mono font-semibold mb-2">Resource ID — formato único de cada recurso</div>
              <code className="text-[10px] text-gray-500 leading-relaxed break-all block">
                /subscriptions/<span className="text-[#0078d4]">{'{sub-id}'}</span>/resourceGroups/<span className="text-[#50a3e0]">{'{rg-nome}'}</span>/providers/Microsoft.Compute/virtualMachines/<span className="text-[#7fba00]">{'{vm-nome}'}</span>
              </code>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#0078d4]/20 border border-[#0078d4]/40 flex items-center justify-center text-[#0078d4] text-xs">C</span>
              Conceitos Fundamentais
            </h3>

            <div className="flex gap-2 mb-4 flex-wrap">
              {armConcepts.map((c, i) => (
                <button
                  key={c.title}
                  onClick={() => setActiveARM(i)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${activeARM === i ? '' : 'text-gray-500 bg-white/5 hover:bg-white/8'}`}
                  style={activeARM === i ? { background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40` } : { border: '1px solid transparent' }}
                >
                  {c.icon} {c.title.split(' (')[0].split(' ')[0]} {c.title.split(' ')[1] || ''}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {armConcepts[activeARM] && (() => {
                const c = armConcepts[activeARM];
                return (
                  <motion.div
                    key={activeARM}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl p-6"
                    style={{ background: `${c.color}08`, border: `1px solid ${c.color}25` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{c.icon}</span>
                      <h4 className="text-white font-bold">{c.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{c.desc}</p>
                    <ul className="space-y-2">
                      {c.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
                          <span style={{ color: c.color }} className="flex-shrink-0 mt-0.5">▸</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Padrões de subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-white text-lg font-bold mb-6 text-center">Padrões de Design de Subscription</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {subscriptionPatterns.map((pattern, i) => (
              <motion.div
                key={pattern.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-5"
                style={{ borderTop: `3px solid ${pattern.color}` }}
              >
                <div className="font-bold text-white mb-2">{pattern.name}</div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {pattern.subs.map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded"
                      style={{ background: `${pattern.color}15`, color: pattern.color, border: `1px solid ${pattern.color}30` }}>
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{pattern.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Landing Zone code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-7"
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h3 className="text-white font-bold text-lg">Estrutura de Landing Zone Recomendada pela Microsoft</h3>
            <span className="text-xs text-[#50a3e0] bg-[#0078d4]/10 px-3 py-1 rounded-full border border-[#0078d4]/30">
              Cloud Adoption Framework
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-[#50a3e0] font-mono font-semibold mb-3">Hierarquia de Management Groups</div>
              <pre className="text-xs text-gray-400 leading-relaxed font-mono overflow-x-auto">{`Tenant (Entra ID)
└── Root Management Group
    ├── Platform
    │   ├── Connectivity   # hub VNet, ExpressRoute, DNS
    │   ├── Identity       # DC controllers, Entra DS
    │   └── Management     # monitoring, security, backup
    ├── Landing Zones
    │   ├── Corp (prod/nonprod)
    │   ├── Online (pub/nonprod)
    │   └── SAP / Legacy
    ├── Sandbox            # budget fixo, sem acesso prod
    └── Decommissioned     # recursos em desativação`}</pre>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-[#50a3e0] font-mono font-semibold mb-3">Políticas Mínimas por Camada</div>
              {[
                { scope: 'Root MG', policy: 'Require tags: environment, owner, cost-center', color: '#a020f0' },
                { scope: 'Platform', policy: 'Deny public IPs em subnets de infraestrutura', color: '#0078d4' },
                { scope: 'Connectivity', policy: 'Audit e bloquear rotas que bypassam o firewall hub', color: '#50a3e0' },
                { scope: 'Landing Zones', policy: 'Require Private Endpoints para Storage e SQL', color: '#00bcf2' },
                { scope: 'Produção', policy: 'Deny criação sem Availability Zone onde suportado', color: '#7fba00' },
                { scope: 'Sandbox', policy: 'Budget $X/mês — auto-shutdown de VMs às 20h', color: '#ff6b35' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <span className="font-mono font-semibold flex-shrink-0 mt-0.5" style={{ color: item.color }}>{item.scope}</span>
                  <span className="text-gray-500">→ {item.policy}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
