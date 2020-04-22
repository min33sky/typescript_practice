import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import dotenv from 'dotenv';
import usePromise from '../lib/usePromise';
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
  // Custom Hooks 사용
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(`
    http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${API_KEY}`);
  }, [category]);

  // Loading...
  if (loading) {
    return <NewsListBlock>대기 중....</NewsListBlock>;
  }

  if (!response) {
    return null;
  }

  if (error) {
    return <NewsListBlock>에러 발생</NewsListBlock>;
  }

  const articles = response.data.articles;

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
