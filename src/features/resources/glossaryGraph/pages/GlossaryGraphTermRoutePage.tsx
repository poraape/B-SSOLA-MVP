import { useParams } from 'react-router-dom';
import { GlossaryTermPage } from '../components/GlossaryTermPage';

export const GlossaryGraphTermRoutePage = () => {
  const { slug } = useParams<{ slug: string }>();
  return <GlossaryTermPage slug={slug} />;
};
