import React from 'react'
import { useState } from 'react'

export default function Search({searchTitleBlog}) {
   const [text, setText] = useState("")

   const handleSearch = (event) => {
    return setText(event.target.value);
  };  
  

  const searchTitle = () => {
    return searchTitleBlog(text);
  };
  
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h3>Search</h3>
                </div>
                <div className="card-body">
                <div class="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                     class="form-control"
                    onChange={handleSearch}
                    />
                </div>  
                <div className="form-group text-center">
                    <button className="btn btn-success"
                    onClick={searchTitle}
                    >
                        Search
                    </button>
                </div>
                </div>
                <div className="card-footer">

                </div>
            </div>
        </div>
    )
}
