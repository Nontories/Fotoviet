import React from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import "../styles/blog.css"
import blog from "../data/BlogDetailData"

const most = blog.find(obj => obj.type === "most")


const Blog = () => {
    return (
        <div className="blog">
            {console.log(most)}
            <div className="blog_most">
                <h1>Bài viết được quan tâm nhiều</h1>
                <div className="blog_most_content">
                    <div className="blog_most_content_banner">
                        <img src={most.image} alt="" />
                        <div className="blog_most_content_banner_text">
                            <Link to={"/blog/"+ most.id} className="blog_most_content_banner_title">{most.title}</Link>
                            <div className="blog_most_content_banner_information">
                                <div className="time">{most.time}</div>
                                <div className="name">{most.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="blog_most_content_text">
                        Theo nhiếp ảnh gia Manny Ortiz, cần lưu ý không làm 5 điều dưới đây vì nó có thể gây ảnh hưởng đến bức ảnh chân dung của bạn. Để có được một bức ảnh chân dung đẹp thì ngoài kỹ năng, còn rất nhiều yếu tố khác cần được lưu ý...
                    </div>
                </div>
            </div>
            <div className="blog_new">
                <h1>Bài viết mới nhất</h1>
                <div className="blog_new_list">
                    {blog.map((item, key) => {
                        return (
                            item.type !== "most" ?
                                <div className="blog_new_list_item">
                                    <img className="blog_new_list_item_image" src={item.image} alt="" />
                                    <Link to={"/blog/"+ item.id} className="blog_new_list_item_title">{item.title}</Link>
                                    <div className="blog_new_list_item_information">
                                        <div className="time">{item.time}</div>
                                        <div className="name">{item.name}</div>
                                    </div>
                                </div>
                                : ""
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Blog