import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flame, Clock, Award, Star, Shield, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';

const CreatingPlan: React.FC = () => {
  const navigate = useNavigate();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const { goals, bodyType, dreamBody } = useQuiz();
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  
  // Inicializa o contexto de áudio na primeira interação do usuário
  useEffect(() => {
    // Só criamos o contexto de áudio uma vez
    if (!audioContext.current) {
      // Criamos o contexto em uma função que será chamada no primeiro clique ou interação do usuário
      const setupAudio = () => {
        // Cria o contexto de áudio
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        // Remove o event listener depois que o áudio estiver configurado
        document.removeEventListener('click', setupAudio);
      };
      
      // Adiciona o event listener para iniciar o áudio quando o usuário interagir pela primeira vez
      document.addEventListener('click', setupAudio);
      
      // Limpeza quando o componente desmontar
      return () => {
        document.removeEventListener('click', setupAudio);
        if (audioContext.current && audioContext.current.state !== 'closed') {
          audioContext.current.close();
        }
      };
    }
  }, []);
  
  // Função para tocar um som de milestone atingido
  const playMilestoneSound = (milestoneIndex: number) => {
    if (!audioContext.current) return;
    
    try {
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();
      
      // Diferentes frequências baseadas no milestone (notas musicais ascendentes)
      const frequencies = [330, 392, 440, 494, 523]; // Notas musicais Mi, Sol, Lá, Si, Dó
      oscillator.frequency.value = frequencies[milestoneIndex % frequencies.length];
      
      // Configurar o tipo de onda e conectar ao nó de ganho (volume)
      oscillator.type = 'sine';
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);
      
      // Configurar envelope de amplitude (ADSR simplificado)
      const now = audioContext.current.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      // Iniciar e parar o oscilador
      oscillator.start(now);
      oscillator.stop(now + 0.5);
    } catch (error) {
      console.error("Erro ao tocar som:", error);
    }
  };
  
  // Função para tocar som de conclusão/sucesso
  const playSuccessSound = () => {
    if (!audioContext.current) return;
    
    try {
      // Criamos vários osciladores para um acorde
      const chord = [523.25, 659.25, 783.99]; // Dó, Mi, Sol (Acorde de Dó maior)
      
      chord.forEach((frequency, index) => {
        const oscillator = audioContext.current!.createOscillator();
        const gainNode = audioContext.current!.createGain();
        
        oscillator.frequency.value = frequency;
        oscillator.type = index === 0 ? 'sine' : 'triangle';
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.current!.destination);
        
        // Volume mais alto e duração mais longa para o som de sucesso
        const now = audioContext.current!.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
        
        // Adiciona um pequeno atraso para o efeito de arpejo
        const startTime = now + index * 0.08;
        oscillator.start(startTime);
        oscillator.stop(startTime + 1.5);
      });
    } catch (error) {
      console.error("Erro ao tocar som de sucesso:", error);
    }
  };
  
  // Função para tocar som de pop suave quando aparece um card
  const playPopSound = (delay = 0) => {
    if (!audioContext.current) return;
    
    setTimeout(() => {
      try {
        const oscillator = audioContext.current!.createOscillator();
        const gainNode = audioContext.current!.createGain();
        
        oscillator.frequency.value = 800 + Math.random() * 400;
        oscillator.type = 'sine';
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.current!.destination);
        
        const now = audioContext.current!.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.03, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        
        oscillator.start(now);
        oscillator.stop(now + 0.15);
      } catch (error) {
        console.error("Erro ao tocar som pop:", error);
      }
    }, delay);
  };
  
  // Configuração de milestones para feedback visual
  const milestones = [
    { threshold: 25, title: "Analisando seu perfil...", icon: <Flame className="text-orange-500" /> },
    { threshold: 50, title: "Criando seu plano personalizado...", icon: <Clock className="text-purple-500" /> },
    { threshold: 75, title: "Otimizando exercícios para seu tipo corporal...", icon: <Shield className="text-blue-500" /> },
    { threshold: 95, title: "Finalizando seu plano...", icon: <Trophy className="text-yellow-500" /> },
    { threshold: 100, title: "Plano concluído!", icon: <Award className="text-green-500" /> },
  ];
  
  // Dados dos exercícios adaptados conforme respostas
  const exercises = [
    {
      title: "Fase 1",
      description: "Exercícios de cadeira diários para fortalecer o core e melhorar a postura",
      difficulty: 5,
      icon: <Flame className="text-orange-500" />,
      day: "Dias 1-7"
    },
    {
      title: "Fase 2",
      description: "Progressão para movimentos mais desafiadores que auxiliam na queima calórica e força",
      difficulty: bodyType === 'plus' ? 3 : 4,
      icon: <Clock className="text-purple-500" />,
      day: "Dias 8-14"
    },
    {
      title: "Fase 3",
      description: dreamBody === 'fit' ? "Exercícios avançados para tonificação muscular e definição" : "Movimentos equilibrados para bem-estar geral e mobilidade",
      difficulty: dreamBody === 'fit' ? 5 : 3,
      icon: <Trophy className="text-yellow-500" />,
      day: "Dias 15-21"
    }
  ];

  // Animação de partículas para celebração
  const triggerConfetti = () => {
    setShowConfetti(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#7432B4', '#9747FF', '#FFD700']
    });
    
    // Toca o som de sucesso quando o confetti aparecer
    playSuccessSound();
  };
  
  // Animação de progresso e redirecionamento sincronizado
  useEffect(() => {
    // Tempo total da animação: 5 segundos 
    const totalTime = 5000;
    const interval = 50; // Atualiza a cada 50ms para animação mais suave
    const steps = totalTime / interval;
    const increment = 100 / steps;
    
    let step = 0;
    
    const animationInterval = setInterval(() => {
      step++;
      const newValue = Math.min(Math.round(step * increment), 100);
      setProgressPercentage(newValue);
      
      // Atualiza o milestone atual baseado no progresso
      for (let i = milestones.length - 1; i >= 0; i--) {
        if (newValue >= milestones[i].threshold && currentMilestone < i) {
          setCurrentMilestone(i);
          
          // Toca som quando atingir um novo milestone
          playMilestoneSound(i);
          
          // Pequeno confetti ao atingir cada milestone exceto o final
          if (i < milestones.length - 1) {
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.6 },
              colors: ['#7432B4']
            });
          }
          break;
        }
      }
      
      // Quando chegar a 100%, mostra achievement e redireciona depois
      if (newValue >= 100) {
        clearInterval(animationInterval);
        triggerConfetti();
        setShowAchievement(true);
        
        setTimeout(() => {
          navigate('/plan-ready');
        }, 3000);
      }
    }, interval);
    
    return () => clearInterval(animationInterval);
  }, [navigate, currentMilestone]);

  // Adicionamos um efeito para tocar sons quando os exercícios aparecerem
  useEffect(() => {
    if (progressPercentage > 25) {
      playPopSound(0);
    }
    if (progressPercentage > 50) {
      playPopSound(200);
    }
    if (progressPercentage > 75) {
      playPopSound(400);
    }
  }, [progressPercentage]);

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        <main className="flex-1 px-6 py-5 flex flex-col items-center">
          <div className="max-w-lg w-full mx-auto">
            {/* Indicador de progresso circular animado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-5"
            >
              <div className="relative w-28 h-28">
                {/* Círculo de fundo */}
                <div className="absolute inset-0 rounded-full border-8 border-purple-100"></div>
                
                {/* Círculo de progresso com gradiente e animação */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7432B4" />
                      <stop offset="100%" stopColor="#9747FF" />
                    </linearGradient>
                  </defs>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="46" 
                    fill="none" 
                    stroke="#E9D5FF" 
                    strokeWidth="8"
                  />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="46" 
                    fill="none" 
                    stroke="url(#gradient)" 
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 46}`} 
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - progressPercentage / 100)}`}
                    transform="rotate(-90, 50, 50)"
                    transition={{ type: "tween", ease: "linear" }}
                  />
                </svg>
                
                {/* Texto de porcentagem animado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    className="text-xl font-bold text-[#2D1441]"
                    animate={{ 
                      opacity: [1, 0.7, 1],
                      scale: progressPercentage === 100 ? [1, 1.2, 1] : 1
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: progressPercentage < 100 ? Infinity : 0,
                      ease: "easeInOut" 
                    }}
                  >
                    {progressPercentage}%
                  </motion.span>
                </div>
                
                {/* Ícone de milestone atual com animação */}
                <AnimatePresence>
                  {progressPercentage === 100 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 45 }}
                      className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg"
                    >
                      <Trophy size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Status atual */}
            <motion.div
              key={currentMilestone}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center gap-2 mb-2">
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {milestones[currentMilestone].icon}
                </motion.div>
                <h2 className="text-lg font-semibold text-[#2D1441]">
                  {milestones[currentMilestone].title}
                </h2>
              </div>
              
              <p className="text-sm text-gray-600">
                {progressPercentage < 100 
                  ? "Seu plano personalizado está sendo criado com base nas suas respostas" 
                  : "Seu plano personalizado está pronto!"}
              </p>
            </motion.div>

            {/* Elemento de autoridade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-4"
            >
              <div className="flex justify-center items-center gap-1 text-xs text-purple-700 font-medium">
                <Shield className="w-3 h-3" />
                <span>Desenvolvido por especialistas em fisioterapia</span>
              </div>
            </motion.div>
            
            {/* Cards de exercícios */}
            <div className="space-y-3 mb-5">
              {exercises.map((exercise, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: progressPercentage > (index+1) * 25 ? 1 : 0.5, 
                    x: progressPercentage > (index+1) * 25 ? 0 : -20 
                  }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className={`bg-purple-100 p-4 rounded-xl transition-all ${
                    progressPercentage > (index+1) * 25 ? "shadow-md" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{exercise.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium text-[#2D1441]">
                          {exercise.title} 
                          <span className="ml-2 text-xs text-purple-600 font-normal">{exercise.day}</span>
                        </h3>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div 
                              key={i} 
                              className={`w-2 h-2 rounded-full mx-0.5 ${i < exercise.difficulty ? 'bg-orange-500' : 'bg-gray-300'}`}
                              initial={{ scale: 0 }}
                              animate={{ 
                                scale: progressPercentage > (index+1) * 25 && i < exercise.difficulty ? 1 : 0 
                              }}
                              transition={{ delay: 0.5 + index * 0.2 + i * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Achievement Card */}
            <AnimatePresence>
              {showAchievement && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="mb-5 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-5 text-white shadow-lg overflow-hidden relative"
                >
                  {/* Overlay de partículas */}
                  {showConfetti && Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 opacity-60"
                      style={{ 
                        left: `${Math.random() * 100}%`, 
                        top: `${Math.random() * 100}%` 
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        y: [0, Math.random() * -30],
                        x: [0, (Math.random() - 0.5) * 40]
                      }}
                      transition={{ 
                        duration: 2,
                        delay: Math.random() * 0.5,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2
                      }}
                    />
                  ))}
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative">
                      <motion.div 
                        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                        animate={{ boxShadow: ["0px 0px 0px rgba(255,255,255,0.3)", "0px 0px 20px rgba(255,255,255,0.6)", "0px 0px 0px rgba(255,255,255,0.3)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Trophy className="w-8 h-8 text-yellow-300" />
                      </motion.div>
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        +1
                      </motion.div>
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-xl mb-1">Conquista Desbloqueada!</h3>
                      <p className="text-sm text-purple-100">Seu plano personalizado de 21 dias está pronto para transformar sua vida.</p>
                      
                      <div className="flex flex-wrap justify-center sm:justify-start mt-3 gap-2">
                        <motion.button 
                          className="text-xs bg-white/10 hover:bg-white/20 py-1 px-3 rounded-full text-white flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => playPopSound(0)}
                        >
                          <span>Compartilhar</span>
                        </motion.button>
                        <motion.button 
                          className="text-xs bg-white/10 hover:bg-white/20 py-1 px-3 rounded-full text-white flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => playPopSound(0)}
                        >
                          <span>Salvar certificado</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Prova social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: progressPercentage > 70 ? 1 : 0 }}
              transition={{ delay: 0.9 }}
              className="mb-5 bg-white rounded-xl p-3 shadow-sm"
              onAnimationComplete={() => {
                if (progressPercentage > 70) {
                  playPopSound(0);
                }
              }}
            >
              <div className="flex items-start gap-2">
                <div className="flex text-yellow-400 mt-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="text-xs text-gray-700 font-medium">
                    "Perdi 8kg em 3 meses com os exercícios. Recomendo para todos!" — Marina S.
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Award className="w-3 h-3 text-purple-600" />
                    <span className="text-[10px] text-purple-700 font-medium">98% de aprovação entre usuários</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Nota de rodapé */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-center text-gray-500 px-6"
            >
              As instruções detalhadas em nosso plano são apresentadas de maneira clara e direta para proteger a privacidade, os nossos termos e as fichas podem ser alteradas, mas a qualidade permanece a mesma.
            </motion.p>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default CreatingPlan;