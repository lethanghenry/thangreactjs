import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react'
import { useParams } from 'react-router';
// import { Default } from 'react-toastify/dist/utils';

const listCategory=[
    {id:0,name:"Thế Giới"},
    {id:1,name:"Việt Nam"},
    {id:2,name:"Thời Sự"},
    {id:3,name:"Tin Tức"},
    {id:4,name:"Bóng Đá"},
    {id:5,name:"Âm Nhạc"},
    {id:6,name:"Bóng Chuyền"},
    {id:7,name:"Bóng Rổ"},
    {id:8,name:"Cầu Lông"},
    {id:9,name:"Quần Vợt"},
    {id:10,name:"Đua Ngựa"},
    {id:11,name:"Ảo Thuật"},
    {id:12,name:"Chính Trị"}
];
const listPosition = [
    { id: 1, name: "Việt Nam" },
     { id: 2, name: "Châu Á" }, 
     { id: 3, name: "Châu Âu" },
      { id: 4, name: "Châu Mỹ" }
    ];
// import { useState } from 'react'
export default function New() {
    const url = "http://localhost:3000"
    const [checkedPosition, setCheckedPosition] = useState([]);
    const [checkCategory, setCheckCategory] = useState("")
    const [checkedPublic, setCheckedPublic] = useState("");
    const [post, setPost] = useState([]);
    let {id}=useParams();
   
    useEffect(() => {
        getPostById(id);
      }, []);
    
      /**
       * Get post by id
       * @param {*} id
       * @returns mix
       */
      const getPostById = (id) => {
        if (id) {
          axios
            .get(`${url}/blogs/${id}`, {
              params: {
                id: id,
              },
            }
            
            )
            .then(function (response)
            {
                console.log(response.data)
                setPost(response.data)
                setCheckedPosition([...response.data.position]);
                setCheckedPublic(response.data.public==true?1:0)
                console.log(response.data.public)
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      };
    const handleCheckPosition =(id) =>
    {
        setCheckedPosition((prev)=>{
            const isChecked =checkedPosition.includes(id)
            if(isChecked)
            {
                return checkedPosition.filter((item)=>item !== id)
            }
            else{
                return [...prev, id]
            }
        })
    }
    const handleCheckCategory = (id)=>
    {
        if (checkCategory == id) {
            return id;
        }
    }
    const handleCheckPublic=(id)=>
    {
        return setCheckedPublic(id);
    }

    const submit=(e) =>{
        e.preventDefault();
        const post = {
            title: e.target.title.value,
            des: e.target.des.value,
            detail: e.target.detail.value,
            category: parseInt(e.target.category.value),
            public:parseInt(e.target.public.value),
            data_pubblic: e.target.data_pubblic.value,
            position: checkedPosition.toString(),
            thumbs: e.target.thumbs.value.split(/(\\|\/)/g).pop(),
        }
   
        if(id)
        {
            axios.put(`${url}/blogs/${id}`, post)
            .then( )
            .catch((error)=>console.log(error) );
        }
        else{
            axios.post(`${url}/blogs`,post)
            .then()
              .catch((error) => console.log(error));
        }

    }

    return (
        
        <div>
            <div className="card">
                <div className="card-header">
                    New Blogs
                </div>
                <div className="card-body">
                    <form onSubmit={submit}>

                        <div className="form-group">
                            <label>Tiêu Đề </label>
                            <br />
                            <input type="text"
                            name="title" 
                            defaultValue={post ? post.title: ""}
                            className="form-control " />
                        </div>

                        <div className="form-group">
                            <label>Mô Tả Ngắn</label>
                            <br />
                            <textarea rows="4" 
                             name="des" 
                             className="form-control"
                             defaultValue={post ? post.des : ""}
                             ></textarea>
                            <br />
                        </div>

                        <div className="form-group">
                            <label>Chi Tiết</label>
                            <br />
                            <textarea rows="4" 
                             name="detail" 
                             className="form-control"
                             defaultValue={post ? post.detail : ""}
                             ></textarea>
                            <br />
                        </div>

                        <div className="form-group">
                            <label>Hình ảnh:</label>
                            <input type="file"
                                name="thumbs"
                                className="form-control"
                            />
                            <br />
                            <label>Không có tệp nào được chọn</label>
                            <br />
                        </div>

                        <div className="form-group ">
                            <label>Vị trí</label>
                            <br />
                            {
                                listPosition.map((value,key)=>{
                                    return (
                                        <div className="form-check form-check-inline" key={key}>
                                        <input  className="form-check-input"
                                        type="checkbox"
                                        id={`position-${value.id}`}
                                        name="position"
                                    
                                        checked={checkedPosition.includes(value.id)}
                                        onChange={()=> handleCheckPosition(value.id)}
                                        />
                                        <label className="form-check-label"
                                        htmlFor={`position-${value.id}`}
                                        >{value.name}
                                        </label>
                                        </div>
                                    )
                                })
                            }                           
                           
                            <br />
                        </div>

                        <div className="form-group " >                         
                            <label>Public</label>
                            <br></br>
                            <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input"
                                type="radio"
                                name="public"
                                value="1"
                                checked={checkedPublic===1}
                                onChange={() => handleCheckPublic(1)}
                            />
                            <label className="form-check-label" htmlFor="1">Yes</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input"
                                type="radio"
                                name="public"
                                value="0"
                                checked={checkedPublic===0}
                                onChange={() => handleCheckPublic(0)}
                            />
                            <label className="form-check-label" htmlFor="0">No</label>
                            </div>
                        </div>
                    <br />
                     
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Loại</label>
                                <br />
                                    <select className="form-control">
                                      {
                                        listCategory.map((value,key) =>
                                       {
                                           return(
                                             
                                                    <option key={key} selected={handleCheckCategory}>
                                                       {value.name}                                                       
                                                    </option>
                                          
                                           )
                                       }
                                       ) 
                                      }
                                       
                                    </select>
                                  

                                <br />

                            </div>

                            <div className="form-group col-md-6">
                                <label>Date Public</label>
                                <br />
                                <input type="date" name="data_pubblic" className="form-control" />
                                <br />
                            </div>
                        </div>

                        <div className="form-group d-flex align-items-center justify-content-center">
                            <button  className="btn btn-primary m-3" type="submit">Submit</button>
                            <button className="btn btn-success m-3" type="reset">Clear</button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">

                </div>
            </div>
        </div>
    )
}
