import React from 'react';
import Navbar from "../Navbar";

class Blog extends React.Component{
    render() {
        return (
            <div>
                 <Navbar tab1='Company' tab2='About' tab3='Blog' tab4='Contact us'
                         link1='company' link2='about' link3='blog' link4='contact'/>

                <div className = "home-blog-wrapper">
                    <div className = "blog-item">
                        <img className="blog-img"
                             src="https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8xOTM3NzM4NC9vcmlnaW4ucG5nIiwiZXhwaXJlc19hdCI6MTY2NDQ3NTU3Nn0.yVRMajbj8gGBAjNKjkUrMNoz_BsF7VW4Pwa90QeCRGw/img.png?quality=80&width=733"/>
                        <div className = "blog-info">
                            <a href="https://www.gearbrain.com/autonomous-food-delivery-robots-2646365636.html">
                                <h3 className="blog-title">
                                    These 7 robotic delivery companies are racing to bring shopping to your door.
                                </h3>
                            </a>
                            <p className="blog-body">
                                Robotic food delivery (or, increasingly, the delivery of anything that fits into a
                                robot) is being tackled by a wide range of companies, from garage startups to retail
                                giants...
                            </p>
                        </div>
                    </div>
                </div>

                <div className = "home-blog-wrapper">
                    <div className = "blog-item">
                        <img className="blog-img"
                             src="https://www.delltechnologies.com/uploads/2020/10/10.14.20_Drone_1046623924_1280x960-1-1280x800.jpg"/>
                        <div className = "blog-info">
                            <a href = "https://www.delltechnologies.com/en-us/perspectives/delivery-by-drone-from-novelty-to-necessity-in-times-of-change/?gacd=9643275-1040-5761040-266682520-0&dgc=st&gclid=Cj0KCQiApsiBBhCKARIsAN8o_4ipty2nExhy52GTd0CnFBDstARLDq33AZ6k-3GPmrOEcOqHKJBUst4aAqx9EALw_wcB&gclsrc=aw.ds">
                                <h3 className="blog-title">
                                    Delivery by Drone: From Novelty to Necessity in Times of Change.
                                </h3>
                            </a>
                            <p className="blog-body">
                                Drones are already delivering critical drugs, Walmart orders, and pizza. In the next
                                20 years, they'll change entire cities. Learn how shifting regulations and advances
                                in technology will enable change...
                            </p>
                        </div>
                    </div>
                </div>

                <div className = "home-blog-wrapper">
                    <div className = "blog-item">
                        <img className="blog-img"
                             src="https://www.robotics.org/userAssets/riaUploads/image/RIA-SR-Blog-Oct-T2-Delivery-Robot-at-George-BLOG.jpg"/>
                        <div className = "blog-info">
                            <a href="https://www.robotics.org/blog-article.cfm/Food-Delivery-Robots-Take-to-the-Streets/212">
                                <h3 className="blog-title">
                                    Food Delivery Robots Take to the Streets.
                                </h3>
                            </a>
                            <p className="blog-body">
                                Food delivery robots have already started to deliver customer food orders in Northern
                                California. Small service robots now show up to restaurants, get loaded with food, and
                                then travel to hungry patrons...
                            </p>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}

export default Blog;