import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios'
import Search from './Search';
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

// list category
const listCategory = [
    { id: 0, name: "Thế Giới" },
    { id: 1, name: "Việt Nam" },
    { id: 2, name: "Thời Sự" },
    { id: 3, name: "Tin Tức" },
    { id: 4, name: "Bóng Đá" },
    { id: 5, name: "Âm Nhạc" },
    { id: 6, name: "Bóng Chuyền" },
    { id: 7, name: "Bóng Rổ" },
    { id: 8, name: "Cầu Lông" },
    { id: 9, name: "Quần Vợt" },
    { id: 10, name: "Đua Ngựa" },
    { id: 11, name: "Ảo Thuật" },
    { id: 12, name: "Chính Trị" }
];

// list position
const listPosition = [
    { id: 1, name: "Việt Nam" },
    { id: 2, name: "Châu Á" },
    { id: 3, name: "Châu Âu" },
    { id: 4, name: "Châu Mỹ" }
];
// Print List blog
export default function Content() {

    const [blogs, setBlogs] = useState([])


    const handlePosition = (position) => {
        var positionArray = position.split(',')
        console.log(positionArray)
        return listPosition.map((value, key) => {
            return positionArray.map((v) => {
                if (value.id == v) {

                    return value.name;
                }
            })
        })
    }

    // Handle Category
    const handleCategory = (category) => {
        return listCategory.map((value, key) => {

            if (value.id == category) {
                return value.name;
            }
        })
    }

    // param id
    // delete post by id
    const deletedPostById = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3000/blogs/${id}`).then(res => {
            getList();
        })

    }

    // show all list blog
    const getList = () => {
        axios.get(`http://localhost:3000/blogs`)
            .then(res => {
                setBlogs(res.data);
            })

            .catch(error => console.log(error));
    }

    // call api get
    useEffect(() => {
        getList();
    }, [])

    // Searcg Blog by title
    const searchTitleBlog = (textTitle) => {
        axios
            .get(`http://localhost:3000/blogs?q=${textTitle}`)
            .then((res) => {
                setBlogs(res.data);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <Search searchTitleBlog={searchTitleBlog} />
            <div className="card">
                <div className="card-header">
                    <h3>List Blog</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>
                                    Id
                                </th>
                                <th>
                                    Tin
                                </th>
                                <th>
                                    Loại
                                </th>
                                <th>
                                    Trạng thái
                                </th>
                                <th>
                                    Vị trí
                                </th>
                                <th>
                                    Ngày public
                                </th>
                                <th>
                                    Edit
                                </th>
                                <th>
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((value, key) => {
                                console.log(value.public)
                                return (
                                    <tr>
                                        <td>{value.id}</td>
                                        <td>{value.title}</td>
                                        <td>{handleCategory(value.category)}</td>
                                        <td>{value.public == 1 ? "Yes" : "No"}</td>
                                        <td>{handlePosition(value.position)}</td>
                                        <td>{value.data_pubblic}</td>
                                        <td> <Link className="btn btn-outline-primary" to={`/edit/${value.id}`}>Edit</Link> </td>
                                        <td><button className="btn btn-outline-danger" onClick={() => { deletedPostById(value.id) }}>Delete</button></td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">

                </div>
            </div>
        </div>
    );
}
