import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilters from '../components/TaskFilters';

const emptyForm = { title: '', description: '', status: 'pending', priority: 'medium', deadline: '' };

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
    const res = await taskAPI.getAll(params);
    if (res.success) setTasks(res.data);
    setLoading(false);
  }, [filters]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, deadline: form.deadline || undefined };
    const res = editingId
      ? await taskAPI.update(editingId, payload)
      : await taskAPI.create(payload);

    if (res.success) {
      setMessage(editingId ? 'Task updated' : 'Task created');
      setForm(emptyForm);
      setEditingId(null);
      fetchTasks();
    } else {
      setMessage(res.message);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      deadline: task.deadline ? task.deadline.slice(0, 10) : '',
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    const res = await taskAPI.delete(id);
    if (res.success) fetchTasks();
  };

  const handleStatusChange = async (task, status) => {
    await taskAPI.update(task._id, { status });
    fetchTasks();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1>Task Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button className="btn btn-outline" onClick={logout}>Logout</button>
      </header>

      {message && <div className="alert alert-success">{message}</div>}

      <div className="dash-grid">
        <aside className="sidebar">
          <TaskForm
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            editingId={editingId}
            onCancel={cancelEdit}
          />
        </aside>

        <section className="main-content">
          <TaskFilters filters={filters} setFilters={setFilters} />
          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </section>
      </div>
    </div>
  );
}
