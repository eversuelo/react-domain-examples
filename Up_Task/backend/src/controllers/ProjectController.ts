import type { Request,Response} from "express";
export class ProjectController{
    static getAllProjects(req: Request, res: Response){
        res.send("Get all projects");
    }
}