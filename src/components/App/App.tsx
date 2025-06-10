import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [debouncedSearch] = useDebounce(searchText, 300);

  const notes = useQuery({
    queryKey: ["notes", debouncedSearch, currentPage],
    queryFn: () => fetchNotes(debouncedSearch, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = notes.data?.totalPages ?? 0;

  const handleSearchChange = (newSearch: string) => {
    setSearchText(newSearch);
    setcurrentPage(1);
  };

  return (
    <div className={css.app}>
      {notes.isLoading && <p>Loading...</p>}
      <header className={css.toolbar}>
        <SearchBox value={searchText} onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setcurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      <NoteList notes={notes.data?.notes ?? []}/>
      {notes.isError && <p>Error loading notes.</p>}
      {isModalOpen && (
        <NoteModal 
        onClose={() => setIsModalOpen(false)}
        children={<NoteForm onClose={() => setIsModalOpen(false)} />}
        />
      )}
    </div>
  );
}