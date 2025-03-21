import React from "react";
import { Link } from "react-router-dom";
import { BsClock } from "react-icons/bs";

import "./ArticleBox.css";

export default function ArticleBox({ src, title, date, blogID }) {
  return (
    <div className="article-box">
      <div className="article-box__img-wrapper">
        <img src={src} alt="article_img" className="article-box__img" />
      </div>

      <div className="article-box__info-wrapper">
        <h4 className="article-box__info-title">{title}</h4>
        <div className="article-box__info-desc">
          <div className="article-box__info-date">
            <BsClock className="article-box__info-icon" />
            <span className="article-box__info-text">{date}</span>
          </div>
          <Link to={`/blogs/${blogID}`} className="article-box__info-link">
            ادامه مطلب
          </Link>
        </div>
      </div>
    </div>
  );
}
