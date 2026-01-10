import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthModalContextType {
  showAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [shouldShow, setShouldShow] = useState(false);

  const showAuthModal = () => {
    setShouldShow(true);
    window.dispatchEvent(new CustomEvent('openAuthModal'));
  };

  return (
    <AuthModalContext.Provider value={{ showAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
}