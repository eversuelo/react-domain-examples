import type { Request, Response } from "express";
import Task from "../models/Task";
import { Types } from "mongoose";
export class TaskController {
    /**
     * Get all tasks by project.id.
     */
    static async getAllTasks(req: Request, res: Response) {
        try {

            const project = req.project;
            if (!project) {
                return res.status(404).json({ error: "Project not found in taskController" });
            }
            const tasks = await Task.find({ project: project.id });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve tasks" });
            console.error(error);
        }
    }

    /**
     * Create a new task for a project.
     */
    static async createTask(req: Request, res: Response) {
        try {

            if (!req.project) {
                return res.status(404).json({ error: "Project not found in taskController" });
            }
            const { name, description, status } = req.body;
            const taskData = { name, description, project: req.project._id, status };
            const newTask = new Task(taskData);
            req.project.tasks.push(newTask._id as Types.ObjectId);

            const result = await Promise.allSettled([await newTask.save(), await req.project.save()]);
            if (result.some((r) => r.status === "rejected")) {
                return res.status(400).json({ error: "Failed to create task" });
            }

            return res.status(201).json({ message: "Task created",result }); 
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to create task" });
        }
    }

    /**
     * Get a specific task by taskId.
     */
    static async getTaskById(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const project = req.project;
            if (!project) {
                return res.status(404).json({ error: "Project not found in taskController" });
            }
            
            if (!req.task) {
                return res.status(404).json({ error: "Task not found" });
            }
            if(req.task.project.toString() !== project.id.toString()){
                return res.status(404).json({ error: "Task not found in project" });
            }
            res.json(req.task);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve task" });
        }
    }

    /**
     * Update an existing task.
     */
    static async updateTask(req: Request, res: Response) {
        try {
            const project = req.project;
            if (!project) {
                return res.status(404).json({ error: "Project not found in taskController" });
            }
            
            // Use req.task from middleware
            if (!req.task) {
                return res.status(404).json({ error: "Task not found" });
            }
            
            // Verify task belongs to project
            if (req.task.project.toString() !== project.id.toString()) {
                return res.status(404).json({ error: "Task not found in this project" });
            }
            
            // Update the task
            Object.assign(req.task, req.body);
            const updatedTask = await req.task.save();
            
            return res.json(updatedTask);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to update task" });
        }
    }

    /**
     * Delete a task.
     */
    static async deleteTask(req: Request, res: Response) {
        try {
            const project = req.project;
            if (!project) {
                return res.status(404).json({ error: "Project not found in taskController" });
            }
            const { taskId } = req.params;
            const task = await Task.find({ _id: taskId, project: project.id });
            if (!task) {
                const tasksDeleted = project.tasks.find((t) => t.toString() == taskId);
                if (tasksDeleted) {
                    project.tasks = project.tasks.filter((t) => t.toString() !== taskId);
                    const savedProject = await project.save();
                    if (!savedProject) {
                        return res.status(400).json({ error: "Failed to unlink task from project, but array was updated" });
                    }
                    return res.status(404).json({ error: "Task not found" });
                } else
                    return res.status(404).json({ error: "Task not found" });
            } else {
                const deletedTask = await Task.deleteOne({ _id: taskId });
                if (!deletedTask) {
                    return res.status(400).json({ error: "Failed to delete task" });
                }
                project.tasks = project.tasks.filter((t) => t.toString() !== taskId);
                const savedProject = await project.save();
                if (!savedProject) {
                    return res.status(400).json({ error: "Failed to unlink task from project, but task was deleted" });
                }

                res.json({ message: "Task deleted" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to delete task" });
        }
    }
    static async getProjectTasks(req: Request, res: Response) {
        try {
            const project = req.project;
            if (!project) {
                return res.status(404).json({ error: "Project not found in taskController" });
            }
            const tasks = await Task.find({ project: project._id }).populate('project');
            console.log('Retrieved tasks:', tasks);
            return res.json(tasks);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to retrieve tasks" });
        }
    }
};