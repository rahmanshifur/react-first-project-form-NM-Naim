import React from 'react';
// import axios from 'axios'
import News, { newsCategory } from '../news';

import Header from '../components/header';
import ResultInfo from '../components/resultInfo';
import NewsList from '../components/newsList';
import Pagination from '../components/pagination';
import Loading from '../components/loading'


// const fakeNews = [
//   {
//     title: 'title',
//     content: 'content',
//     url: 'http://Linktonews.com',
//     urlToImage: 'http://Linktonews.com',
//     publishedAt: 'published date and time',
//     source: {
//       name: 'CNN'
//     },
//   },

//   {
//     title: 'title',
//     content: 'content',
//     url: 'http://Linktonews.com',
//     urlToImage: 'http://Linktonews.com',
//     publishedAt: 'published date and time',
//     source: {
//       name: 'CNN'
//     },
//   },

// ];

const news = new News(newsCategory.technology)



class App extends React.Component {

  state = {
    data: {},
    isLoading: true
  }

  aboutResult = React.createRef();
  goToTop = () => {
    window.scroll(0, this.aboutResult.current.scrollTop)
  }

  componentDidMount() {

    news.getNews()
      .then(data => {
        this.setState({ data, isLoading: false });
      })
      .catch(e => {
        console.log(e);
        alert('Something Went Wrong');
        this.setState({ isLoading: false });
      })

  }

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true })
    }
    news.next()
      .then(data => {
        this.setState({ data, isLoading: false });
      })
      .catch(e => {
        console.log(e);
        alert('Something Went Wrong');
        this.setState({ isLoading: false });
      })
  }


  prev = () => {
    if (this.state.data.isPrevious) {
      this.setState({ isLoading: true })
    }
    news.prev()
      .then(data => {
        this.setState({ data, isLoading: false });
      })
      .catch(e => {
        console.log(e);
        alert('Something Went Wrong');
        this.setState({ isLoading: false });
      })
  }

  handelPageChange = value => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value)
      }
    })
  }

  goToPage = () => {
    this.setState({ isLoading: true });
    news.setCurrentPage(this.state.data.currentPage)
      .then(data => {
        this.setState({ data, isLoading: false });
      })
      .catch(e => {
        console.log(e);
        alert('Something Went Wrong');
        this.setState({ isLoading: false });
      })
  }

  changeCategory = (category) => {
    this.setState({ isLoading: true })
    news.changeCategory(category)
      .then(data => {
        this.setState({ data, isLoading: false });
      })
      .catch(e => {
        console.log(e);
        alert('Something Went Wrong');
        this.setState({ isLoading: false });
      })
  }

  search = searchTerm => {
    this.setState({ isLoading: true })
    news.search(searchTerm)
      .then(data => {
        this.setState({ data, isLoading: false });
      })
      .catch(e => {
        console.log(e);
        alert('Something Went Wrong');
        this.setState({ isLoading: false });
      })
  }


  render() {
    const {
      article,
      isPrevious,
      isNext,
      category,
      totalPage,
      totalResults,
      currentPage
    } = this.state.data
    return (
      <div className='container'>
        <div className='row'>
          <div className="div-col-sm-6 ">
            <Header category={category}
              changeCategory={this.changeCategory}
              search={this.search}
            />
            {<div ref={this.aboutResult} className="d-flex justify-content-between">
              <p className="text-black-50">
                About {totalResults} result found
              </p>
              <p className="text-black-50 " >
                {currentPage} page of {totalPage}
              </p>
            </div>}
            {/* <ResultInfo /> */}
            {this.state.isLoading ? (
              <Loading />
            ) : (
              <div>
                <NewsList news={article} />
                <Pagination
                  next={this.next}
                  prev={this.prev}
                  isPrevious={isPrevious}
                  isNext={isNext}
                  currentPage={currentPage}
                  totalPage={totalPage}
                  handelPageChange={this.handelPageChange}
                  goToPage={this.goToPage}
                />
                <button className="btn btn-secondary my-5" onClick={this.goToTop}>Go To Top</button>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default App;