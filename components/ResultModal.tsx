
import React from 'react';
import { Prize } from '../types';

interface ResultModalProps {
  prize: Prize;
  message: string;
  onClose: () => void;
  isLoading: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({ prize, message, onClose, isLoading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-bounce-in">
        <div className="bg-gradient-to-b from-blue-800 to-blue-900 p-8 text-center text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner border-4 border-white">
            <i className={`fas ${prize.icon} text-3xl text-blue-900`}></i>
          </div>
          
          <h2 className="text-2xl font-bold mb-1">恭喜中獎！</h2>
          <p className="text-blue-100 opacity-90">2026 台中寵物用品展限定</p>
        </div>
        
        <div className="p-8 text-center">
          <div className="mb-6">
            <h3 className="text-3xl font-black text-gray-800 mb-2">
              {prize.label}
            </h3>
            <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-6 text-left relative min-h-[120px]">
            <div className="absolute -top-3 left-6 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
              <i className="fas fa-robot mr-2"></i> Wilson AI 小叮嚀
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2 py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-blue-600 text-sm font-medium">正在生成專家建議...</p>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed italic">
                「{message}」
              </p>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="mt-8 w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95"
          >
            領取獎項
          </button>
          
          <p className="mt-4 text-xs text-gray-400">
            * 獎項請至威笙寵物用品攤位服務台兌換
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
