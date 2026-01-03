import { useState } from 'react';
import './App.css';
import AddButton from './components/AddButton';
import ButtonAppBar from './components/AppBar';
import DenseTable from './components/TableList';
import FormDialog from './components/FormDialog';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <ButtonAppBar />

      <DenseTable />

      {isOpen && <FormDialog open={isOpen} onClose={closeDialog} />}

      <div className="addButton">
        <AddButton onClick={openDialog} />
      </div>
    </div>
  );
}

export default App;
