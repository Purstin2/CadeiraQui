import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import Header from './Header';
import AnimatedPage from './AnimatedPage';

const BMICalculator: React.FC = () => {
  const navigate = useNavigate();
  const { setBodyMassIndex } = useQuiz();

  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [targetWeight, setTargetWeight] = useState(60);

  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmiColor, setBmiColor] = useState('text-yellow-500');

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    const h = height / 100;
    const result = weight / (h * h);
    const rounded = parseFloat(result.toFixed(1));
    setBmi(rounded);

    if (result < 18.5) {
      setBmiCategory('Abaixo do peso');
      setBmiColor('text-blue-500');
    } else if (result < 25) {
      setBmiCategory('Peso ideal');
      setBmiColor('text-emerald-500');
    } else if (result < 30) {
      setBmiCategory('Sobrepeso');
      setBmiColor('text-yellow-500');
    } else if (result < 35) {
      setBmiCategory('Obesidade I');
      setBmiColor('text-orange-500');
    } else {
      setBmiCategory('Obesidade II+');
      setBmiColor('text-red-500');
    }
  };

  const handleNext = () => {
    if (bmi) {
      setBodyMassIndex(bmi);
      navigate('/profile-summary');
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 px-5 py-6 max-w-xl w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-2xl font-bold text-[#2D1441] mb-1"
          >
            Vamos montar seu perfil
          </motion.h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Informe sua altura e peso atual
          </p>

          <div className="bg-[#F8F7FA] rounded-2xl p-5 shadow-sm mb-6 space-y-6">
            {/* Altura */}
            <div>
              <label className="text-gray-700 font-medium">Altura</label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">140 cm</span>
                <span className="bg-[#7432B4] text-white px-3 py-1 rounded-md text-sm">{height} cm</span>
                <span className="text-sm text-gray-500">220 cm</span>
              </div>
              <input
                type="range"
                min="140"
                max="220"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full custom-slider"
              />
            </div>

            {/* Peso atual */}
            <div>
              <label className="text-gray-700 font-medium">Peso atual</label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">40 kg</span>
                <span className="bg-[#7432B4] text-white px-3 py-1 rounded-md text-sm">{weight} kg</span>
                <span className="text-sm text-gray-500">150 kg</span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full custom-slider"
              />
            </div>
          </div>

          {/* IMC resultado */}
          {bmi && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-[#7432B4]/10 to-[#7432B4]/5 rounded-xl p-4 mb-6 text-center"
            >
              <div className={`text-xl font-bold ${bmiColor}`}>IMC: {bmi}</div>
              <div className="text-sm text-gray-600">{bmiCategory}</div>
            </motion.div>
          )}

          {/* Peso alvo */}
          <div className="bg-[#F8F7FA] rounded-2xl p-5 shadow-sm mb-6">
            <label className="text-gray-700 font-medium">Objetivo de peso</label>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">40 kg</span>
              <span className="bg-[#7432B4] text-white px-3 py-1 rounded-md text-sm">{targetWeight} kg</span>
              <span className="text-sm text-gray-500">{weight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max={weight}
              value={targetWeight}
              onChange={(e) => setTargetWeight(parseInt(e.target.value))}
              className="w-full custom-slider"
            />

            {weight > targetWeight && (
              <div className="mt-4 text-[#7432B4] text-sm text-center">
                Meta: perder <span className="font-semibold">{weight - targetWeight} kg</span>
              </div>
            )}
          </div>

          {/* Mensagem de incentivo */}
          <div className="bg-[#7432B4]/10 text-[#7432B4] rounded-xl p-4 text-sm flex items-start gap-2 mb-6">
            <Heart className="w-5 h-5 mt-0.5" />
            <p>
              Perder <strong>10%</strong> do peso pode gerar grandes benefícios para sua saúde. Pequenas metas, grandes resultados.
            </p>
          </div>

          {/* Botão de continuar */}
          <motion.button
            onClick={handleNext}
            className="w-full bg-[#7432B4] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#6822A6] transition-colors shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continuar
          </motion.button>
        </main>

        {/* Slider style */}
        <style>{`
          .custom-slider {
            appearance: none;
            height: 6px;
            background: #E0D6F2;
            border-radius: 9999px;
            outline: none;
          }

          .custom-slider::-webkit-slider-thumb {
            appearance: none;
            height: 22px;
            width: 22px;
            background: #7432B4;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: background 0.2s;
          }

          .custom-slider::-moz-range-thumb {
            height: 22px;
            width: 22px;
            background: #7432B4;
            border: none;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
          }

          .custom-slider:focus::-webkit-slider-thumb {
            background: #5c2495;
          }
        `}</style>
      </div>
    </AnimatedPage>
  );
};

export default BMICalculator;