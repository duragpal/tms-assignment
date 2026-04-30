'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Calendar, AlertCircle } from 'lucide-react';
import { format, isPast } from 'date-fns';

const statusColors = {
  Todo: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  'In Progress': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  Done: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
};

const priorityColors = {
  Low: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  Medium: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  High: 'bg-red-100 text-red-700 hover:bg-red-100',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const load = () => api.get('/tasks').then((res) => setTasks(res.data));
  useEffect(() => { load(); }, []);

  const filtered = tasks.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'overdue')
      return t.dueDate && isPast(new Date(t.dueDate)) && t.status !== 'Done';
    return t.status === filter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            All Tasks
          </h1>
          <p className="text-slate-500 mt-1">Track everything in one place</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="Todo">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center border-0 shadow-md bg-white/90 backdrop-blur">
          <p className="text-slate-500">No tasks found</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => {
            const overdue =
              task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'Done';
            return (
              <Card
                key={task._id}
                className="p-4 border-0 shadow-sm hover:shadow-md transition-all bg-white/90 backdrop-blur"
              >
                <div className="flex items-center gap-4 flex-wrap">
                  <div
                    className="w-1.5 h-12 rounded-full"
                    style={{ background: task.project?.color || '#8b5cf6' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{task.title}</h3>
                      {overdue && (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" /> Overdue
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">{task.project?.name}</p>
                  </div>
                  <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                  <Badge className={statusColors[task.status]}>{task.status}</Badge>
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-sm text-slate-500 min-w-[80px]">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(task.dueDate), 'MMM dd')}
                    </div>
                  )}
                  {task.assignedTo && (
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                          {task.assignedTo.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignedTo.name}</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}