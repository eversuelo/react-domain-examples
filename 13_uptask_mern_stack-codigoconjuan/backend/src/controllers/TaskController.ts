import type { Request, Response } from "express";
import Task from "../models/Task";
import Project from "../models/Project";
import { Types } from "mongoose";
export class TaskController {
    /**
     * Get all tasks by projectId.
     */
    static async getAllTasks(req: Request, res: Response) {
        try {
            const { projectId } = req.params;
            if (!Types.ObjectId.isValid(projectId)) {
                return res.status(400).json({ error: "Invalid project ID" });
            }
            const project=await Project.findById(projectId);
            if(!project){
                return res.status(404).json({error:"Project not found"});
            }
            const tasks = await Task.find({ project: projectId });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve tasks" });
        }
    }

    /**
     * Create a new task for a project.
     */
    static async createTask(req: Request, res: Response) {
        try {
            const { projectId } = req.params;
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ error: "Project not found" });
            }
            const { name, description, status } = req.body;
            const taskData = { name, description, project: project._id, status };
            const newTask = new Task(taskData);
            const result = await newTask.save();
            if (!newTask) {
                return res.status(400).json({ error: "Failed to create task" });
            }

            project.tasks.push(newTask._id as Types.ObjectId);
            const save=await project.save();
            if(!save){
                return res.status(400).json({ error: "Failed to link task to project, but task was created" ,task:newTask}); 
            }
            res.status(201).json(newTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create task" });
        }
    }

    /**
     * Get a specific task by taskId.
     */
    static async getTaskById(req: Request, res: Response) {
        try {
            const { projectId, taskId } = req.params;
            const task = await Task.findOne({ _id: taskId, project: projectId });
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve task" });
        }
    }

    /**
     * Update an existing task.
     */
    static async updateTask(req: Request, res: Response) {
        try {
            const { projectId, taskId } = req.params;
            const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId, project: projectId },
                req.body,
                { new: true }
            );
            if (!updatedTask) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: "Failed to update task" });
        }
    }

    /**
     * Delete a task.
     */
    static async deleteTask(req: Request, res: Response) {
        try {
            const { projectId, taskId } = req.params;
            const deletedTask = await Task.findOneAndDelete({ _id: taskId, project: projectId });
            if (!deletedTask) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete task" });
        }
    }
};