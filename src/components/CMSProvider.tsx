import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Button } from './ui/button';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';
import { checkExistingSession, signOut, onAuthStateChange } from '../utils/supabase/auth';

const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    let subscription: any;
    
    // Check session asynchronously without blocking (отложено для ускорения загрузки)
    const initAuth = async () => {
      try {
        const session = await checkExistingSession();
        if (session?.access_token) {
          setAccessToken(session.access_token);
          setShowAdminButton(true);
        }
      } catch (error) {
        // Игнорируем ошибки при загрузке
      }
    };
    
    // Увеличена задержка для приоритета основного контента
    timeoutId = window.setTimeout(() => {
      initAuth();
    }, 1000);
    
    // Listen to auth state changes (отложено)
    window.setTimeout(() => {
      try {
        const authListener = onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session?.access_token) {
            setAccessToken(session.access_token);
            setShowAdminButton(true);
          } else if (event === 'SIGNED_OUT') {
            setAccessToken(null);
            setIsAdminMode(false);
          }
        });
        subscription = authListener.data?.subscription;
      } catch (error) {
        // Игнорируем ошибки
      }
    }, 1500);
    
    // Show admin button on specific key combination (Ctrl+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdminButton(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogin = React.useCallback((token: string) => {
    setAccessToken(token);
    setIsAdminMode(true);
  }, []);

  const handleLogout = React.useCallback(async () => {
    try {
      await signOut();
      setAccessToken(null);
      setIsAdminMode(false);
      // Keep admin button visible if user manually accessed it
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const toggleAdminMode = () => {
    if (accessToken) {
      setIsAdminMode(!isAdminMode);
    } else {
      setIsAdminMode(true);
    }
  };

  if (isAdminMode && !accessToken) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (isAdminMode && accessToken) {
    return <AdminPanel onLogout={handleLogout} accessToken={accessToken} />;
  }

  return (
    <div className="relative">
      {children}
      
      {/* Admin Access Button */}
      {showAdminButton && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={toggleAdminMode}
            className="bg-gray-800 hover:bg-gray-900 text-white rounded-full p-3 shadow-lg"
            title={accessToken ? "Открыть админ-панель" : "Войти в админ-панель"}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      )}
      
      {/* Instruction for first-time users */}
      {!showAdminButton && !accessToken && (
        <div className="hidden">
          {/* Press Ctrl+Shift+A to access admin panel */}
        </div>
      )}
    </div>
  );
};

export default CMSProvider;