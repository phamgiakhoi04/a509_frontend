import { useState } from "react";

import LoginForm from "./Login";
import RegisterForm from "./Register";
import ForgotPasswordForm from "./ForgotPassword";

type ViewState = "LOGIN" | "REGISTER" | "FORGOT";

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [view, setView] = useState<ViewState>("LOGIN");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-redDark/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-brand-yellow">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-brand-bg text-brand-redDark hover:bg-brand-red hover:text-white font-black transition-colors z-10"
        >
          ✕
        </button>

        <div className="p-8 pt-10">
          {view === "LOGIN" && (
            <LoginForm 
              onSuccess={onLoginSuccess}
              onClose={onClose}
              onSwitchRegister={() => setView("REGISTER")}
              onSwitchForgot={() => setView("FORGOT")}
            />
          )}

          {view === "REGISTER" && (
            <RegisterForm 
              onSwitchLogin={() => setView("LOGIN")}
            />
          )}

          {view === "FORGOT" && (
            <ForgotPasswordForm 
              onSwitchLogin={() => setView("LOGIN")}
            />
          )}
        </div>
      </div>
      
      <style>{`
        .input-style {
          width: 100%;
          border-radius: 1rem;
          background-color: #f9f7f2;
          border: 2px solid transparent;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: #5D4037;
          outline: none;
          transition: all 0.2s;
        }
        .input-style:focus {
          border-color: #C0392B;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(192, 57, 43, 0.1);
        }
        .input-style::placeholder {
          color: #a89f91;
          font-weight: 600;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 4px; }
      `}</style>
    </div>
  );
}