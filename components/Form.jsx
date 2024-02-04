import Link from 'next/link';

function Form({type,post,setPost,submitting,handleSubmit}) {
  return (
    <section className="w-full  flex flex-col">
        <div className="text-5xl font-extrabold text-left py-4 sm:text-6xl ">
            <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
                {type} Post
            </span>
        </div>
        <p className="mt-3 text-gray-600">
            {type} and share amazing prompts with the world, and
            let your imagination run wild with any AI powered platform.
        </p>
        <form className="mt-9 w-full gap-2 flex flex-col rounded-xl border
         border-gray-200 bg-white/20 shadow-lg backdrop-blur p-5"
         onSubmit={handleSubmit}>
          <span className="font-medium ">
            Your AI prompt
          </span>
          <textarea placeholder="Write your prompt here..."
          value={post.prompt}
          onChange={(e)=>setPost({...post,prompt:e.target.value})}
          required
          className="p-4 outline-none rounded-lg text-sm text-gray-500 h-[150px] mt-2">
          </textarea>

          <span className="font-medium mt-6 " onSubmit={handleSubmit}>
            Tag <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>
          <input  placeholder="#tag"
          value={post.tag}
          onChange={(e)=>setPost({...post,tag:e.target.value})}
          required
          className="p-4 outline-none rounded-lg "/>
          <div className="flex flex-end text-gray-500 font-normal gap-5 mt-3">
            <Link href="/" className="text-sm text-gray-500 hover:text-black">
              Cancel
            </Link>
            <button type="submit" disabled={submitting} className="text-md text-white bg-orange-500 px-4 py-1.5 rounded-full">
              {submitting?`${type}ing...`:type}
            </button>
          </div>
        </form>
    </section>
    
  )
}

export default Form