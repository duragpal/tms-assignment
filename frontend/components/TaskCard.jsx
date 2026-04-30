'use client';

import { toast } from 'sonner';
import api from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Calendar, Trash2, AlertCircle } from 'lucide-react';
import { format, isPast } from 'date-fns';
import { useAuth } from '@/context/AuthContext';

const priorityColors = {
  Low: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  Medium: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  High: 'bg-red-100 text-red-700 hover:bg-red-100',
};

export default function TaskCard({ task, onUpdate, canManage }) {
  const { user } = useAuth();
  const isAssignee = task.assignedTo?._id === user?._id;
  const canEdit = canManage || isAssignee;

  const overdue =
    task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'Done';

  const updateStatus = async (status) => {
    try {
      await api.put(`/tasks/${task._id}`, { status });
      toast.success('Task updated');
      onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const remove = async () => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success('Task deleted');
      onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-violet-100 group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-sm flex-1">{task.title}</h4>
        {canManage && (
          <button
            onClick={remove}
            className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {task.description && (
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge className={`${priorityColors[task.priority]} text-xs`}>
          {task.priority}
        </Badge>
        {overdue && (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
            <AlertCircle className="w-3 h-3 mr-1" /> Overdue
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {task.assignedTo && (
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-[10px] bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                {task.assignedTo.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          {task.dueDate && (
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(task.dueDate), 'MMM dd')}
            </span>
          )}
        </div>
        {canEdit && (
          <Select value={task.status} onValueChange={updateStatus}>
            <SelectTrigger className="h-7 text-xs w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todo">Todo</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}