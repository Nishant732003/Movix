import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/contentWrapper";
import noResults from "../../assets/no-results.png";
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import "./style.scss";

import ErrorPage from '../404/ErrorPage';
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, SetPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res);
      SetPageNum((prev) => prev + 1);
      setLoading(false);
    })
  }
  const fetchNextPageData = () => {
   fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data, results: [...data.results, ...res.results]
        })
      } else {
        setData(res);
     }
      SetPageNum((prev) => prev + 1);
    })
   };

  useEffect(() => {
    SetPageNum(1);
    fetchInitialData();
  }, [query])
  

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.mediaType === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <>
           <ErrorPage />
            </>
          )}
        </ContentWrapper>
      )}
    </div>
  );
}

export default SearchResult
