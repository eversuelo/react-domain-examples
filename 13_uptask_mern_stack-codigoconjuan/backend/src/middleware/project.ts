import type { Request,Response,NextFunction } from "express";
import Project from "../models/Project";
export async function validateProjectExists(req: Request, res: Response, next: NextFunction) {
    try{
        const { projectId } = req.params;
        const project=await Project.findById(projectId);
        if(!project){
            return res.status(404).json({error:"Project not found"});
        }
        next();
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Failed to validate project"});
    }
 
    next();
}
