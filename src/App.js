import './App.css';
import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () =>{
  const apiKey = process.env.REACT_APP_NEWS_API_KEY
  //apiKey = "8242f677d5aa4affafdd50c4f501aaa2"
  const [progress, setProgress] = useState(0)
  // state = {
  //   progress:0
  // }

  // setProgress = (progress) => {
  //   this.setState({progress: progress})
  // }
    
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        
      />
        <Routes>
          {/*to make the values work on click we will use key to make it unique */}
        <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={6} country="in" category="general"/>}></Route>
        <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key = "business" pageSize={6} country="in" category="business"/>}></Route>
        <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key = "entertainment" pageSize={6} country="in" category="entertainment"/>}></Route>
        <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key = "general" pageSize={6} country="in" category="general"/>}></Route>
        <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key = "health" pageSize={6} country="in" category="health"/>}></Route>
        <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key = "science" pageSize={6} country="in" category="science"/>}></Route>
        <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key = "sports" pageSize={6} country="in" category="sports"/>}></Route>
        <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key = "technology" pageSize={6} country="in" category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  
}

export default App;