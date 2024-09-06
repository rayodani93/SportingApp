// src/services/api.ts
import { supabase } from '../config/supabaseClient';

// Obtener todos los jugadores
export const getJugadores = async () => {
  const { data, error } = await supabase.from('jugadores').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Crear un nuevo jugador
export const createJugador = async (
  nombre: string,
  nombreUsuario: string,
  dni: string,
  posicion: string,
  foto: string
) => {
  const { data, error } = await supabase.from('jugadores').insert([
    { nombre, nombre_usuario: nombreUsuario, dni, posicion, foto, contrasena: dni }
  ]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
