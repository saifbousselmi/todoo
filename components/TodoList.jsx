import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoModel from './TodoModel';
import { Empty, Modal, Input, message, Dropdown, Menu, Button } from 'antd';
import { MdAddTask } from 'react-icons/md';
import { DownOutlined } from '@ant-design/icons';
import { addTask, editTask } from '../JS/Actions';

const MODAL_TITLES = {
    ADD: "Add New Task",
    EDIT: "Edit Task",
};

const TodoList = () => {
    const { todos } = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [filter, setFilter] = useState('all');

    const showModal = (task = null) => {
        if (task) {
            setTaskTitle(task.title);
            setEditingTaskId(task.id);
        } else {
            setTaskTitle('');
            setEditingTaskId(null);
        }
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (!taskTitle) {
            message.error('Please enter a task title');
            return;
        }

        try {
            if (editingTaskId) {
                await dispatch(editTask({ id: editingTaskId, title: taskTitle }));
                message.success('Task updated successfully!');
            } else {
                await dispatch(addTask({ title: taskTitle }));
                message.success('Task added successfully!');
            }
            resetModal();
        } catch (error) {
            message.error('Failed to add or update task');
        }
    };

    const resetModal = () => {
        setTaskTitle('');
        setIsModalVisible(false);
        setEditingTaskId(null);
    };

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'uncompleted':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    }, [todos, filter]);

    const items = [
        { key: 'all', label: 'Show All Tasks' },
        { key: 'completed', label: 'Show Completed Tasks' },
        { key: 'uncompleted', label: 'Show Uncompleted Tasks' },
    ];

    const handleMenuClick = (e) => {
        setFilter(e.key);
    };

    const buttonStyle = (key) => {
        switch (key) {
            case 'all':
                return 'bg-slate-700 text-gray-200';
            case 'completed':
                return 'bg-cyan-500 text-gray-500';
            case 'uncompleted':
                return 'bg-red-600 text-gray-300';
            default:
                return '';
        }
    };

    const dropdownMenu = (
        <Menu onClick={handleMenuClick}>
            {items.map(item => (
                <Menu.Item
                    key={item.key}
                    className={`w-full text-left transition duration-300 ${buttonStyle(item.key)} hover:bg-gray-300 hover:text-gray-900`}
                >
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div style={{ backgroundColor: "#D3D3D3" }} className='rounded-3xl mt-8 w-3/6 min-h-96 mr-10 p-4'>
            <div className='text-center my-6'>
                <h1 className='text-4xl mt-9 text-slate-600 font-bold'>ToDone</h1>
                <p className='mt-7 text-lg text-slate-400'>
                    Simplify your life by organizing your tasks in one place.
                </p>
                <div className='flex justify-center space-x-4'>
                    <button
                        className='flex items-center bg-slate-600 text-white px-4 h-10 rounded-md transition-colors duration-300 hover:bg-slate-700'
                        onClick={() => showModal()}
                    >
                        <MdAddTask className='mr-2' />
                        Add New Task
                    </button>
                    <Dropdown overlay={dropdownMenu}>
                        <Button className={`flex items-center ${buttonStyle(filter)} px-4 h-10 rounded-md transition-colors duration-300`}>
                            {filter === 'all' ? 'Show All Tasks' : filter === 'completed' ? 'Show Completed Tasks' : 'Show Uncompleted Tasks'}
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </div>
            <div>
                {filteredTodos.length === 0 ? (
                    <Empty className='mt-20' description="No Todos Available" />
                ) : (
                    filteredTodos.map(todo => (
                        <TodoModel 
                            key={todo.id} 
                            todo={todo} 
                            onEdit={() => showModal(todo)}
                        />
                    ))
                )}
            </div>

            <Modal
                title={editingTaskId ? MODAL_TITLES.EDIT : MODAL_TITLES.ADD}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={resetModal}
            >
                <Input
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    style={{ marginBottom: '16px' }}
                />
            </Modal>
        </div>
    );
};

export default TodoList;
