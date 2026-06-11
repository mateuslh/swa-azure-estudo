import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AzureIcon from './AzureIcon';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  { href: '#origem', label: 'Origem' },
  { href: '#arquitetura', label: 'Arquitetura' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#vantagens', label: 'Vantagens' },
  { href: '#comparativo', label: 'Comparativo' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#precos', label: 'Preços' },
  { href: '#governanca', label: 'Governança' },
  { href: '#conclusao', label: 'Conclusão' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050d1a]/95 backdrop-blur-md border-b border-[#0078d4]/20 shadow-lg shadow-[#0078d4]/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <motion.a
          href="#"
          className="flex items-center gap-2 font-bold text-white"
          whileHover={{ scale: 1.05 }}
        >
          <AzureIcon size={28} />
          <span className="shimmer-text text-lg font-bold">Azure</span>
          <span className="text-gray-400 text-sm hidden sm:block">| Arquitetura & Estratégia</span>
        </motion.a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-[#50a3e0] rounded-md hover:bg-[#0078d4]/10 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              onClick={() => setActive(link.href)}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <button
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#071525]/98 border-b border-[#0078d4]/20"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-6 py-3 text-gray-400 hover:text-[#50a3e0] hover:bg-[#0078d4]/10 transition-all"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
