import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Notes from './components/Notes';
import Register from './components/Register';
import Login from './components/Login';
import History from './components/History';
import Addnote from './components/Addnote';
import Editnote from './components/Editnote';
import NoteDetails from './components/NoteDetails';


function App() {
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [showDetailsNote, setShowDetailsNote] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  const hideAddButton = location.pathname === '/history' || location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const handleClosePopup = () => {
    setShowAddNote(false);
    setShowEditNote(false);
    setShowDetailsNote(false);
    setSelectedNoteId(null);
  };

  return (
    <div className='container'>
      {!hideNavbar && 
        <nav><Navbar/></nav>
      }
      <div className='content'>
        <Routes>
          <Route index element={ <Notes 
                                    setSelectedNoteId={setSelectedNoteId} 
                                    setShowEditNote={setShowEditNote}
                                    setShowDetailsNote={setShowDetailsNote} 
                                /> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/history' element={ <History/> }/>
        </Routes>
      </div>
      {!hideAddButton && isAuthenticated && 
        <img 
          className='addButton' 
          alt='Add Button' 
          src='./Notes/addButton.svg'
          onClick={() => setShowAddNote(true)} 
        />
      }
      

      {showAddNote && (
        <div className='popupBackground'>
          <div className='popupContent'>
            <Addnote onClose={handleClosePopup} />
          </div>
        </div>
      )}

      {showEditNote && selectedNoteId && (
        <div className='popupBackground'>
          <div className='popupContent'>
            <Editnote 
              id={selectedNoteId}
              onClose={handleClosePopup} />
          </div>
        </div>
      )}

      {showDetailsNote && selectedNoteId && (
        <div className='popupBackground'>
          <div className='popupContent'>
            <NoteDetails 
              id={selectedNoteId}
              onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
