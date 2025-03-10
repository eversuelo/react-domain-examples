import mongoose, { Document,Schema,PopulatedDoc,Types } from "mongoose";

export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<"Task"&Document>[];
}

const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: "Task",
        },
    ],
},{
    timestamps: true,
});

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;