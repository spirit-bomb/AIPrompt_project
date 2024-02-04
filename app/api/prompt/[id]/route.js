import {connectDB} from '../../../../utils/database';
import Prompt from '../../../../models/prompt';

export const GET=async(req,{params})=>{
    try{
        await connectDB();
        const prompt=await Prompt.findById(params.id).populate('creator');
        if(!prompt){
            return new Response("prompt not found",{status:404});
        }
        return new Response(JSON.stringify(prompt),{status:200});
    }
    catch(error){
        console.log(error);
    }
}

export const PATCH=async(req,{params})=>{
    try{
        await connectDB();
        const {prompt,tag}=await req.json();
        const existingPrompt=await Prompt.findById(params.id);
        if(!existingPrompt){
            return new Response("Prompt not found",{status:404});
        }
        else{
            existingPrompt.prompt=prompt;
            existingPrompt.tag=tag;
            await existingPrompt.save();
            return new Response(JSON.stringify(existingPrompt),{status:200})
        }
    }
    catch(error){
        console.log(error);
    }
}

export const DELETE=async(req,{params})=>{
    try{
        await connectDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("prompt deleted successfully",{status:200})   
    }
    catch(error){
        console.log(error); 
    }
}