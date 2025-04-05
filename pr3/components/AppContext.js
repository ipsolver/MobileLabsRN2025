import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Зробити 10 кліків', current: 0, goal: 10 },
    { id: '2', title: 'Зробити 5 подвійних кліків', current: 0, goal: 5 },
    { id: '3', title: 'Утримувати об\'єкт 3 секунди', current: 0, goal: 1 },
    { id: '4', title: 'Перетягнути об\'єкт', current: 0, goal: 1 },
    { id: '5', title: 'Зробити свайп вправо', current: 0, goal: 1 },
    { id: '6', title: 'Зробити свайп вліво', current: 0, goal: 1 },
    { id: '7', title: 'Змінити розмір об\'єкта', current: 0, goal: 1 },
    { id: '8', title: 'Отримати 100 очок', current: 0, goal: 100 },
  ]);

const incrementScore = (points) => {
  setScore((prev) => {
    const newScore = prev + points;

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === '8') {
          return { ...task, current: Math.min(newScore, task.goal) };
        }
        return task;
      })
    );

    return newScore;
  });
};


 const updateTaskProgress = (taskId) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) => {
      if (task.id === taskId) 
      {
        if (taskId === '8') 
        {
          return { ...task, current: Math.min(score, task.goal) };
        }
        return { ...task, current: Math.min(task.current + 1, task.goal) };
      }
      return task;
    })
  );
};


  return (
    <AppContext.Provider value={{ score, tasks, incrementScore, updateTaskProgress }}>
      {children}
    </AppContext.Provider>
  );
};
