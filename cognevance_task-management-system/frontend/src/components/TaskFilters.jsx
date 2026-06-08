export default function TaskFilters({ filters, setFilters }) {
  return (
    <div className="filters">
      <input
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
