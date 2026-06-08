export default function TaskForm({ form, setForm, onSubmit, editingId, onCancel }) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <h2>{editingId ? 'Edit Task' : 'New Task'}</h2>
      <label>
        Title
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </label>
      <label>
        Description
        <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </label>
      <label>
        Status
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <label>
        Priority
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <label>
        Deadline
        <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
