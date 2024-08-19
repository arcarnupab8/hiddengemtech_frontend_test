import React, { useEffect, useState } from 'react';
import axios from 'axios';

import style from './css/notes.module.css';
import NoteContainer from './NoteContainer';

function Notes({ setSelectedNoteId, setShowEditNote, setShowDetailsNote }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
        try {
            const response = await axios.get('/api/getAllNotes');
            setNotes(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEditClick = (noteId) => {
    setSelectedNoteId(noteId);
    setShowEditNote(true);
  };

  const handleViewDetails = (noteId) => {
    setSelectedNoteId(noteId);
    setShowDetailsNote(true);
  };

  return (
    <div className={style.container}>
      {notes.map((item, index) => (
        <NoteContainer
          key={index}
          NoteDoc={item.id}
          content={item.content} 
          dateofmade={item.Dateofmade}
          madeby={item.madeby}
          onEditClick={() => handleEditClick(item.id)}
          onViewDetails={() => handleViewDetails(item.id)}
        />
      ))}
    </div>
  )
}

export default Notes;
