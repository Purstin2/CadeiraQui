import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Lock, 
  Award, 
  Users, 
  Calendar, 
  Star 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';

const PlanReady: React.FC = () => {
  const navigate = useNavigate();
  const email = "seuemail@gmail.com";
  const [badgeAnimationComplete, setBadgeAnimationComplete] = useState(false);
  const [showTestimonial, setShowTestimonial] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('Hoje');
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  
  // Pegando os dados do quiz
  const { 
    ageRange, 
    sex, 
    goals, 
    bodyType, 
    dreamBody, 
    chairYogaExperience, 
    availableTime,
    exerciseStyle = [] // Valor padrão para evitar erros
  } = useQuiz();

  // Sistema de arquétipos personalizado
  const userArchetype = useMemo(() => {
    // Definindo possíveis arquétipos
    const archetypes = [
      {
        id: 'wellness-seeker',
        title: 'Buscador de Bem-Estar',
        icon: '🌿',
        matches: (data) => {
          return data.goals.some(g => g.id === 'manage-mood' && g.selected) || 
                 data.goals.some(g => g.id === 'balance-hormones' && g.selected);
        }
      },
      {
        id: 'body-transformer',
        title: 'Transformador Físico',
        icon: '🔥',
        matches: (data) => {
          return data.goals.some(g => g.id === 'lose-weight' && g.selected) && 
                 data.dreamBody === 'fit';
        }
      },
      {
        id: 'mobility-master',
        title: 'Mestre da Mobilidade',
        icon: '🌊',
        matches: (data) => {
          return data.goals.some(g => g.id === 'improve-mobility' && g.selected);
        }
      },
      {
        id: 'balanced-achiever',
        title: 'Conquistador Equilibrado',
        icon: '⚖️',
        matches: (data) => {
          return data.dreamBody === 'athletic' || 
                 (data.exerciseStyle && data.exerciseStyle.includes('strength'));
        }
      },
      {
        id: 'vitality-seeker',
        title: 'Buscador de Vitalidade',
        icon: '💫',
        matches: (data) => {
          return data.goals.some(g => g.id === 'improve-heart' && g.selected) || 
                 data.ageRange === '65+';
        }
      },
      {
        id: 'mindful-mover',
        title: 'Movimentador Consciente',
        icon: '🧘',
        matches: (data) => {
          return data.chairYogaExperience === 'regular' || 
                 (data.exerciseStyle && data.exerciseStyle.includes('yoga'));
        }
      },
      {
        id: 'busy-optimizer',
        title: 'Otimizador Ocupado',
        icon: '⏱️',
        matches: (data) => {
          return data.availableTime === 'less15' || data.availableTime === '15to30';
        }
      },
      {
        id: 'glow-enthusiast',
        title: 'Entusiasta do Brilho',
        icon: '✨',
        matches: (data) => {
          return data.goals.some(g => g.id === 'enhance-skin' && g.selected);
        }
      },
      {
        id: 'harmony-seeker',
        title: 'Buscador da Harmonia',
        icon: '☯️',
        matches: (data) => {
          return data.dreamBody === 'content';
        }
      },
      {
        id: 'curvy-confident',
        title: 'Curvilíneo Confiante',
        icon: '💪',
        matches: (data) => {
          return data.bodyType === 'curvy' || data.bodyType === 'plus';
        }
      }
    ];

    // Criando um objeto com os dados relevantes para a correspondência
    const userData = {
      ageRange, 
      sex, 
      goals, 
      bodyType, 
      dreamBody, 
      chairYogaExperience, 
      availableTime,
      exerciseStyle
    };

    // Encontrar todos os arquétipos que correspondem
    const matchingArchetypes = archetypes.filter(archetype => archetype.matches(userData));
    
    // Se nenhum arquétipo corresponder, use um padrão
    if (matchingArchetypes.length === 0) {
      return {
        title: 'Yoguista Dedicado',
        icon: '🌟'
      };
    }
    
    // Pegar o primeiro arquétipo correspondente (prioridade pela ordem da lista)
    const primaryArchetype = matchingArchetypes[0];
    
    return {
      title: primaryArchetype.title,
      icon: primaryArchetype.icon
    };
  }, [ageRange, sex, goals, bodyType, dreamBody, chairYogaExperience, availableTime, exerciseStyle]);

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#7432B4', '#9747FF', '#E9D5FF']
    });
    
    const testimonialTimer = setTimeout(() => {
      setShowTestimonial(true);
    }, 2000);
    
    return () => clearTimeout(testimonialTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBadgeAnimationComplete = () => {
    setBadgeAnimationComplete(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#7432B4', '#9747FF']
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        <main className="flex-1 px-4 py-3">
          <div className="max-w-md mx-auto flex flex-col items-center">
            {/* Tab de Check modificado */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-1"
            >
              <div className="bg-purple-100 text-[#7432B4] px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>SEU PLANO FOI CRIADO</span>
              </div>
            </motion.div>
            
            {/* Arquétipo personalizado redesenhado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className="text-center mb-4 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-2 rounded-lg border border-purple-200"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">{userArchetype.icon}</span>
                <h2 className="text-base font-semibold text-[#2D1441]">
                  {userArchetype.title}
                </h2>
              </div>
            </motion.div>

            {/* Ícone de sucesso */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
              onAnimationComplete={handleBadgeAnimationComplete}
              className="mb-3 relative"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF4D4D" />
                      <stop offset="50%" stopColor="#FF9D4D" />
                      <stop offset="100%" stopColor="#FFCF4D" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <g filter="url(#glow)">
                    <circle cx="50" cy="50" r="45" fill="url(#fireGradient)" />
                    <motion.path 
                      d="M 40 50 L 45 55 L 60 40" 
                      stroke="white" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    />
                  </g>
                </svg>
              </div>
            </motion.div>

            {/* Mensagem de sucesso */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-4"
            >
              <h3 className="text-lg font-bold text-[#2D1441] mb-1">
                Método adaptado ao seu corpo criado!
              </h3>
              <p className="text-gray-600 text-xs">
                Enviaremos seu plano ao seu email
              </p>
            </motion.div>

            {/* Email e countdown agrupados */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full mb-4"
            >
              <label className="block text-xs font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <div className="relative mb-2">
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg text-gray-500 opacity-70 text-sm focus:outline-none focus:ring-2 focus:ring-[#7432B4]"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setConfirmationSent(true)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md flex items-center gap-1"
                >
                  <span>{confirmationSent ? "Enviado!" : "Confirmar"}</span>
                  {confirmationSent && <CheckCircle className="w-3 h-3 text-green-500" />}
                </motion.button>
              </div>
              {confirmationSent && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs text-green-600 mb-2"
                >
                  Link de confirmação enviado ao seu email.
                </motion.p>
              )}
              <div className="text-xs text-center text-gray-500">
                <span>Acesso ao plano expira em </span>
                <motion.span
                  className="font-semibold text-purple-700"
                  animate={{ scale: [1, 1.1, 1], color: ["#7432B4", "#ff4d4d", "#7432B4"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                >
                  {formatTime(timeLeft)}
                </motion.span>
              </div>
            </motion.div>

            {/* Comunidade ativa simplificada */}
            <AnimatePresence>
              {badgeAnimationComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full mb-4 bg-purple-50 rounded-lg p-3 border border-purple-100 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-purple-700" />
                    <span className="font-semibold text-purple-900">24.8k membros</span>
                  </div>
                  <span>87% satisfação</span>
                  <span>4.8/5 estrelas</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Calendário de início */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full mb-4 bg-white rounded-lg p-3 border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={14} className="text-purple-700" />
                <h4 className="font-semibold text-[#2D1441] text-sm">Programar início</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Hoje', 'Amanhã'].map((day) => (
                  <motion.button
                    key={day}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => setSelectedStartDate(day)}
                    className={`p-1.5 rounded-lg text-xs text-center ${
                      selectedStartDate === day ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {day}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Testemunho compacto */}
            <AnimatePresence>
              {showTestimonial && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full mb-4 bg-white p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 italic mb-2">
                    "Em 3 semanas, minhas dores nas costas sumiram e perdi peso!"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=24&h=24&q=80" 
                        alt="Patrícia M." 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-[#2D1441]">Patrícia M.</div>
                      <div className="text-[10px] text-gray-500">42 anos, SP</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nota de privacidade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-start gap-2 mb-4 w-full text-[10px] text-gray-500"
            >
              <Lock className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
              <p>Sua privacidade está protegida. Não compartilhamos seus dados.</p>
            </motion.div>

            {/* Botão principal */}
            <motion.button
              onClick={() => setTimeout(() => navigate('/sales'), 200)}
              className="w-full relative bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold text-base py-3 px-6 rounded-full hover:from-[#6822A6] hover:to-[#8740E6] transition-colors shadow overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.span 
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: [0, -15, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="absolute left-0 top-0 w-full h-full bg-white/10 skew-x-20 animate-shimmer"></div>
              </motion.span>
              <span className="relative z-10">Ver meu plano</span>
            </motion.button>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default PlanReady;