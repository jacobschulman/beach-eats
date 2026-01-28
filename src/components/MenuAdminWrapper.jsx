import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getAllResorts } from '../config/resorts/index';
import MenuAdmin from './MenuAdmin';

export default function MenuAdminWrapper() {
  const { resortKey } = useParams();
  const navigate = useNavigate();
  const { setResort } = useApp();

  useEffect(() => {
    // Validate resort exists
    const validResorts = getAllResorts().map(r => r.id);
    if (!validResorts.includes(resortKey)) {
      navigate('/', { replace: true });
      return;
    }

    // Set the resort in context
    setResort(resortKey);
  }, [resortKey, setResort, navigate]);

  return <MenuAdmin />;
}
