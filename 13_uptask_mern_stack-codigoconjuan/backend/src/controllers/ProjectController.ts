import type { Request, Response } from "express";
import Project from "../models/Project";
import { Types } from "mongoose";

export class ProjectController {
    static getAllProjects(req: Request, res: Response) {
        try {
            Project.find({
                // Empty object means that we want to get all projects
            }).then((projects) => {
                res.json(projects);
            }).catch((error) => {
                res.status(500).send(error);
            });
        } catch (error) {
            console.error(error);
        }
    }

    static createProject(req: Request, res: Response) {
        try {
            const project = new Project(req.body);
            project.save().then((project) => {
                res.send(project);
            }).catch((error) => {
                res.status(400).send(error);
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
    static getProjectById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            Project.findById(id)
                .then((project) => {
                    if (!project) {
                        return res.status(404).send("Project not found");
                    }
                    res.json(project);
                })
                .catch((error) => {
                    res.status(500).send(error);
                });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }

    static updateProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(Object.values(req.body).length===0){
                return res.status(400).send("Request body is empty");
            }
            Project.findByIdAndUpdate(id, req.body, { new: true })
                .then((project) => {
                    if (!project) {
                        return res.status(404).send("Project not found");
                    }
                    res.json(project);
                })
                .catch((error) => {
                    res.status(400).send(error);
                });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }

    static deleteProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!id||!Types.ObjectId.isValid(id)){
                return res.status(400).send("Invalid ID");
            }
            Project.findByIdAndDelete(id)
                .then((project) => {
                    if (!project) {
                        return res.status(404).send("Project not found");
                    }
                    res.send("Project deleted successfully");
                })
                .catch((error) => {
                    res.status(500).send(error);
                });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}