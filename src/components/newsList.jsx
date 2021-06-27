import React from 'react'

function getTimeString(dateTimeStr) {
    return new Date(dateTimeStr).toDateString()
}

const NewsItem = ({ item }) => (
    <div className="card mb-4">
        {item.urlToImage && (
            <img
                className='card-img-top'
                src={item.urlToImage}
                alt={item.title}
            />
        )}
        <div className="card-body">
            <a
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: '#000' }}
            >
                <h5 className='card-title'>{item.title}</h5>
            </a>
            <a
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: '#424242' }}
            >
                {item.content}
            </a>
            <div className="mt-2 d-flex align-items-center">
                <small>
                    <strong>
                        published at {getTimeString(item.publishedAt)}
                    </strong>
                </small>
                <div
                    // className="ml-auto"
                    style={{
                        marginLeft: 'auto',
                        padding: '0.25rem 0.5rem',
                        background: '#ededed',
                        color: '#424242',
                        borderRadius: '0.25rem',
                        display: 'inline-block'
                    }}
                >
                    <small>{item.source.name}</small>
                </div>
            </div>
        </div>
    </div>
)

function NewsList({ news }) {
    return (
        <div>
            {news && news.length == 0 && <h4>There Is No News</h4>}
            {news && news.map(item => <NewsItem key={item.title} item={item} />)}
        </div>
    )
}

export default NewsList;