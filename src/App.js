import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ConversetionPage from './pages/ConversetionPage';
import InboxPage from './pages/InboxPage';
import RegisterPage from './pages/RegisterPage';
import useAuthCheck from './hooks/useAuthCheck';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';

function App() {
  const authCheck = useAuthCheck();
  return authCheck ?
    <Router>
      <Routes>
        <Route path='/' element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path='/inbox' element={<PrivateRoute><ConversetionPage /></PrivateRoute>} />
        <Route path='/inbox/:id' element={<PrivateRoute><InboxPage /></PrivateRoute>} />
      </Routes>
    </Router> :
    <div>Auth Checking</div>;
}

export default App;
