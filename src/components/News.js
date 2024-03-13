import React, {useEffect, useState} from 'react'
//In this component we will make http calls
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) =>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
//export class News extends Component {

  //we will shift it to the end for func based component
  // static defaultProps = {
  //   country:'in',
  //   pageSize: 20,
  //   category: 'general',
  // }
  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // }
    //we take a specific json and put it into articles and then make it a state to use its element
    //static call
    // articles = [
    //     {
    //     "source":{
    //         "id":"espn-cric-info",
    //         "name":"ESPN Cric Info"
    //         },
    //         "author":null,
    //         "title":"PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description":"Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com","url":"http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt":"2020-04-27T11:41:47Z",
    //         "content":"Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //         },
    //         {"source":{
    //             "id":"espn-cric-info",
    //             "name":"ESPN Cric Info"
    //             },
    //             "author":null,
    //             "title":"What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //             "description":"Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //             "url":"http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //             "urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //             "publishedAt":"2020-03-30T15:26:05Z",
    //             "content":"Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //         }
    //     ]

    const capitalizeFirstLetter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    //no use of constructor in func based, so states will be declared seperately
    //without super in it, it will throw error
    // constructor(props){
    //     super(props);
    //     console.log("Hello i am constructor from news component");
    //     //we will create a state
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1,
    //         totalResults: 0
    //     }
    //     document.title = `${this.capitalizeFirstLetter(props.category)} - News Monkey`
    // }

    //it will take the page number and run the further program
    //await will tell to wait for this method
    const updations = async () =>{
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
      //this.setState({loading:true})
      setLoading(true)
      let data = await fetch(url); //fetch will get url and get the api from it
      props.setProgress(40);
      let parsedData = await data.json(); //this will convert data into json file
      props.setProgress(70);
      console.log(parsedData);

      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      // this.setState({
      //   articles: parsedData.articles,
      //   totalResults: parsedData.totalResults,
      //   loading: false
        
      // });//we updated articles state with the data
      props.setProgress(100); 
    }
    //this method is lifecycle method. Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    //async will make it wait in its body until the promises are resolved
    
    //created a pagesize as props
    //we set loading to true until the data has been fetch and then after getting results set it to false
    useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`
      updations();
      //eslint-disable-next-line
    }, [])
    // async componentDidMount(){
    //   this.updations();
    // }

    //in this we make url as variable using `` and insert page number at end as var pagesize will show total 20 articles at one page
    //we set loading to true until the data has been fetch and then after getting results set it to false
    // handlePrevClick=async()=>{
    // this.setState({page: this.state.page-1}, ()=>{this.updations()});
    
    // }

    //in this we have if condition in which if total results are divided by 20 and we take math.ceil which will give next whole number and if that number is smaller than page number plus one then we do nothing otherwise we will increment page
    //we set loading to true until the data has been fetch and then after getting results set it to false
    // handleNextClick=async()=>{
    //   this.setState({page: this.state.page+1}, ()=>{this.updations()});
    //setPage(page+1)
    //   }

    const fetchMoreData = async() => {
      //this.setState({page: this.state.page+1})
      //we update the page in url itself and then update the page
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
      setPage(page+1) //it is an asynchronous func
      let data = await fetch(url); 
      let parsedData = await data.json(); 
      console.log(parsedData);
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      // this.setState({
      //   articles: this.state.articles.concat(parsedData.articles),
      //   totalResults: parsedData.totalResults
        
      // });
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
        {/* < className="container d-flex justify-content-between">
          {/*&larr; and &rarr; is used to show the right and left arrows and if page is less than or equal to one prev button will be disabled 
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div> */}
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
