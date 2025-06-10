import type { Note, CreateNote } from "../types/note";
import axios from "axios";

const API_URL = 'https://notehub-public.goit.study/api/notes';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotes {
    notes: Note[];
    totalPages: number;
}

interface FetchParams {
  search?: string;
  page?: number;
  perPage?: number;
}

 export async function fetchNotes(  
  searchText: string,
  page: number
): Promise<FetchNotes> {
   const params: FetchParams = {
    ...(searchText.trim() !== "" && {search: searchText.trim()}),
    page,
    perPage: 12,
  };

  const res = await axiosInstance.get<FetchNotes>("/", { params });
 return res.data;
 };


 export async function createNote(newNote: CreateNote): Promise<Note> {
    const res = await axiosInstance.post<Note>("/" , newNote);
    return res.data;
 }

 export async function deleteNote (noteId: string): Promise<Note> {
    const res = await axiosInstance.delete(`/${noteId}`);
    return res.data;
 };
