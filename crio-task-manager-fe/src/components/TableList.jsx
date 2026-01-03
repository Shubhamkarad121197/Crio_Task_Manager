import { useEffect, useState } from 'react';
import api from '../services/api';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import DownloadIcon from '@mui/icons-material/Download';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function DenseTable() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tasks');
      setTasks(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ================= STATUS LOGIC ================= */
  const getTaskStatus = (task) => {
    const today = new Date();
    const deadline = new Date(task.deadline);

    if (task.status === 'DONE' && today > deadline) return 'Achieved';
    if (task.status === 'TODO' && today >= deadline) return 'Failed';
    return 'In Progress';
  };

  /* ================= ACTIONS ================= */

  // MARK AS DONE
  const markAsDone = async (id) => {
    try {
      await api.put(`/tasks/${id}`, { status: 'DONE' });
      fetchTasks();
    } catch (error) {
      console.error('Failed to mark task done:', error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // DOWNLOAD FILE
  const downloadFile = async (id) => {
    try {
      const res = await api.get(`/tasks/${id}/file`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'task-file.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('File download failed:', error);
    }
  };

  if (loading) {
    return <p style={{ padding: 16 }}>Loading tasks...</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  {new Date(task.deadline).toLocaleDateString()}
                </TableCell>
                <TableCell>{getTaskStatus(task)}</TableCell>

                <TableCell align="center">
                  {/* MARK DONE */}
                  {task.status !== 'DONE' && (
                    <IconButton
                      color="success"
                      onClick={() => markAsDone(task._id)}
                      title="Mark as Done"
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  )}

                  {/* DOWNLOAD */}
                  {task.linkedFile && (
                    <IconButton
                      onClick={() => downloadFile(task._id)}
                      title="Download File"
                    >
                      <DownloadIcon />
                    </IconButton>
                  )}

                  {/* EDIT (future) */}
                  <IconButton title="Edit">
                    <ModeEditOutlinedIcon />
                  </IconButton>

                  {/* DELETE */}
                  <IconButton
                    color="error"
                    onClick={() => deleteTask(task._id)}
                    title="Delete"
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
