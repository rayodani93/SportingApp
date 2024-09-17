import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data) {
        setUser(data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    // Escuchar cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    getUser(); // Obtener el usuario autenticado al cargar el componente

    return () => {
      authListener.subscription.unsubscribe(); // Desuscribirse al desmontar el componente
    };
  }, []);

  return { user: user ?? { email: '' }, loading };
};
