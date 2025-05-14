
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  Shield, 
  Clock, 
  Gift, 
  ArrowRight, 
  Star,
  Zap, 
  ChevronDown, 
  Heart,
  Lock,
  TrendingDown,
  Award,
  HelpCircle,
  X,
  DollarSign,
  Users,
  Mail
} from 'lucide-react';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';

const SalesPage: React.FC = () => {
  const navigate = useNavigate();
  const { email, setEmail, goals, bodyType, ageRange, setSelectedPlan } = useQuiz();
  
  const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 0 });
  const [expanded, setExpanded] = useState<number | null>(null);
  const [expandedObjection, setExpandedObjection] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState(email || '');
  const [selectedPricing, setSelectedPricing] = useState('premium');
  const [qualification, setQualification] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recentViewers, setRecentViewers] = useState(173);
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false);

  const notifications = [
    { name: "Maria", location: "São Paulo", time: "2 min atrás" },
    { name: "Carlos", location: "Rio de Janeiro", time: "5 min atrás" },
    { name: "Júlia", location: "Curitiba", time: "9 min atrás" }
  ];

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        } else {
          clearInterval(interval);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simular vistantes recentes
  useEffect(() => {
    const viewersInterval = setInterval(() => {
      setRecentViewers(prev => {
        const change = Math.random() > 0.6 ? 1 : 0;
        return prev + change;
      });
    }, 30000);

    return () => clearInterval(viewersInterval);
  }, []);

  // Rotacionar notificações
  useEffect(() => {
    const notificationCycle = setTimeout(() => {
      setShowNotification(true);
      
      const hideTimer = setTimeout(() => {
        setShowNotification(false);
        setCurrentNotification(prev => (prev + 1) % notifications.length);
      }, 5000);
      
      return () => clearTimeout(hideTimer);
    }, 3000);
    
    return () => clearTimeout(notificationCycle);
  }, [currentNotification, showNotification]);

  // Detectar scroll para mostrar CTA sticky
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 800) {
        setStickyCtaVisible(true);
      } else {
        setStickyCtaVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserEmail(value);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailValid) {
      setEmail(userEmail);
      setShowConfetti(true);
      setSelectedPlan(selectedPricing as 'starter' | 'complete' | 'premium' | null);

      // Simular carregamento
      setTimeout(() => {
        navigate('/checkout');
      }, 800);
    }
  };

  const getRelevantTestimonials = () => {
    // Array base de testemunhos
    const testimonials = [
      {
        quote: "Achei que não conseguiria praticar yoga por causa da minha artrite. Este método mudou tudo! Faço todos os exercícios na minha cadeira de escritório e já perdi 5kg em 6 semanas!",
        name: "Márcia Silva",
        age: 56,
        image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
        occupation: "Professora aposentada",
        ageGroup: '55-64',
        bodyTypes: ['normal', 'plus'],
        goals: ['lose-weight', 'improve-mobility']
      },
      {
        quote: "Como trabalho 10h por dia sentado, minhas dores nas costas eram constantes. Depois de apenas 2 semanas seguindo o método, a dor sumiu completamente e minha energia disparou!",
        name: "Roberto Almeida",
        age: 42,
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        occupation: "Analista de sistemas",
        ageGroup: '35-44',
        bodyTypes: ['normal'],
        goals: ['improve-mobility', 'manage-mood']
      },
      {
        quote: "Minha pressão arterial estava sempre alta. Depois de seguir o programa por um mês, meu médico ficou impressionado com a melhora. Tudo isso sem sair da minha cadeira!",
        name: "Carlos Mendes",
        age: 61,
        image: "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg",
        occupation: "Aposentado",
        ageGroup: '55-64',
        bodyTypes: ['normal', 'plus'],
        goals: ['improve-heart', 'improve-mobility']
      },
      {
        quote: "Com 3 filhos pequenos, nunca encontrei tempo para me exercitar. Este método me permitiu praticar enquanto trabalho e até durante as reuniões online! Perdi 7kg e minha ansiedade reduziu drasticamente.",
        name: "Patrícia Lopes",
        age: 38,
        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        occupation: "Empreendedora",
        ageGroup: '35-44',
        bodyTypes: ['normal', 'curvy'],
        goals: ['lose-weight', 'manage-mood']
      },
      {
        quote: "Aos 70 anos, pensei que não poderia mais melhorar minha flexibilidade. Me enganei completamente! Hoje consigo brincar com meus netos sem dores nas juntas.",
        name: "Helena Moreira",
        age: 70,
        image: "https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg",
        occupation: "Aposentada",
        ageGroup: '65+',
        bodyTypes: ['normal', 'plus'],
        goals: ['improve-mobility', 'improve-heart']
      },
      {
        quote: "Eu usava tamanho 48 e hoje estou no 42! Tudo sem dietas malucas, apenas com os exercícios de cadeira e as dicas de alimentação do programa.",
        name: "Sandra Ribeiro",
        age: 49,
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
        occupation: "Contadora",
        ageGroup: '45-54',
        bodyTypes: ['plus', 'curvy'],
        goals: ['lose-weight', 'enhance-skin']
      }
    ];

    // Lógica de personalização dos testemunhos
    let filtered = [...testimonials];
    
    // Filtrar por idade se disponível
    if (ageRange) {
      const matchingByAge = testimonials.filter(t => t.ageGroup === ageRange);
      if (matchingByAge.length > 0) {
        filtered = matchingByAge;
      }
    }
    
    // Refinar por tipo de corpo
    if (bodyType && filtered.length > 2) {
      const matchingByBody = filtered.filter(t => t.bodyTypes.includes(bodyType));
      if (matchingByBody.length > 0) {
        filtered = matchingByBody;
      }
    }
    
    // Refinar por objetivos principais
    const selectedGoals = goals.filter(g => g.selected).map(g => g.id);
    if (selectedGoals.length > 0 && filtered.length > 2) {
      const matchingByGoals = filtered.filter(t => 
        t.goals.some(g => selectedGoals.includes(g))
      );
      if (matchingByGoals.length > 0) {
        filtered = matchingByGoals;
      }
    }
    
    // Garantir diversidade de faixa etária
    const result = filtered.slice(0, 4);
    if (result.length < 4) {
      const remaining = testimonials
        .filter(t => !result.includes(t))
        .slice(0, 4 - result.length);
      result.push(...remaining);
    }
    
    return result;
  };

  // Obter os testemunhos relevantes
  const relevantTestimonials = getRelevantTestimonials();

  // Faqs lista
  const faqs = [
    {
      question: 'Quanto tempo vou precisar dedicar por dia?',
      answer: 'O método foi desenvolvido para pessoas ocupadas, com sessões de 10-15 minutos que se encaixam em qualquer rotina. Você pode praticar no trabalho, assistindo TV ou até em reuniões online.'
    },
    {
      question: 'Preciso ter experiência prévia com yoga?',
      answer: 'Não, o método é especialmente projetado para iniciantes. Começamos com movimentos simples e progredimos gradualmente conforme sua evolução.'
    },
    {
      question: 'Este programa é seguro para minha condição física?',
      answer: 'Sim! O método foi criado por especialistas em fisioterapia e educação física, com versões para diferentes tipos corporais. Os exercícios são de baixo impacto e altamente seguros.'
    },
    {
      question: 'Em quanto tempo verei resultados?',
      answer: 'A maioria dos usuários percebe melhoras na mobilidade e bem-estar já na primeira semana. Para resultados mais significativos como perda de peso, ganho de força ou redução da ansiedade, o protocolo completo de 21 dias oferece transformações notáveis e sustentáveis.'
    },
    {
      question: 'Como recebo o material após a compra?',
      answer: 'Imediatamente após a compra, você recebe um email com o link para baixar o material. Todo o conteúdo estará disponível em formato PDF de alta qualidade, otimizado para visualização em qualquer dispositivo.'
    }
  ];

  // Planos de preço
  const pricingPlans = [
    {
      id: 'starter',
      title: 'Essencial',
      price: 'R$19,90',
      period: 'por mês',
      features: ['Método básico', 'Plano de 21 dias', 'Suporte por email'],
      recommended: false
    },
    {
      id: 'premium',
      title: 'Completo',
      price: 'R$27,90',
      period: 'por mês',
      features: ['Método avançado', 'Plano de 21 dias', 'Comunidade VIP', 'Acompanhamento', 'Bônus exclusivos'],
      recommended: true
    },
    {
      id: 'vip',
      title: 'Transformação Total',
      price: 'R$47,90',
      period: 'por mês',
      features: ['Tudo do Completo', 'Consultoria individual', 'Análise personalizada', 'Plano nutricional', 'Acesso vitalício'],
      recommended: false
    }
  ];

  // Objeções comuns
  const commonObjections = [
    {
      id: 'time',
      objection: "Não tenho tempo para exercícios",
      response: "É por isso que desenvolvemos um método que requer apenas 15 minutos por dia, podendo ser feito durante reuniões de trabalho ou assistindo TV.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'results',
      objection: "Será que realmente funciona?",
      response: "Mais de 9.879 pessoas já transformaram seus corpos com nosso método. 87% relataram melhora significativa nas primeiras 2 semanas.",
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 'value',
      objection: "O investimento vale a pena?",
      response: "Por menos que um café por dia, você tem acesso a um método completo que substituiria sessões de fisioterapia (R$150-250 cada) ou personal trainer.",
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      id: 'difficulty',
      objection: "Parece complicado para mim",
      response: "Nosso método foi desenvolvido especificamente para pessoas sem experiência. As instruções são ultra detalhadas e temos suporte para ajudar.",
      icon: <HelpCircle className="w-5 h-5" />
    }
  ];

  // Value stack itens
  const valueStackItems = [
    { name: "Método Yoga na Cadeira Premium", value: "R$197", included: true },
    { name: "Plano 21 Dias de Transformação", value: "R$67", included: true },
    { name: "Suporte na Comunidade VIP (3 meses)", value: "R$147", included: true },
    { name: "Guia Nutricional Simplificado", value: "R$37", included: true },
    { name: "Acompanhamento de Progresso", value: "R$97", included: true },
    { name: "Bônus: Meditações Guiadas", value: "R$57", included: true, highlight: true },
    { name: "Bônus: Mini-curso de Respiração", value: "R$47", included: true, highlight: true }
  ];

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />

        {/* Hero Section */}
        <section className="px-5 py-10 md:py-16 bg-gradient-to-br from-[#7432B4] to-[#9747FF] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 text-yellow-300 backdrop-blur-sm rounded-xl py-2 px-4 mb-5 inline-block"
            >
              <span className="font-bold">OFERTA ESPECIAL</span> • Por tempo limitado
            </motion.div>
            
            <motion.h1 
              className="text-2xl md:text-4xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transforme Seu Corpo e Saúde Sem Sair da Cadeira
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="font-semibold">Método Exclusivo de Yoga na Cadeira com Resultados Garantidos em 21 Dias</span>
            </motion.p>
            
            {/* Banner ABFS destacado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="bg-yellow-500/20 border border-yellow-300/50 backdrop-blur-sm rounded-xl p-4 mb-6 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-yellow-300 flex-shrink-0" />
                <p className="text-yellow-300 text-sm md:text-base font-bold">PARCERIA OFICIAL ABFS</p>
              </div>
              <p className="text-white text-xs md:text-sm">
                Em parceria com a <span className="font-semibold">Associação Brasileira de Fisioterapia e Saúde</span>, oferecemos <span className="font-bold">apenas 200 vagas</span> para o programa-piloto de democratização do yoga terapêutico com <span className="font-bold text-yellow-300">84% OFF</span>.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 mb-6 inline-block"
            >
              <div className="price-anchoring">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="text-center">
                    <div className="text-xs text-white/70 mb-1">Mentorias privadas</div>
                    <div className="text-sm md:text-lg line-through text-white/60">R$697/mês</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-white/70 mb-1">Programa físico</div>
                    <div className="text-sm md:text-lg line-through text-white/60">R$197</div>
                  </div>
                  <div className="text-center bg-yellow-400/20 px-3 py-2 rounded-lg border border-yellow-400/50">
                    <div className="text-xs font-bold text-yellow-300 mb-1">ACESSO DIGITAL</div>
                    <div className="text-xl md:text-2xl font-bold text-white">R$19,90<span className="text-xs md:text-sm font-normal text-white/70">/mês</span></div>
                  </div>
                </div>
              </div>
              
              <p className="text-white/90 text-xs md:text-sm">
                <span className="font-bold">De R$197,00 por apenas:</span>
              </p>
              <div className="flex items-center justify-center gap-1 my-2">
                <span className="text-2xl md:text-4xl font-bold text-yellow-300">R$19,90</span>
                <span className="text-white/80 text-xs md:text-base">/mês</span>
              </div>
              <p className="text-white/90 text-xs">Cancele quando quiser</p>
              <p className="text-white/80 text-xs mt-2">Oferta expira em:</p>
              <div className="flex justify-center gap-2 text-xl md:text-3xl font-bold mt-1">
                <div className="bg-white/20 rounded-lg px-2 py-1 md:px-3 md:py-1">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span>:</span>
                <div className="bg-white/20 rounded-lg px-2 py-1 md:px-3 md:py-1">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a 
                href="#buy-now" 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#2D1441] font-bold text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center"
              >
                QUERO TRANSFORMAR MINHA VIDA AGORA
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </a>
            </motion.div>
          </div>
        </section>
        
        {/* Prova Social Rápida */}
        <section className="bg-white py-4 md:py-6 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-5">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 md:w-4 md:h-4 text-[#7432B4]" />
                <span>Método certificado pela ABFS</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                  ))}
                </div>
                <span>4.9/5 (873 avaliações)</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-[#7432B4]" />
                <span>9.879 pessoas transformadas</span>
              </div>
            </div>
          </div>
        </section>

       
        {/* O Que Você Recebe */}
        <section className="py-8 md:py-12 bg-white">
          <div className="max-w-4xl mx-auto px-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-10"
            >
              <h2 className="text-xl md:text-3xl font-bold text-[#2D1441] mb-2">
                O Que Você Vai Receber Hoje
              </h2>
              <p className="text-gray-600">Todo o método completo por menos que o valor de uma pizza!</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-purple-100 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-[#7432B4]/10 p-3 rounded-full flex-shrink-0">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-[#7432B4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-[#2D1441] mb-1">Método Completo de Yoga na Cadeira (Valor: R$97)</h3>
                    <p className="text-sm md:text-base text-gray-600">Guia detalhado com 45+ exercícios ilustrados, passo a passo, e progressão para iniciantes até avançados. Uma abordagem completa que transforma seu corpo e mente sem precisar sair da cadeira.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-[#7432B4]/10 p-3 rounded-full flex-shrink-0">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-[#7432B4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-[#2D1441] mb-1">Plano de 21 Dias de Transformação (Valor: R$67)</h3>
                    <p className="text-sm md:text-base text-gray-600">Roteiro diário com exercícios progressivos que se adaptam ao seu ritmo, calendário de acompanhamento e diário de registro para resultados visíveis em apenas 3 semanas.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-[#7432B4]/10 p-3 rounded-full flex-shrink-0">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-[#7432B4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-[#2D1441] mb-1">Guia de Respiração e Meditação na Cadeira (Valor: R$47)</h3>
                    <p className="text-sm md:text-base text-gray-600">Técnicas exclusivas para combater estresse, ansiedade e melhorar o foco, com rotinas rápidas de 3-5 minutos que podem ser feitas em qualquer lugar.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-[#7432B4]/10 p-3 rounded-full flex-shrink-0">
                    <Gift className="w-5 h-5 md:w-6 md:h-6 text-[#7432B4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-[#2D1441] mb-1">BÔNUS: Mini-Guia de Nutrição Simplificada (Valor: R$37)</h3>
                    <p className="text-sm md:text-base text-gray-600">Dicas de alimentação descomplicada que potencializam os resultados dos exercícios, com opções práticas para diferentes objetivos e rotinas.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Valor Total:</span>
                  <span className="text-lg font-bold line-through text-gray-400">R$248,00</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#2D1441]">Oferta Especial ABFS:</span>
                  <span className="text-2xl md:text-3xl font-bold text-green-600">R$19,90</span>
                </div>
                
                <div className="text-xs text-gray-500 text-right mt-1">
                  Economia de R$228,10 (84% de desconto) • Apenas 200 vagas
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Como Funciona */}
        <section className="py-8 md:py-12 bg-white">
          <div className="max-w-4xl mx-auto px-5">
            <motion.div 
              className="text-center mb-8 md:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-3xl font-bold text-[#2D1441] mb-4">
                Como Funciona o Método de Yoga na Cadeira
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
                Um sistema simples e eficaz, testado por milhares de pessoas
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              {[
                {
                  icon: <motion.div 
                          className="bg-[#7432B4]/10 p-3 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        >
                          <svg className="w-8 h-8 md:w-10 md:h-10 text-[#7432B4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </motion.div>,
                  step: "Passo 1",
                  title: "Receba o Material",
                  desc: "Acesso imediato ao seu plano personalizado baseado no seu quiz."
                },
                {
                  icon: <motion.div 
                          className="bg-[#7432B4]/10 p-3 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ delay: 0.5, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        >
                          <svg className="w-8 h-8 md:w-10 md:h-10 text-[#7432B4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </motion.div>,
                  step: "Passo 2",
                  title: "Estude o Método",
                  desc: "Dedique 10 minutos para entender os fundamentos."
                },
                {
                  icon: <motion.div 
                          className="bg-[#7432B4]/10 p-3 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ delay: 1, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        >
                          <svg className="w-8 h-8 md:w-10 md:h-10 text-[#7432B4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </motion.div>,
                  step: "Passo 3",
                  title: "Pratique 15min/dia",
                  desc: "Siga a sequência diária no seu próprio ritmo."
                },
                {
                  icon: <motion.div 
                          className="bg-[#7432B4]/10 p-3 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        >
                          <svg className="w-8 h-8 md:w-10 md:h-10 text-[#7432B4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </motion.div>,
                  step: "Passo 4",
                  title: "Sinta os Resultados",
                  desc: "Veja mudanças visíveis em 21 dias ou menos."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-4">
                    {item.icon}
                    {index < 3 && (
                      <motion.div 
                        className="absolute top-1/2 left-full w-8 md:w-16 h-0.5 bg-gray-200 hidden md:block" 
                        style={{ transform: "translateY(-50%)" }}
                        initial={{ width: 0 }}
                        animate={{ width: 64 }}
                        transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
                      />
                    )}
                  </div>
                  <div className="bg-[#7432B4] text-white text-xs font-bold py-1 px-3 rounded-full mb-2">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-sm md:text-lg text-[#2D1441] mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Comparação com Alternativas */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-white to-[#F7F3FF]">
          <div className="max-w-4xl mx-auto px-5">
            <motion.div 
              className="text-center mb-8 md:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-3xl font-bold text-[#2D1441] mb-2 md:mb-4">
                Quanto Você Economiza Com Nosso Método
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
                Compare o investimento no nosso programa com outras alternativas
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-4 md:p-6 shadow-lg mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 md:py-4 px-3 md:px-4 text-sm md:text-lg font-bold text-[#2D1441]">Solução</th>
                      <th className="text-center py-3 md:py-4 px-3 md:px-4 text-sm md:text-lg font-bold text-[#2D1441]">Investimento</th>
                      <th className="text-center py-3 md:py-4 px-3 md:px-4 text-sm md:text-lg font-bold text-[#2D1441]">Tempo</th>
                      <th className="text-center py-3 md:py-4 px-3 md:px-4 text-sm md:text-lg font-bold text-[#2D1441]">Deslocamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 md:py-4 px-3 md:px-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="bg-blue-100 p-1 md:p-2 rounded-full">
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-xs md:text-base text-gray-800">Fisioterapia Tradicional</div>
                            <div className="text-xs text-gray-500">Consultas semanais em clínica</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="font-bold text-xs md:text-base text-red-600">R$150-250/sessão</div>
                        <div className="text-xs text-gray-500">R$1.800+ em 3 meses</div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="font-medium text-xs md:text-base">1h por sessão</div>
                        <div className="text-xs text-gray-500">+ tempo de deslocamento</div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="text-red-500 font-medium text-xs md:text-base">Necessário</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 md:py-4 px-3 md:px-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="bg-purple-100 p-1 md:p-2 rounded-full">
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-xs md:text-base text-gray-800">Personal Yoga</div>
                            <div className="text-xs text-gray-500">Instrutor particular</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="font-bold text-xs md:text-base text-red-600">R$120-200/aula</div>
                        <div className="text-xs text-gray-500">R$1.440+ em 3 meses</div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="font-medium text-xs md:text-base">1h por aula</div>
                        <div className="text-xs text-gray-500">+ preparação</div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="text-red-500 font-medium text-xs md:text-base">Necessário</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-[#7432B4]/5">
                      <td className="py-3 md:py-4 px-3 md:px-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="bg-[#7432B4] p-1 md:p-2 rounded-full">
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-bold text-xs md:text-base text-[#7432B4]">Nosso Método de Yoga na Cadeira</div>
                            <div className="text-xs text-gray-600">Programa ABFS exclusivo</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="font-bold text-xs md:text-lg text-green-600">R$19,90/mês</div>
                        <div className="text-xs text-gray-600">R$59,70 em 3 meses</div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="font-medium text-xs md:text-base text-green-600">15 min/dia</div>
                        <div className="text-xs text-gray-600">quando quiser</div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="text-green-600 font-medium text-xs md:text-base">Não necessário</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 md:py-4 px- Search for: src/components/SalesPage.tsx
3 md:px-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="bg-gray-100 p-1 md:p-2 rounded-full">
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-xs md:text-base text-gray-800">App de Yoga Online</div>
                            <div className="text-xs text-gray-500">Sem personalização</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="font-bold text-xs md:text-base text-yellow-600">R$39-69/mês</div>
                        <div className="text-xs text-gray-500">R$117-207 em 3 meses</div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="font-medium text-xs md:text-base">30-60 min/aula</div>
                        <div className="text-xs text-gray-500">genérico</div>
                      </td>
                      <td className="py-3 md:py-4 px-3 md:px-4 text-center">
                        <div className="text-green-500 font-medium text-xs md:text-base">Não necessário</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 md:mt-8 p-3 md:p-4 bg-[#7432B4]/10 rounded-lg">
                <div className="flex items-start gap-2 md:gap-3">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-[#7432B4] flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-xs md:text-base text-[#2D1441] mb-1">Economia total com nosso método:</p>
                    <p className="text-xs md:text-sm text-gray-700">
                      <span className="font-bold text-sm md:text-xl text-green-600">97% de economia</span> em comparação com fisioterapia tradicional e <span className="font-bold text-green-600">71%</span> comparado a aplicativos genéricos de yoga.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefícios e Diferenciais */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-white to-[#F7F3FF]">
          <div className="max-w-4xl mx-auto px-5">
            <motion.div 
              className="text-center mb-8 md:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-3xl font-bold text-[#2D1441] mb-2 md:mb-4">
                Por Que O Método de Yoga na Cadeira Funciona
              </h2>
              <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto">
                Mesmo para quem nunca praticou exercícios antes ou tem limitações de movimento
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              <motion.div 
                className="bg-white rounded-xl p-4 md:p-5 shadow-md border-l-4 border-[#7432B4]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-[#7432B4]/10 p-2 rounded-full">
                    <Clock className="w-5 h-5 md:w-7 md:h-7 text-[#7432B4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-[#2D1441] mb-1 md:mb-2">Rápido e Sem Esforço</h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Apenas 10-15 minutos por dia são suficientes para ver resultados. Sem equipamentos, sem academia.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl p-4 md:p-5 shadow-md border-l-4 border-[#7432B4]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-[#7432B4]/10 p-2 rounded-full">
                    <Shield className="w-5 h-5 md:w-7 md:h-7 text-[#7432B4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-[#2D1441] mb-1 md:mb-2">Seguro Para Qualquer Idade</h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Desenvolvido por fisioterapeutas para ser seguro mesmo para idosos ou pessoas com limitações físicas.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl p-4 md:p-5 shadow-md border-l-4 border-[#7432B4]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-[#7432B4]/10 p-2 rounded-full">
                    <Zap className="w-5 h-5 md:w-7 md:h-7 text-[#7432B4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-[#2D1441] mb-1 md:mb-2">Progressão Comprovada</h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      O método avança gradualmente, garantindo progresso constante sem desconforto ou lesões.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl p-4 md:p-5 shadow-md border-l-4 border-[#7432B4]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-[#7432B4]/10 p-2 rounded-full">
                    <Heart className="w-5 h-5 md:w-7 md:h-7 text-[#7432B4]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-[#2D1441] mb-1 md:mb-2">Benefícios Completos</h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Melhora flexibilidade, postura, circulação, reduz dores nas costas e aumenta energia diária.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

       
        
        {/* Testemunhos */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-white to-[#F7F3FF]">
          <div className="max-w-4xl mx-auto px-5">
            <motion.div 
              className="text-center mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-3xl font-bold text-[#2D1441] mb-2 md:mb-4">
                Histórias Reais de Transformação
              </h2>
              <p className="text-sm text-gray-600">
                De pessoas com perfil semelhante ao seu
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {relevantTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-4 md:p-5 shadow-md"
                >
                  <div className="flex text-yellow-400 mb-2 md:mb-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 italic mb-3 md:mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-200 overflow-hidden">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base text-[#2D1441]">{testimonial.name}, {testimonial.age} anos</p>
                      <p className="text-xs text-gray-500">{testimonial.occupation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Escolha de planos */}
        <section id="buy-now" className="py-8 md:py-12 bg-white scroll-mt-20">
          <div className="max-w-xl mx-auto px-5">
            <motion.div 
              className="text-center mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-3xl font-bold text-[#2D1441] mb-2 md:mb-4">
                Escolha Seu Plano de Transformação
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                Acesso ao método completo com garantia de satisfação
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-4 my-6 md:my-8 relative">
              {pricingPlans.map(plan => (
                <motion.div 
                  key={plan.id}
                  className={`border rounded-xl overflow-hidden transition-all ${
                    selectedPricing === plan.id 
                      ? 'border-purple-600 shadow-lg md:transform md:scale-105 md:z-10 bg-white' 
                      : 'border-gray-200 bg-gray-50'
                  } ${plan.recommended ? 'md:-mt-4 md:mb-4' : ''}`}
                  whileHover={{ scale: selectedPricing === plan.id ? 1.05 : 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  onClick={() => setSelectedPricing(plan.id)}
                >
                  {plan.recommended && (
                    <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-1 md:py-2 text-center text-xs md:text-sm font-bold">
                      MAIS POPULAR
                    </div>
                  )}
                  <div className="p-4 md:p-6">
                    <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2">{plan.title}</h3>
                    <div className="mb-3 md:mb-4">
                      <span className="text-xl md:text-2xl font-bold">{plan.price}</span>
                      <span className="text-xs md:text-sm text-gray-500">{plan.period}</span>
                    </div>
                    <ul className="space-y-2 mb-5 md:mb-6">
                      {plan.features.map(feature => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs md:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      className={`w-full py-2 md:py-3 rounded-lg font-medium text-sm md:text-base ${
                        selectedPricing === plan.id 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => setSelectedPricing(plan.id)}
                    >
                      {selectedPricing === plan.id ? 'Selecionado' : 'Selecionar'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Value Stack - lista de itens de valor */}
            <motion.div 
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-purple-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-lg md:text-xl font-bold text-center mb-3 md:mb-4">Valor Total Incluído Hoje</h3>
              
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {valueStackItems.map((item, i) => (
                  <div 
                    key={i} 
                    className={`flex justify-between items-center p-2 md:p-3 rounded-lg ${
                      item.highlight ? 'bg-yellow-50 border border-yellow-100' : 'bg-white border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.included ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                      <span className={`text-xs md:text-sm ${item.highlight ? 'font-medium' : ''}`}>
                        {item.name}
                        {item.highlight && (
                          <span className="ml-2 text-[10px] md:text-xs font-bold bg-yellow-200 px-1 py-0.5 rounded-full text-yellow-800">
                            BÔNUS
                          </span>
                        )}
                      </span>
                    </div>
                    <span className={`text-xs md:text-sm font-bold ${item.included ? '' : 'line-through text-gray-400'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center p-3 md:p-4 bg-purple-100 rounded-lg">
                <div>
                  <span className="text-xs md:text-sm text-purple-800 font-medium block">Valor total</span>
                  <span className="text-xs md:text-sm text-gray-500 line-through">R$649</span>
                </div>
                <div className="text-right">
                  <span className="text-xs md:text-sm text-purple-800 font-medium block">Hoje apenas</span>
                  <span className="text-xl md:text-3xl font-bold text-green-600">
                    {pricingPlans.find(p => p.id === selectedPricing)?.price}<span className="text-xs md:text-sm font-normal text-gray-500">/mês</span>
                  </span>
                </div>
              </div>
            </motion.div>
           

            {/* Garantia */}
            <motion.div
              className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 border border-purple-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Shield className="w-10 h-10 md:w-12 md:h-12 text-[#7432B4] mx-auto mb-3" />
              <h3 className="font-bold text-base md:text-xl text-[#2D1441] mb-2">
                Garantia Incondicional de 7 Dias
              </h3>
              <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto">
                Experimente o método sem riscos. Se por qualquer motivo não estiver satisfeito, devolvemos 100% do seu investimento, sem perguntas.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-5">
            <motion.div
              className="text-center mb-6 md:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-3xl font-bold text-[#2D1441] mb-2 md:mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                Tudo o que você precisa saber antes de começar
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <button
                    className="w-full flex justify-between items-center p-4 md:p-5 text-left"
                    onClick={() => setExpanded(expanded === index ? null : index)}
                  >
                    <span className="text-sm md:text-base font-medium text-[#2D1441]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${
                        expanded === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expanded === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="px-4 md:px-5 pb-4 md:pb-5 pt-2 border-t border-gray-100"
                    >
                      <p className="text-xs md:text-sm text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-8 md:py-12 bg-gradient-to-br from-[#7432B4] to-[#9747FF] text-white">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-3xl font-bold mb-4">
                Não Deixe Essa Chance Passar!
              </h2>
              <p className="text-sm md:text-base mb-6 max-w-2xl mx-auto">
                As 200 vagas com 84% de desconto estão acabando. Garanta seu acesso ao Método de Yoga na Cadeira e comece sua transformação hoje mesmo!
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-5 inline-block mb-6">
                <p className="text-white/80 text-xs md:text-sm mb-2">
                  Oferta expira em:
                </p>
                <div className="flex justify-center gap-2 text-xl md:text-3xl font-bold">
                  <div className="bg-white/20 rounded-lg px-2 py-1 md:px-3 md:py-1">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span>:</span>
                  <div className="bg-white/20 rounded-lg px-2 py-1 md:px-3 md:py-1">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <a
                href="#buy-now"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#2D1441] font-bold text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all inline-flex items-center"
              >
                QUERO MINHA VAGA AGORA
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 md:py-8">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <p className="text-xs md:text-sm mb-4">
              © 2025 Método Yoga na Cadeira. Todos os direitos reservados.
            </p>
            <div className="flex justify-center gap-4 md:gap-6">
              <a href="#" className="text-xs md:text-sm hover:underline">
                Termos de Uso
              </a>
              <a href="#" className="text-xs md:text-sm hover:underline">
                Política de Privacidade
              </a>
              <a href="#" className="text-xs md:text-sm hover:underline">
                Contato
              </a>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedPage>
  );
};

export default SalesPage;