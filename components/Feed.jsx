"use client";
import {useState,useEffect} from "react";
import PromptCard from './promptCard';
const PromptCardList=({data,handleTagClick})=>{
  
  return(
    <div className="mt-16 sm:columns-2 xl:columns-3 space-y-6">
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
      
    </div>
  )
}
function Feed() {
  const [search,setSearch]=useState("");
  const [posts,setPosts]=useState([]);
  const [term,setTerm]=useState([]);
  const [searchTime,setSearchTime]=useState(null);
  const fetchPosts=async()=>{
    const res=await fetch("/api/prompt");
    const data=await res.json();
    setPosts(data);
    
  }
  useEffect(()=>{
    fetchPosts();
  },[])
  const filterPrompt=(search)=>{
    // return posts.filter((val)=>{
    //   val.prompt.toLowerCase().includes(search.toLowerCase())
    // })
    const regex = new RegExp(search, "i"); 
    return posts.filter(
      (item) =>
        regex.test(item.creator[0].userName) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }
  const handleSearch=async(e)=>{
    e.preventDefault();
    clearTimeout(searchTime);
    setSearch(e.target.value);
    setSearchTime(
      setTimeout(()=>{
        const result=filterPrompt(e.target.value);
        setTerm(result);
      },500)
    )
  }
  const handleTagClick=()=>{

  }
  return (
    <div className="w-full mt-14">
      <form className="w-full">
        <input type='text'
        value={search}
        onChange={handleSearch}
        placeholder="search for a tag or a username"
        className="w-full p-3 border border-gray-200 shadow-lg
        outline-none"/>
      </form>
      {search?(
        <PromptCardList
        data={term}
        handleTagClick={handleTagClick}/>
      ):(
        <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}/>
      )}
    </div>
  )
}

export default Feed