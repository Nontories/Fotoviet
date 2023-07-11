import React from "react";
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

import BlogDetailData from "../data/BlogDetailData"
import "../styles/BlogDetail.css"

const BlogDetail = () =>{
    const { blogId } = useParams();
    const blog = BlogDetailData.find(obj => obj.id == blogId)
    return(
        <div className="blog_detail">
            <div className="blog_detail_banner">
                <img src={blog.image} alt="" />
                </div>
            <div className="blog_detail_title">{blog.title}</div>
        </div>
    )
}

export default BlogDetail