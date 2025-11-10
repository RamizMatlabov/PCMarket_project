import { useState } from 'react';
import { X, User, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function AuthRequiredModal({ show, onClose, action = 'добавить товар в корзину' }) {
  const [isClosing, setIsClosing] = useState(false);

  if (!show) {
    return null;
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-slate-800 rounded-lg p-8 shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <User className="h-6 w-6 mr-2 text-blue-400" />
            Требуется авторизация
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Для продолжения необходимо войти в систему
          </h3>
          <p className="text-slate-300 text-sm">
            Чтобы {action}, пожалуйста, авторизуйтесь в системе или создайте новый аккаунт.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/login"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            onClick={handleClose}
          >
            <LogIn className="h-5 w-5 mr-2" />
            Войти в систему
          </Link>
          
          <Link
            href="/register"
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            onClick={handleClose}
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Создать аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
}