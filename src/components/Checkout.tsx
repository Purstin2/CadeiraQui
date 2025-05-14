import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CreditCard } from 'lucide-react';
import Header from './Header';
import { useQuiz } from '../context/QuizContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlan, email, setEmail } = useQuiz();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    userEmail: email || ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'userEmail') {
      setEmail(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/success');
    }, 2000);
  };

  const plans = {
    starter: { name: 'Plano Essencial', price: 'R$ 97' },
    complete: { name: 'Plano Completo', price: 'R$ 147' },
    premium: { name: 'Plano VIP', price: 'R$ 297' }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
      <Header />
      <main className="flex-1 px-5 py-8">
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            className="text-2xl font-bold text-[#2D1441] mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Finalizar Compra
          </motion.h1>
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <motion.form 
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="font-semibold text-lg text-[#2D1441] mb-4">Informações Pessoais</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="userEmail"
                      value={formData.userEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none"
                    />
                  </div>
                </div>
                
                <h2 className="font-semibold text-lg text-[#2D1441] mb-4">Informações de Pagamento</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none"
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data de Expiração</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7432B4] focus:border-[#7432B4] outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <Lock className="w-4 h-4" />
                  <span>Pagamento 100% seguro</span>
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all hover:shadow-lg disabled:opacity-70"
                >
                  {isProcessing ? 'Processando...' : 'Finalizar Compra'}
                </button>
              </motion.form>
            </div>
            
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-md mb-4">
                <h2 className="font-semibold text-lg text-[#2D1441] mb-4">Resumo do Pedido</h2>
                
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Plano:</span>
                    <span className="font-medium">{selectedPlan ? plans[selectedPlan].name : 'Plano Completo'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor:</span>
                    <span className="font-medium text-[#2D1441]">{selectedPlan ? plans[selectedPlan].price : 'R$ 147'}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-[#2D1441]">{selectedPlan ? plans[selectedPlan].price : 'R$ 147'}</span>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-700 font-medium mb-1">Garantia de Satisfação de 30 dias</p>
                    <p className="text-xs text-gray-600">Se não estiver satisfeito, devolveremos seu dinheiro. Sem perguntas.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;