import type { Request,Response,NextFunction } from "express";
import Project, { IProject } from "../models/Project";
declare global {
    namespace Express {
        interface Request {
            project: IProject;
        }
    }
}

export async function validateProjectExists(req: Request, res: Response, next: NextFunction) {
    try{
        const { projectId } = req.params;
        console.info("Validating project exists",req);
        const project=await Project.findById(projectId);
        if(!project){
            return res.status(404).json({error:"Project not found"});
        }
        req.project=project;
        next();
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Failed to validate project"});
    }
    // Removing the unconditional next() call that was here
}
