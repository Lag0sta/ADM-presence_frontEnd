import {  useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useDispatch } from 'react-redux';

// Création du hook useAppSelector avec le type RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ✅ useAppDispatch avec typage de AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
