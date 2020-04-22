import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

interface NewsPageProps {
  category: string;
}

function NewsPage({ match }: RouteComponentProps<NewsPageProps>) {
  // 카테고리가 선택되지 않았으면 기본값 all 사용
  const category = match.params.category || 'all';

  return (
    <div>
      <Categories />
      <NewsList category={category} />
    </div>
  );
}

export default NewsPage;
