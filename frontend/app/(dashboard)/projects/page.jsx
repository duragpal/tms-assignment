'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import api from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Users, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', color: COLORS[0] });

  const load = () => api.get('/projects').then((res) => setProjects(res.data));
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', form);
      toast.success('Project created! 🎉');
      setOpen(false);
      setForm({ name: '', description: '', color: COLORS[0] });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this project and all its tasks?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  if (!user) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-slate-500 mt-1">Manage all your projects</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-lg shadow-violet-200">
              <Plus className="w-4 h-4 mr-2" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={create} className="space-y-4">
              <div>
                <Label>Project Name</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Marketing Campaign"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What is this project about?"
                />
              </div>
              <div>
                <Label>Color</Label>
                <div className="flex gap-2 mt-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-9 h-9 rounded-full transition-all ${
                        form.color === c ? 'ring-4 ring-offset-2 ring-violet-300 scale-110' : ''
                      }`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
                Create Project
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <Card className="p-12 text-center border-0 shadow-md bg-white/90 backdrop-blur">
          <p className="text-slate-500">No projects yet. Create your first one! 🚀</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => {
            const canDelete = user.role === 'Admin' || p.owner._id === user._id;
            return (
              <Card
                key={p._id}
                className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 bg-white/90 backdrop-blur group p-0"
              >
                <div className="h-2" style={{ background: p.color }} />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Link href={`/projects/${p._id}`} className="flex-1">
                      <h3 className="font-bold text-lg hover:text-violet-600 transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                    {canDelete && (
                      <button
                        onClick={() => remove(p._id)}
                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 min-h-[40px]">
                    {p.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        p.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                          : p.status === 'Completed'
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                      }
                    >
                      {p.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Users className="w-4 h-4" />
                      {p.members.length}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}