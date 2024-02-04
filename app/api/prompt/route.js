import {connectDB} from '../../../utils/database';
import Prompt from '../../../models/prompt';
import User from '../../../models/user';
export const GET=async(req)=>{
    try{
        await connectDB();
        const prompts=await Prompt.find({}).populate('creator');
        
        return new Response(JSON.stringify(prompts),{
            status:200
        })
        //return NextResponse.json({prompts});
    }
    catch(error){
        // return new Response("failed to fetch prompts",{status:500});
        console.log(error);
    }
}