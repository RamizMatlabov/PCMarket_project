import { CheckCircle, X } from 'lucide-react';

export default function AddToCartModal({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 shadow-xl max-w-sm w-full text-center">
        <div className="flex justify-center items-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mt-4">Товар добавлен в корзину!</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}