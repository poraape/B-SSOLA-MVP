import { useParams } from 'react-router-dom';
import { CategoryHub } from '../components/CategoryHub';

export const GlossaryCategoryHubPage = () => {
  const { category } = useParams<{ category: string }>();
  return <CategoryHub category={decodeURIComponent(category ?? '')} />;
};
