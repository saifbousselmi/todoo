import React from 'react';
import TodoList from '../components/TodoList';

const Todo = () => {
  return (
    <div 
      style={{
        minHeight: '100vh', 
        margin: 0,
        padding: 20, 
        backgroundImage: 'url(https://img.freepik.com/premium-photo/top-view-desk-concept-with-copy-space_23-2148459778.jpg?ga=GA1.1.277857295.1725842965&semt=ais_hybrid)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className='w-full flex justify-end items-center'
    >
      <TodoList />
    </div>
  );
};

export default Todo;
