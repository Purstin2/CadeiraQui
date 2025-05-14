import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Target, Dumbbell, Scale, User, Activity } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

const ProfileSummary: React.FC = () => {
  const navigate = useNavigate();
  const {
    ageRange,
    sex,
    goals,
    bodyType,
    dreamBody,
    chairYogaExperience,
    exerciseStyle,
    availableTime,
    bodyMassIndex,
  } = useQuiz();

  // Define fitness level based on quiz data
  const getFitnessLevel = () => {
    if (chairYogaExperience === 'regular') return 'Avançado';
    if (chairYogaExperience === 'tried') return 'Intermediário';
    return 'Moderado';
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Abaixo do peso', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Peso ideal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Sobrepeso', color: 'text-yellow-600' };
    if (bmi < 35) return { category: 'Obesidade I', color: 'text-orange-600' };
    return { category: 'Obesidade II+', color: 'text-red-600' };
  };

  const getPersonalizedMessage = () => {
    const messages = [];
    const goalTitles = goals.filter(g => g.selected).map(g => g.title).join(', ').toLowerCase();
    const experience = 
      chairYogaExperience === 'never' ? 'começando do zero com yoga' :
      chairYogaExperience === 'tried' ? 'com um toque de yoga na bagagem' :
      'já experiente com yoga';
    const genderText = sex === 'female' ? 'pronta' : 'pronto';
    const bodyDreamText = dreamBody === 'fit' ? 'um corpo forte e definido' : 'o corpo dos seus sonhos';

    messages.push(`Você está ${genderText} para transformar sua vida!`);
    if (ageRange) {
      messages.push(`Na sua faixa etária (${ageRange}), cada passo conta para uma versão mais forte de você.`);
    }
    messages.push(`Sendo ${experience}, seu plano será único, seguro e feito para evoluir com você.`);
    
    if (availableTime === 'less15') {
      messages.push('Com pouco tempo, vamos direto ao ponto com treinos rápidos e poderosos.');
    } else if (availableTime === '15to30') {
      messages.push('Sua rotina ganha vida com sessões curtas que entregam resultados reais.');
    } else {
      messages.push('Com tempo de sobra, sua transformação será completa e consistente.');
    }

    if (goalTitles) {
      messages.push(`Foco total em: ${goalTitles}. Vamos tornar isso realidade!`);
    }

    if (bodyType === 'plus' && dreamBody === 'fit') {
      messages.push('Progresso constante com treinos que respeitam e desafiam seu corpo.');
    }

    messages.push(`Chegou a hora de conquistar ${bodyDreamText}. Vamos juntos, passo a passo!`);
    return messages.join(' ');
  };

  const getSelectedGoals = () => {
    return goals.filter(g => g.selected).map(g => ({
      title: g.title,
      icon: g.icon,
      description: g.description
    }));
  };

  const getExerciseRecommendation = () => {
    const recommendations = [];
    if (bodyMassIndex && bodyMassIndex > 25) {
      recommendations.push('Treinos de baixo impacto para cuidar das articulações e ganhar força');
    }
    if (exerciseStyle.includes('yoga')) {
      recommendations.push('Yoga na cadeira para flexibilidade, equilíbrio e calma');
    }
    if (exerciseStyle.includes('strength')) {
      recommendations.push('Força com peso corporal para tonificar e empoderar');
    }
    return recommendations;
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F3FF] to-white">
        <Header />
        <main className="flex-1 px-6 py-5">
          <div className="max-w-lg mx-auto">
            {/* Cabeçalho */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <h2 className="text-2xl font-bold text-[#2D1441] mb-2">
                Seu perfil está pronto
              </h2>
            </motion.div>

            {/* Card principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6"
            >
              {/* Métricas principais */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#7432B4]" />
                    Índice de Massa Corporal (IMC)
                  </h3>
                  <span className="font-bold text-green-600">
                    {bodyMassIndex.toFixed(1)}
                  </span>
                </div>
                
                {/* Barra de IMC renovada */}
                <div className="relative h-6 mb-1">
                  {/* Fundo da barra com gradiente */}
                  <div className="absolute inset-0 rounded-full overflow-hidden flex">
                    <div className="h-full w-1/3 bg-blue-400"></div>
                    <div className="h-full w-1/3 bg-yellow-400"></div>
                    <div className="h-full w-1/3 bg-red-400"></div>
                  </div>
                  
                  {/* Indicador */}
                  <div 
                    className="absolute top-1/2 h-8 w-3 bg-white border border-gray-300 rounded-full shadow-md transform -translate-y-1/2" 
                    style={{ left: `${Math.min(Math.max((bodyMassIndex - 15) / 25 * 100, 0), 100)}%` }}
                  ></div>
                </div>
                
                {/* Legenda da barra */}
                <div className="flex justify-between text-xs text-gray-600 px-1">
                  <span>Abaixo do peso</span>
                  <span className="font-medium">Peso ideal</span>
                  <span>Obesidade</span>
                </div>
              </div>

              {/* Informações do perfil em formato grid */}
              <div className="p-5 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 mt-0.5 text-[#7432B4]" />
                  <div>
                    <div className="text-sm text-gray-500">Nível de Atividade</div>
                    <div className="font-semibold text-gray-800">{getFitnessLevel()}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 mt-0.5 text-[#7432B4]" />
                  <div>
                    <div className="text-sm text-gray-500">Tipo de corpo</div>
                    <div className="font-semibold text-gray-800">
                      {bodyType === 'slim' ? 'Magro' : bodyType === 'average' ? 'Médio' : 'Robusto'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 mt-0.5 text-[#7432B4]" />
                  <div>
                    <div className="text-sm text-gray-500">Nível de Aptidão</div>
                    <div className="font-semibold text-gray-800">Intermediário</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Dumbbell className="w-5 h-5 mt-0.5 text-[#7432B4]" />
                  <div>
                    <div className="text-sm text-gray-500">Tempo disponível</div>
                    <div className="font-semibold text-gray-800">
                      {availableTime === 'less15' ? 'Menos de 15min' : 
                       availableTime === '15to30' ? '15-30min' : 'Mais de 30min'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar e Observação */}
              <div className="p-5 bg-[#F7F3FF] flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#7432B4] flex-shrink-0 overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src="/api/placeholder/200/200" 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    Seu IMC é {bodyMassIndex.toFixed(1)}, que é considerado <span className="font-semibold">{getBmiCategory(bodyMassIndex).category}</span>. Recomendamos atenção especial a exercícios específicos e cuidados para otimizar seus resultados.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Personalização e Objetivos - Colapsados, expandem ao clicar */}
            <div className="space-y-4 mb-8">
              <motion.details
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <summary className="p-4 cursor-pointer font-semibold text-[#2D1441] flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#7432B4]" />
                    Seus Objetivos
                  </span>
                  <span className="text-[#7432B4]">▼</span>
                </summary>
                <div className="p-4 pt-0 space-y-3">
                  {getSelectedGoals().map((goal, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#F7F3FF]">
                      <span className="text-xl">{goal.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-800">{goal.title}</h4>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.details>

              <motion.details
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                open={true}
              >
                <summary className="p-4 cursor-pointer font-semibold text-[#2D1441] flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-[#7432B4]" />
                    Seu Plano de Ação
                  </span>
                  <span className="text-[#7432B4]">▼</span>
                </summary>
                <div className="p-4 pt-0 space-y-3">
                  {getExerciseRecommendation().length > 0 ? (
                    getExerciseRecommendation().map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#F7F3FF]">
                        <span className="text-[#7432B4] font-bold">•</span>
                        <p className="text-gray-700">{rec}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F7F3FF]">
                        <span className="text-[#7432B4] font-bold">•</span>
                        <p className="text-gray-700">3 sessões semanais de 20-30 minutos de exercícios adaptados para seu perfil</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F7F3FF]">
                        <span className="text-[#7432B4] font-bold">•</span>
                        <p className="text-gray-700">Combinação de movimentos de força e flexibilidade para equilíbrio completo</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F7F3FF]">
                        <span className="text-[#7432B4] font-bold">•</span>
                        <p className="text-gray-700">Progressão personalizada baseada em seu histórico e objetivos</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.details>
            </div>

            {/* Botão */}
            <motion.button
              onClick={() => navigate('/plan-definitive')}
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

export default ProfileSummary;