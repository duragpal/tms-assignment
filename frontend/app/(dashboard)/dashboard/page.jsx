'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  ListTodo, Loader2, CheckCircle2, AlertTriangle, FolderKanban, TrendingUp,
} from 'lucide-react';

const statCards = [
  { key: 'total', label: 'Total Tasks', icon: ListTodo, gradient: 'from-violet-500 to-purple-500' },
  { key: 'inProgress', label: 'In Progress', icon: Loader2, gradient: 'from-blue-500 to-cyan-500' },
  { key: 'done', label: 'Completed', icon: CheckCircle2, gradient: 'from-emerald-500 to-teal-500' },
  { key: 'overdue', label: 'Overdue', icon: AlertTriangle, gradient: 'from-red-500 to-rose-500' },
  { key: 'projectCount', label: 'Projects', icon: FolderKanban, gradient: 'from-fuchsia-500 to-pink-500' },
  { key: 'todo', label: 'To Do', icon: TrendingUp, gradient: 'from-amber-500 to-orange-500' },
];

export default function DashboardPage() {
  const [data, setData] = useState({ stats: {}, recentTasks: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/dashboard/stats')
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-slate-500">Loading...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's your overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {statCards.map(({ key, label, icon: Icon, gradient }) => (
          <Card
            key={key}
            className="p-6 border-0 shadow-md hover:shadow-xl transition-shadow bg-white/90 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="text-3xl font-bold mt-1">{data.stats[key] || 0}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-0 shadow-md bg-white/90 backdrop-blur">
        <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>
        {data.recentTasks?.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No tasks yet</p>
        ) : (
          <div className="space-y-3">
            {data.recentTasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-violet-50 to-fuchsia-50 hover:from-violet-100 hover:to-fuchsia-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-12 rounded-full"
                    style={{ background: task.project?.color || '#8b5cf6' }}
                  />
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-slate-500">
                      {task.project?.name} • {task.assignedTo?.name || 'Unassigned'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {task.dueDate && (
                    <span className="text-xs text-slate-500">
                      {format(new Date(task.dueDate), 'MMM dd')}
                    </span>
                  )}
                  <Badge
                    className={
                      task.status === 'Done'
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                        : task.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                    }
                  >
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}