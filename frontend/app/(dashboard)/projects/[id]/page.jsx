'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import api from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import TaskCard from '@/components/TaskCard';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [openTask, setOpenTask] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', assignedTo: '', priority: 'Medium', dueDate: '',
  });
  const [memberId, setMemberId] = useState('');

  const load = async () => {
    try {
      const [proj, t, u] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks?project=${id}`),
        api.get('/users'),
      ]);
      setProject(proj.data);
      setTasks(t.data);
      setUsers(u.data);
    } catch (err) {
      toast.error('Failed to load project');
    }
  };

  useEffect(() => { if (id) load(); }, [id]);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { ...form, project: id });
      toast.success('Task created! ✅');
      setOpenTask(false);
      setForm({ title: '', description: '', assignedTo: '', priority: 'Medium', dueDate: '' });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const addMember = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/projects/${id}/members`, { userId: memberId });
      toast.success('Member added! 👥');
      setOpenMember(false);
      setMemberId('');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  if (!project || !user) return <div className="text-slate-500">Loading...</div>;

  const isOwner = project.owner._id === user._id;
  const canManage = isOwner || user.role === 'Admin';

  const columns = [
    { key: 'Todo', title: 'To Do', color: 'from-amber-400 to-orange-400' },
    { key: 'In Progress', title: 'In Progress', color: 'from-blue-400 to-cyan-400' },
    { key: 'Done', title: 'Done', color: 'from-emerald-400 to-teal-400' },
  ];

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-12 rounded-full" style={{ background: project.color }} />
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-slate-500">{project.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {canManage && (
              <Dialog open={openMember} onOpenChange={setOpenMember}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" /> Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={addMember} className="space-y-4">
                    <Select value={memberId} onValueChange={setMemberId}>
                      <SelectTrigger><SelectValue placeholder="Select user" /></SelectTrigger>
                      <SelectContent>
                        {users
                          .filter((u) => !project.members.find((m) => m._id === u._id))
                          .map((u) => (
                            <SelectItem key={u._id} value={u._id}>
                              {u.name} ({u.email})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
                      Add to Project
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            <Dialog open={openTask} onOpenChange={setOpenTask}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600">
                  <Plus className="w-4 h-4 mr-2" /> New Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Task</DialogTitle></DialogHeader>
                <form onSubmit={createTask} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Task title"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Assignee</Label>
                      <Select value={form.assignedTo} onValueChange={(v) => setForm({ ...form, assignedTo: v })}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {project.members.map((m) => (
                            <SelectItem key={m._id} value={m._id}>{m.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    Create Task
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="p-4 border-0 shadow-sm bg-white/90 backdrop-blur">
          <p className="text-sm font-semibold mb-2">Team Members</p>
          <div className="flex flex-wrap gap-2">
            {project.members.map((m) => (
              <div key={m._id} className="flex items-center gap-2 bg-violet-50 rounded-full pl-1 pr-3 py-1">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-xs bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                    {m.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{m.name}</span>
                {m._id === project.owner._id && (
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">Owner</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key}>
              <div className={`bg-gradient-to-r ${col.color} rounded-t-xl p-4 text-white shadow-md`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{col.title}</h3>
                  <span className="bg-white/30 backdrop-blur rounded-full px-2.5 py-0.5 text-sm font-semibold">
                    {colTasks.length}
                  </span>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-b-xl p-3 min-h-[200px] space-y-3 border border-t-0 border-violet-100">
                               {colTasks.map((task) => (
                  <TaskCard key={task._id} task={task} onUpdate={load} canManage={canManage} />
                ))}
                {colTasks.length === 0 && (
                  <p className="text-center text-sm text-slate-400 py-8">No tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}