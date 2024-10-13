import React, { useState } from 'react';
import { ClockCircleOutlined, EditOutlined, IssuesCloseOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { MdOutlineDoneAll, MdRemoveDone } from 'react-icons/md';
import { Badge, Modal, Popconfirm, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteTask, doneTask,editTask} from '../JS/Actions';

const TodoModel = ({ todo }) => {
  const [isDone, setIsDone] = useState(todo.completed);
  const [show, setShow] = useState(false);
  const [doneModalOpen, setDoneModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const dispatch = useDispatch();

  const handleDispatch = (completed) => {
    dispatch(doneTask({ id: todo.id, completed }));
  };

  const handleDoneOk = async () => {
    setConfirmLoading(true);
    try {
      const newStatus = !isDone; // Toggle completion status
      setIsDone(newStatus); // Update local state
      await new Promise((resolve) => {
        // Simulate network request
        setTimeout(() => {
          handleDispatch(newStatus); // Dispatch the action with the new status
          resolve();
        }, 2000);
      });
      message.success(`Task marked as ${newStatus ? 'completed' : 'not completed'}!`);
      setDoneModalOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
      message.error('Failed to update task status');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleEditOk = async () => {
    setConfirmLoading(true);
    try {
      await new Promise((resolve) => {
        // Simulate network request
        setTimeout(() => {
          dispatch(editTask({ id: todo.id, title: updatedTitle }));
          resolve();
        }, 2000);
      });
      message.success('Task updated successfully!');
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
      message.error('Failed to update task');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDelete = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    }).then(() => {
      dispatch(deleteTask(todo.id));
      message.success('Task deleted successfully!');
    });
  };

  return (
    <div className="relative flex bg-slate-400 m-4 justify-between items-center p-4 rounded-2xl">
      <div className="p-2 flex items-center justify-center text-center text-lg text-neutral-700">
        <Badge count={show && !isDone ? <ClockCircleOutlined style={{ color: 'grey', fontSize: "22px", marginRight: "12px", marginTop: "-13px" }} /> : 0} />
        <p className={isDone ? 'line-through' : ''}>{todo.title}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setDoneModalOpen(true)} className="flex items-center text-neutral-800 justify-center h-10 w-10 border border-solid border-neutral-500 rounded">
          {!isDone ? <MdRemoveDone className="h-5 w-5" /> : <MdOutlineDoneAll className="h-6 w-6" />}
        </button>
        <button onClick={() => setEditModalOpen(true)} className="p-2 text-neutral-800 border border-solid border-neutral-500 rounded h-10 w-10 flex items-center justify-center">
          <EditOutlined className="h-5 w-5" />
        </button>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={handleDelete}
          onCancel={() => console.log('Delete canceled')}
          okText="Yes"
          cancelText="No"
          placement="bottomRight"
          okButtonProps={{ danger: true }}
        >
          <button className="p-2 text-neutral-800 border border-solid border-neutral-500 rounded h-10 w-10 flex items-center justify-center">
            <DeleteOutlined className="h-5 w-5" />
          </button>
        </Popconfirm>

        {/* Clock button logic */}
        <button
          className={`p-2 border border-solid rounded h-10 w-10 flex items-center justify-center ${isDone ? 'cursor-not-allowed opacity-50 text-red-500' : ''}`}
          onClick={isDone ? null : () => setShow(prev => !prev)}
          style={isDone ? { cursor: 'not-allowed', color: 'red' } : {}}
        >
          {isDone ? (
            <ClockCircleOutlined className="h-5 w-5" />
          ) : show ? (
            <IssuesCloseOutlined className="h-5 w-5" />
          ) : (
            <ClockCircleOutlined className="h-5 w-5" />
          )}
        </button>

        <Badge.Ribbon
          text={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {isDone ? 'Completed' : 'Not Completed'}
              {isDone ? <MdOutlineDoneAll style={{ marginLeft: 4 }} /> : <MdRemoveDone style={{ marginLeft: 4 }} />}
            </span>
          }
          color={isDone ? 'cyan' : 'red'}
          style={{
            position: 'absolute',
            top: -39,
            right: -30,
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        />
      </div>

      {/* Done Confirmation Modal */}
      <Modal
        title="Confirm Action"
        open={doneModalOpen}
        onOk={handleDoneOk}
        confirmLoading={confirmLoading}
        onCancel={() => setDoneModalOpen(false)}
      >
        <p>Do you want to mark this task as {isDone ? 'not completed' : 'done'}?</p>
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        title="Edit Task"
        open={editModalOpen}
        onOk={handleEditOk}
        confirmLoading={confirmLoading}
        onCancel={() => setEditModalOpen(false)}
      >
        <p>Edit your task details here:</p>
        <Input 
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)} 
          placeholder="Enter new task title"
        />
      </Modal>
    </div>
  );
};

export default TodoModel;
