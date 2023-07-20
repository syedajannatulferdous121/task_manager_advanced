// Task component for rendering individual tasks
const Task = ({ task, onComplete, onEdit, onDelete }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
      />
      <span>{task.title}</span>
      <button onClick={() => onEdit(task.id)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

// TaskManager component to manage tasks
class TaskManager extends React.Component {
  state = {
    tasks: [
      { id: 1, title: "Task 1", completed: false, dueDate: "2023-07-31", priority: "medium" },
      { id: 2, title: "Task 2", completed: false, dueDate: "2023-08-10", priority: "low" },
      // Add more tasks here
    ],
    newTaskTitle: "",
    filterCompleted: false,
  };

  handleCompleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  handleEditTask = (taskId) => {
    // Add logic to edit tasks
    console.log("Editing task with ID:", taskId);
  };

  handleDeleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));
  };

  handleCreateTask = () => {
    if (this.state.newTaskTitle) {
      const newTask = {
        id: Date.now(),
        title: this.state.newTaskTitle,
        completed: false,
        dueDate: "", // Add due date logic here
        priority: "medium", // Set default priority to medium
      };

      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        newTaskTitle: "",
      }));
    }
  };

  handleFilterCompleted = () => {
    this.setState((prevState) => ({
      filterCompleted: !prevState.filterCompleted,
    }));
  };

  render() {
    const { tasks, newTaskTitle, filterCompleted } = this.state;
    const filteredTasks = filterCompleted
      ? tasks.filter((task) => task.completed)
      : tasks;

    return (
      <div>
        <h2>Task Manager</h2>
        <div>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => this.setState({ newTaskTitle: e.target.value })}
          />
          <button onClick={this.handleCreateTask}>Add Task</button>
          <label>
            <input
              type="checkbox"
              checked={filterCompleted}
              onChange={this.handleFilterCompleted}
            />
            Show Completed Tasks
          </label>
        </div>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onComplete={this.handleCompleteTask}
            onEdit={this.handleEditTask}
            onDelete={this.handleDeleteTask}
          />
        ))}
      </div>
    );
  }
}

// Render the TaskManager component
ReactDOM.render(<TaskManager />, document.getElementById("root"));
