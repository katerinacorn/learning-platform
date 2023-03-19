import React, { useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Course from './pages/course/course';
import Courses from './pages/courses/courses';
import theme from './styles';
import './App.css';

interface ICourseContext {
  courseID: string,
  setCourseID: (id: string) => void,
}

export const CourseContext = createContext<ICourseContext>({ courseID: '', setCourseID: () => { } });

const App = () => {
  const [courseID, setCourseID] = useState("352be3c6-848b-4c19-9e7d-54fe68fef183");
  const value = {
    courseID,
    setCourseID: (id: string) => {
      setCourseID(id);
    },
  };
  return (
    <CourseContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path={`:${courseID}`} element={<Course id={courseID} />} />
        </Routes>
      </ThemeProvider>
    </CourseContext.Provider>
  )
};

export default App;
