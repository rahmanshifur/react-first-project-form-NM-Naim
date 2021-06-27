import React, { Component, createRef } from 'react';
import News, { newsCategory } from '../news';

class Header extends Component {
    state = {
        searchTerm: ''
    }

    searchBarRef = createRef()
    componentDidMount() {
        this.searchBarRef.current.focus();
    }

    handelChange = (e) => {
        this.setState({ searchTerm: e.target.value })
    }

    handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            this.props.search(this.state.searchTerm);
        }
    }


    render() {
        const { category, changeCategory } = this.props;

        return (
            <div className='my-4'>
                <h1 className="my-4" style={{ fontWeight: '300' }}>
                    Block Baster HeadLine
                </h1>
                <input ref={this.searchBarRef}
                    type="search"
                    className="form-control"
                    placeholder="Type Anything & Press Enter To Search"
                    value={this.state.searchTerm}
                    onChange={this.handelChange}
                    onKeyPress={this.handleKeyPress}
                />
                <div className="my-4">
                    {newsCategory && Object.keys(newsCategory).map((item) => {
                        if (category == newsCategory[item]) {
                            return (
                                <button onClick={() => changeCategory(newsCategory[item])} className='btn btn-sm btn-warning mr-4 mb-4'>
                                    {`#${newsCategory[item]}`}
                                </button>
                            )
                        }
                        return (
                            <button onClick={() => changeCategory(newsCategory[item])} className='btn btn-sm btn-light mr-4 mb-4'>
                                {`#${newsCategory[item]}`}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Header;