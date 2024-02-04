"use client"
import {useState,useEffect} from 'react';
import {useRouter,useSearchParams} from 'next/navigation';
import Form from '@/components/Form';

function EditPrompt() {
    const searchParams=useSearchParams();
    const router=useRouter();
    const [submitting,setSubmitting]=useState(false);
    const [post,setPost]=useState({prompt:'',tag:'',});
    const promptId=searchParams.get('id');
    
    useEffect(()=>{
        const getPromptDetails=async()=>{
            const res=await fetch(`/api/prompt/${promptId}`);
            const data=await res.json();
            setPost({
                prompt:data.prompt,
                tag:data.tag,
            })
          console.log(data);
            
        }
        if(promptId){
          
          getPromptDetails();
        }
    },[promptId])

    const updatePrompt=async(e)=>{
      e.preventDefault();
      setSubmitting(true);
      if(!promptId){
        return alert("promptId not found");
      }
      try{
        const res=await fetch(`/api/prompt/${promptId}`,{
          method:'PATCH',
          body:JSON.stringify({
            prompt:post.prompt,
            tag:post.tag,
          })
        })
        if(res.ok){
          router.push('/');
        }
      }
      catch(error){
        console.log(error);
      }
      finally{
        setSubmitting(false);
      }
    }

  return (
    <Form 
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}/>
    
  )
}

export default EditPrompt