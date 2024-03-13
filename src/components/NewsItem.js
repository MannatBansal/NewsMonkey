import React from "react";

const NewsItem = (props) => {
  // export class NewsItem extends Component {
  //   render() {
  //we dont need to change the title and description for particular item
  //thats why we use props for that as props are read only
  //if we want to change anything we will use state
  //newsUrl will always be unique
  //let {title, description, imageUrl, newsUrl, author, date, source} = this.props; //this.props is used in class based
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-primary">{source}</span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://fdn.gsmarena.com/imgroot/news/24/01/ios-17-3/-952x498w6/gsmarena_000.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="NewsMonkey headlines"
          style={{ height: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
            rel="noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
  //}}
};

export default NewsItem;
