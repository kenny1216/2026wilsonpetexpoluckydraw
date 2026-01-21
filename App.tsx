
import React, { useState } from 'react';
import Wheel from './components/Wheel';
import ResultModal from './components/ResultModal';
import { Prize, ResultState } from './types';
import { getPetTip } from './services/geminiService';
import { PRIZES } from './constants';

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<ResultState>({
    prize: null,
    geminiMessage: '',
    isLoading: false
  });

  const handleSpinResult = async (prize: Prize) => {
    if (prize.label === "再轉一次") {
      alert("太幸運了！恭喜獲得額外機會，再轉一次吧！");
      return;
    }

    setResult({ prize, geminiMessage: '', isLoading: true });
    setShowModal(true);

    try {
      const tip = await getPetTip(prize);
      setResult(prev => ({ ...prev, geminiMessage: tip, isLoading: false }));
    } catch (error) {
      setResult(prev => ({ ...prev, isLoading: false }));
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b py-6 px-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-900 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-paw text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-900 tracking-tight leading-none">威笙寵物用品</h1>
              <p className="text-sm font-medium text-blue-600 mt-1 uppercase tracking-widest">Wilson Pet Supplies</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
              2026 台中寵物用品展
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 text-blue-100 opacity-20 -rotate-12 select-none">
          <i className="fas fa-dog text-9xl"></i>
        </div>
        <div className="absolute bottom-20 right-10 text-blue-100 opacity-20 rotate-12 select-none">
          <i className="fas fa-cat text-9xl"></i>
        </div>

        <div className="z-10 text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 drop-shadow-sm">
            幸運大轉盤
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-lg">
            專業美容，威笙領航。歡迎參加我們的展場抽獎，人人有獎！
          </p>
        </div>

        <Wheel 
          onResult={handleSpinResult} 
          isSpinning={isSpinning} 
          setIsSpinning={setIsSpinning} 
        />

        {/* Prize List Preview */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 pb-12">
          {PRIZES.map((p) => (
            <div key={p.id} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: p.color }}
              >
                <i className={`fas ${p.icon}`}></i>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-700 leading-tight">{p.label}</span>
                <span className="text-xs text-gray-400">機率 {p.probability}%</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm mb-2">© 2026 威笙寵物用品 Wilson Pet Supplies. All Rights Reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-line"></i></a>
          </div>
        </div>
      </footer>

      {showModal && result.prize && (
        <ResultModal 
          prize={result.prize} 
          message={result.geminiMessage} 
          onClose={closeModal} 
          isLoading={result.isLoading}
        />
      )}
    </div>
  );
};

export default App;
