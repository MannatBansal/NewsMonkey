import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) =>{
  //created states we need to use
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizeFirstLetter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  
  const updations = async () =>{
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url); //fetch will get url and get the api from it
      props.setProgress(40);
      let parsedData = await data.json(); //this will convert data into json file
      props.setProgress(70);
      console.log(parsedData);

      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      props.setProgress(100); 
    }

  //This hook is used to change the title according to the category of news
    useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - News Rail`
      updations();
      //eslint-disable-next-line
    }, [])

    const fetchMoreData = async() => {
      //we update the page in url itself and then update the page
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
      setPage(page+1) //it is an asynchronous func
      let data = await fetch(url); 
      let parsedData = await data.json(); 
      console.log(parsedData);
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    };
  
    return (  
      <>
        <h1 className='text-center' style={{margin: '35px 0px', marginTop: '90px'}}> NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {/*if loading is true then the spinner will load */}
        {loading&&<Spinner/>}

        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {/*if loading is not true then the content will load */}
          {articles.map((element, index)=>{
            return(<div className="col-md-4 my-2" key={index}>
                {/*we map the api results as element and pass them in the props we made in news item component*/}
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>)
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps = {
  country:'in',
  pageSize: 20,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
