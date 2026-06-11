import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiLoader } from 'react-icons/fi';

const API = import.meta.env.VITE_API_URL ?? '';

const empty = { nome: '', idade: '', tecnologia_que_o_gledson_ama: '' };

export default function Pessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function fetchPessoas() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/pessoas`);
      setPessoas(await res.json());
    } catch {
      setError('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPessoas(); }, []);

  function openCreate() {
    setForm(empty);
    setEditId(null);
    setShowForm(true);
    setError('');
  }

  function openEdit(p) {
    setForm({ nome: p.nome, idade: p.idade, tecnologia_que_o_gledson_ama: p.tecnologia_que_o_gledson_ama });
    setEditId(p.id);
    setShowForm(true);
    setError('');
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
    setForm(empty);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const url = editId ? `${API}/pessoas/${editId}` : `${API}/pessoas`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, idade: Number(form.idade) }),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchPessoas();
      closeForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Deletar essa pessoa?')) return;
    try {
      await fetch(`${API}/pessoas/${id}`, { method: 'DELETE' });
      setPessoas(p => p.filter(x => x.id !== id));
    } catch {
      setError('Erro ao deletar.');
    }
  }

  return (
    <div className="min-h-screen bg-[#050d1a] text-white pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Pessoas</h1>
            <p className="text-gray-400 text-sm mt-1">Tabela <code className="text-[#50a3e0]">pessoas</code> — PostgreSQL via Azure Container App</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#0078d4] hover:bg-[#106ebe] rounded-lg text-sm font-medium transition-colors"
          >
            <FiPlus size={16} />
            Nova pessoa
          </motion.button>
        </div>

        {/* Modal de formulário */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={e => e.target === e.currentTarget && closeForm()}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0a1628] border border-[#0078d4]/30 rounded-xl p-6 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold">{editId ? 'Editar pessoa' : 'Nova pessoa'}</h2>
                  <button onClick={closeForm} className="text-gray-500 hover:text-white transition-colors">
                    <FiX size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'nome', label: 'Nome', type: 'text', placeholder: 'Ex: Gledson' },
                    { key: 'idade', label: 'Idade', type: 'number', placeholder: 'Ex: 30' },
                    { key: 'tecnologia_que_o_gledson_ama', label: 'Tecnologia que o Gledson ama', type: 'text', placeholder: 'Ex: Azure' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm text-gray-400 mb-1">{label}</label>
                      <input
                        type={type}
                        required
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        className="w-full bg-[#071525] border border-[#0078d4]/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0078d4] transition-colors"
                      />
                    </div>
                  ))}

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={closeForm} className="flex-1 py-2 rounded-lg border border-gray-700 text-sm text-gray-400 hover:text-white transition-colors">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-2 rounded-lg bg-[#0078d4] hover:bg-[#106ebe] text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {submitting ? <FiLoader className="animate-spin" size={14} /> : <FiCheck size={14} />}
                      {editId ? 'Salvar' : 'Criar'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabela */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-500">
            <FiLoader className="animate-spin mr-2" size={18} /> Carregando...
          </div>
        ) : pessoas.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>Nenhuma pessoa cadastrada ainda.</p>
            <button onClick={openCreate} className="mt-3 text-[#50a3e0] hover:underline text-sm">Adicionar a primeira</button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#0078d4]/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#0078d4]/20 bg-[#071525]">
                  {['ID', 'Nome', 'Idade', 'Tecnologia que o Gledson ama', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {pessoas.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-[#0078d4]/10 hover:bg-[#0078d4]/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-500">{p.id}</td>
                      <td className="px-4 py-3 font-medium">{p.nome}</td>
                      <td className="px-4 py-3 text-gray-300">{p.idade}</td>
                      <td className="px-4 py-3 text-[#50a3e0]">{p.tecnologia_que_o_gledson_ama}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => openEdit(p)} className="p-1.5 text-gray-500 hover:text-[#50a3e0] hover:bg-[#0078d4]/10 rounded transition-colors">
                            <FiEdit2 size={14} />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
