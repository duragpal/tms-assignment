'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Sparkles } from 'lucide-react';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'Member',
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form);
      toast.success('Account created! 🎉');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50">
      <Card className="w-full max-w-md p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-amber-500 flex items-center justify-center shadow-lg shadow-fuchsia-200">
            <Sparkles className="text-white w-8 h-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-fuchsia-600 to-amber-600 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-center text-slate-500 mb-6 mt-1">Start managing your projects</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password">Password (min 6 chars)</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div>
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm({ ...form, role: v })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Member">Member</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fuchsia-500 to-amber-500 hover:from-fuchsia-600 hover:to-amber-600 shadow-lg shadow-fuchsia-200"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </Button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6">
          Have an account?{' '}
          <Link href="/login" className="text-fuchsia-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}