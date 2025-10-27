import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { checkExistingSession, signInWithPassword } from '../utils/supabase/auth';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminLoginProps {
  onLogin: (accessToken: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up new admin user
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f7a2cc63/auth/signup`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }),
        });

        if (response.ok) {
          toast.success('Аккаунт создан! Теперь войдите в систему.');
          setIsSignUp(false);
          setFormData({ email: formData.email, password: '', name: '' });
        } else {
          const error = await response.json();
          throw new Error(error.error || 'Ошибка регистрации');
        }
      } else {
        // Sign in existing user
        const { data, error } = await signInWithPassword(formData.email, formData.password);

        if (error) {
          throw new Error(error.message);
        }

        if (data.session?.access_token) {
          toast.success('Добро пожаловать в админ-панель!');
          onLogin(data.session.access_token);
        } else {
          throw new Error('Не удалось получить токен доступа');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error instanceof Error ? error.message : 'Ошибка аутентификации');
    } finally {
      setLoading(false);
    }
  };

  const handleExistingSession = async () => {
    const session = await checkExistingSession();
    if (session?.access_token) {
      onLogin(session.access_token);
    }
  };

  // Check for existing session on component mount
  React.useEffect(() => {
    handleExistingSession();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isSignUp ? 'Создать аккаунт администратора' : 'Вход в админ-панель'}
          </CardTitle>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Создайте аккаунт для управления контентом' 
              : 'WeddingTravel CMS'
            }
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required={isSignUp}
                  placeholder="Ваше имя"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                placeholder="admin@weddingtravel.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {isSignUp && (
                <p className="text-xs text-gray-500 mt-1">
                  Минимум 6 символов
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isSignUp ? 'Создание...' : 'Вход...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  {isSignUp ? 'Создать аккаунт' : 'Войти'}
                </div>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({ email: '', password: '', name: '' });
                }}
                className="text-sm text-rose-600 hover:text-rose-700"
                disabled={loading}
              >
                {isSignUp 
                  ? 'Уже есть аккаунт? Войти' 
                  : 'Нет аккаунта? Создать'
                }
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;