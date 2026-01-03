import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import api from '../services/api';

export default function FormDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    file: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('deadline', formData.deadline);
      if (formData.file) payload.append('file', formData.file);

      await api.post('/tasks', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // reset form
      setFormData({
        title: '',
        description: '',
        deadline: '',
        file: null
      });

      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Task</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Please enter task details below.
        </DialogContentText>

        <form onSubmit={handleSubmit} id="task-form">
          <TextField
            autoFocus
            required
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            required
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
            value={formData.description}
            onChange={handleChange}
          />

          <TextField
            required
            margin="dense"
            name="deadline"
            label="Deadline"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={formData.deadline}
            onChange={handleChange}
          />

          <Button
            component="label"
            variant="outlined"
            startIcon={<FileUploadIcon />}
            sx={{ mt: 2 }}
          >
            Upload File
            <input
              type="file"
              hidden
              name="file"
              onChange={handleChange}
            />
          </Button>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" form="task-form" disabled={loading}>
          {loading ? 'Saving...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
