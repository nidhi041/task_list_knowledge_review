// src/components/TaskForm.jsx
// You need to write the code for TaskForm component in the TaskForm.jsx file.

import { useState } from "react";

export default function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        dueDate: "",
        priority: "Medium",
        status: "To Do",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!task.title || !task.dueDate) {
            setError("All fields are required.");
            return;
        }
        setError("");

        // Send data to backend
        try {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                alert("Task added successfully!");
                setTask({ title: "", dueDate: "", priority: "Medium", status: "To Do" });
            } else {
                alert("Failed to add task.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding task.");
        }
    };

    return (
        <div>
            <h2>Add a New Task</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    required
                />
                <select name="priority" value={task.priority} onChange={handleChange}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select name="status" value={task.status} onChange={handleChange}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}
