import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Target, TrendingDown, Activity, Calendar } from 'lucide-react';
import Header from './Header';
import AnimatedPage from './AnimatedPage';
import { useQuiz } from '../context/QuizContext';

const PlanDefinitive: React.FC = () => {
  const navigate = useNavigate();
  const { bodyMassIndex, goals, bodyType, sex, ageRange } = useQuiz();
  
  // Cálculo personalizado de peso e data
  const personalizedData = useMemo(() => {
    // Estimativa de altura baseada no IMC (uma simplificação para este exemplo)
    const estimatedHeight = 1.7; // metros
    const currentWeight = bodyMassIndex ? Math.round(bodyMassIndex * (estimatedHeight * estimatedHeight)) : 70;
    
    // Definindo peso alvo baseado no IMC e outras características
    let targetWeight;
    if (bodyMassIndex) {
      if (bodyMassIndex > 25) {
        // Para sobrepeso, mira num IMC saudável
        targetWeight = Math.round(24 * (estimatedHeight * estimatedHeight));
      } else if (bodyMassIndex < 18.5) {
        // Para abaixo do peso, mira num IMC saudável inferior
        targetWeight = Math.round(19 * (estimatedHeight * estimatedHeight));
      } else {
        // Para IMC normal, ajuste fino baseado nos objetivos
        const hasWeightLossGoal = goals.some(g => g.id === 'lose-weight' && g.selected);
        targetWeight = hasWeightLossGoal 
          ? Math.round(currentWeight * 0.95) // Redução de 5% se quer perder peso
          : Math.round(currentWeight); // Manutenção para outros objetivos
      }
    } else {
      // Valor padrão caso não tenha IMC
      targetWeight = bodyType === 'plus' ? 65 : 60;
    }
    
    // Cálculo da diferença de peso
    const weightDifference = Math.abs(currentWeight - targetWeight);
    
    // Definindo a data alvo com base na diferença de peso
    const today = new Date();
    let targetDate = new Date();
    
    if (weightDifference > 5) {
      // Para diferenças maiores: 3 meses
      targetDate.setMonth(today.getMonth() + 3);
    } else if (weightDifference > 2) {
      // Para diferenças médias: 2 meses
      targetDate.setMonth(today.getMonth() + 2);
    } else {
      // Para diferenças pequenas: 1 mês
      targetDate.setMonth(today.getMonth() + 1);
    }
    
    // Ajustes baseados em características demográficas
    if (ageRange === '55-64' || ageRange === '65+') {
      // Mais tempo para pessoas mais velhas
      targetDate.setDate(targetDate.getDate() + 14);
    }
    
    // Geração de pontos para o gráfico
    const totalDays = Math.round((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const weeklyPoints = [];
    const weightStep = (currentWeight - targetWeight) / (totalDays / 7);
    
    for (let i = 0; i <= totalDays / 7; i++) {
      const pointDate = new Date(today);
      pointDate.setDate(today.getDate() + (i * 7));
      
      weeklyPoints.push({
        date: pointDate,
        weight: Math.round((currentWeight - (weightStep * i)) * 10) / 10
      });
    }
    
    return {
      currentWeight,
      targetWeight,
      targetDate,
      weeklyPoints,
      weightDifference,
      totalDays
    };
  }, [bodyMassIndex, goals, bodyType, sex, ageRange]);
  
  // Formatação da data
  const formatDate = (date: Date) => {
    return `${date.getDate()} de ${['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'][date.getMonth()]}. de ${date.getFullYear()}`;
  };

  // Determinando mensagem personalizada
  const getPersonalizedMessage = () => {
    const hasWeightLossGoal = goals.some(g => g.id === 'lose-weight' && g.selected);
    const hasMoodGoal = goals.some(g => g.id === 'manage-mood' && g.selected);
    const hasHealthGoal = goals.some(g => g.id === 'improve-heart' && g.selected);
    
    if (hasWeightLossGoal) {
      return `Prevemos que você alcançará ${personalizedData.targetWeight} kg até ${formatDate(personalizedData.targetDate)}, perdendo ${Math.round(personalizedData.weightDifference * 10) / 10} kg no total.`;
    } else if (hasMoodGoal || hasHealthGoal) {
      return `Seu plano está configurado para melhorar sua saúde geral até ${formatDate(personalizedData.targetDate)}, mantendo um peso ideal de ${personalizedData.targetWeight} kg.`;
    } else {
      return `Seu programa personalizado vai até ${formatDate(personalizedData.targetDate)}, ajudando você a atingir sua melhor forma física.`;
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        <main className="flex-1 px-6 py-5">
          <div className="max-w-lg mx-auto">
            {/* Título */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <h2 className="text-xl font-bold text-[#2D1441] mb-2">
                O plano definitivo para seu corpo perfeito
              </h2>
              <p className="text-sm text-gray-600">
                {getPersonalizedMessage()}
              </p>
            </motion.div>

            {/* Gráfico de Progresso Avançado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-md p-5 mb-8 h-80"
            >
              {/* Cabeçalho do gráfico */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-[#7432B4]" />
                  <span className="text-sm font-medium text-gray-700">Trajetória personalizada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-500">Início</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-500">Meta</span>
                  </div>
                </div>
              </div>
              
              {/* Container do gráfico com grid */}
              <div className="relative h-52 mb-2 border border-gray-100 rounded-lg overflow-hidden">
                {/* Linhas de grid horizontal */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((_, i) => (
                    <div key={i} className="border-b border-gray-100 w-full h-0"></div>
                  ))}
                </div>
                
                {/* Linhas de grid vertical */}
                <div className="absolute inset-0 flex justify-between">
                  {[0, 1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="border-r border-gray-100 h-full w-0"></div>
                  ))}
                </div>
                
                {/* Área de gradiente sob a curva */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-tr from-red-50 via-amber-50 to-green-50"
                ></div>
                
                {/* Linha de progresso curva SVG */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF5757" />
                      <stop offset="50%" stopColor="#FFA14D" />
                      <stop offset="100%" stopColor="#4ADE80" />
                    </linearGradient>
                  </defs>
                  {/* Linha curva suave */}
                  <path 
                    d="M 10,120 Q 30,100 60,90 T 120,70 T 180,60 T 240,50 T 300,45" 
                    fill="none" 
                    stroke="url(#progressGradient)" 
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Área de sombra sob a curva */}
                  <path 
                    d="M 10,120 Q 30,100 60,90 T 120,70 T 180,60 T 240,50 T 300,45 V 160 H 10 Z" 
                    fill="url(#progressGradient)" 
                    opacity="0.1"
                  />
                </svg>
                
                {/* Pontos semanais */}
                {personalizedData.weeklyPoints.map((point, index) => {
                  const progress = index / (personalizedData.weeklyPoints.length - 1);
                  const xPos = 10 + progress * 290;
                  const yPos = 120 - progress * 75;
                  const color = index === 0 ? "#FF5757" : 
                               index === personalizedData.weeklyPoints.length - 1 ? "#4ADE80" :
                               `rgb(${255 - (progress * 200)}, ${150 + (progress * 60)}, ${80 + (progress * 100)})`;
                  return (
                    <div 
                      key={index}
                      className="absolute w-3 h-3 rounded-full shadow-md flex items-center justify-center"
                      style={{ left: `${xPos}px`, top: `${yPos}px`, backgroundColor: 'white' }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      
                      {/* Tooltip para pontos principais */}
                      {(index === 0 || index === personalizedData.weeklyPoints.length - 1 || index % 2 === 0) && (
                        <div 
                          className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                          style={{ opacity: index === 0 || index === personalizedData.weeklyPoints.length - 1 ? 0.9 : 0 }}
                        >
                          <div className="font-medium">{point.weight} kg</div>
                          <div className="text-gray-500">{formatDate(point.date).split(' ')[0]} {formatDate(point.date).split(' ')[2]}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Marcador de início (animado) */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="absolute top-[120px] left-[10px] w-5 h-5 rounded-full bg-red-500 shadow-md border-2 border-white flex items-center justify-center"
                >
                  <span className="text-white text-[8px] font-bold">HOJE</span>
                </motion.div>
                
                {/* Marcador de objetivo (animado) */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute top-[45px] left-[300px] w-5 h-5 rounded-full bg-green-500 shadow-md border-2 border-white flex items-center justify-center"
                >
                  <Target className="w-3 h-3 text-white" />
                </motion.div>
              </div>
              
              {/* Legenda temporal */}
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Hoje</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  <span>Progresso semanal</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(personalizedData.targetDate)}</span>
                </div>
              </div>
            </motion.div>

            {/* Indicadores de Peso */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-md p-5 mb-8 flex justify-between"
            >
              <div className="text-center">
                <div className="text-gray-500 text-sm">Peso atual</div>
                <div className="text-xl font-bold text-red-500">{personalizedData.currentWeight} kg</div>
              </div>
              
              <div className="text-center">
                <div className="text-gray-500 text-sm">Diferença</div>
                <div className="text-xl font-bold text-amber-500">
                  {personalizedData.currentWeight > personalizedData.targetWeight ? "- " : "+ "}
                  {Math.round(Math.abs(personalizedData.currentWeight - personalizedData.targetWeight) * 10) / 10} kg
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-gray-500 text-sm">Meta</div>
                <div className="text-xl font-bold text-green-500">{personalizedData.targetWeight} kg</div>
              </div>
            </motion.div>

            {/* Botão */}
            <motion.button
              onClick={() => navigate('/creating-plan')}
              className="w-full bg-gradient-to-r from-[#7432B4] to-[#9747FF] text-white font-bold text-lg py-4 px-8 rounded-full hover:from-[#6822A6] hover:to-[#8740E6] transition-colors shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Continuar
            </motion.button>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default PlanDefinitive;