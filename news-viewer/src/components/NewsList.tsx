import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem, { NewsItemType } from './NewsItem';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); // ! cra에서 dotenv를 사용할 땐 REACT_APP_을 접두사로 사용해야 한다

const API_KEY = process.env.REACT_APP_API_KEY;

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

interface NewsListProps {
  category: string;
}

function NewsList({ category }: NewsListProps) {
  const [articles, setArticles] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ! useEffect를 async함수로 만들면 안되고
    // ! async를 사용하는 함수를 따로 선언해야한다.
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(`
        http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${API_KEY}`);
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    fetchData();
  }, [category]);

  // Loading...
  if (loading) {
    return <NewsListBlock>대기 중....</NewsListBlock>;
  }

  return (
    <NewsListBlock>
      {articles &&
        articles.map((article) => (
          <NewsItem key={article.url} article={article} />
        ))}
    </NewsListBlock>
  );
}

export default NewsList;
