function formatDate(dateStr) {
  if (!dateStr) return 'No deadline';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function isOverdue(deadline, status) {
  if (!deadline || status === 'completed') return false;
  return new Date(deadline) < new Date();
}

export default function TaskList({ tasks, loading, onEdit, onDelete, onStatusChange }) {
  if (loading) return <p className="empty">Loading tasks...</p>;
  if (!tasks.length) return <p className="empty">No tasks found. Create your first task!</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article key={task._id} className={`task-card status-${task.status}`}>
          <div className="task-header">
            <h3>{task.title}</h3>
            <span className={`badge priority-${task.priority}`}>{task.priority}</span>
          </div>
          {task.description && <p className="task-desc">{task.description}</p>}
          <div className="task-meta">
            <span className={isOverdue(task.deadline, task.status) ? 'overdue' : ''}>
              Deadline: {formatDate(task.deadline)}
            </span>
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task, e.target.value)}
              className="status-select"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="task-actions">
            <button className="btn btn-sm" onClick={() => onEdit(task)}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
}
