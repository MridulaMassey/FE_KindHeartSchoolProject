import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://localhost:44361/api/auth/login'; // Replace with your actual API endpoint

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Login successful!',
          description: data.message || 'Welcome back to Kind Hearts',
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: data.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login error',
        description: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden animate-scale-in">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 z-[-1] rounded-lg opacity-50" />
      
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <Heart className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-md h-11"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Button variant="link" className="p-0 h-auto text-xs font-normal" type="button">
                Forgot password?
              </Button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-md h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button> */}
            </div>
          </div>
          
          <Button type="submit" className="w-full rounded-md h-11 mt-6" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          {/* <Button type="submit" className="w-full rounded-md h-11 mt-6" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
           */}
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col">
        <div className="text-sm text-center text-muted-foreground mt-2">
          Enter your registered credentials to log in.
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
