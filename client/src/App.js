import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Register from './components/Register';
import ProtectedRoutes from './components/protectedRoutes';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './css/app.css';

const App = () => {

    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          <div id="main-content">
            <Routes>
              <Route path='/' element={ <Main />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/register' element={<Register />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/attractions/create' element={<CreateForm />} />
                <Route path='/attractions/edit/:AttractionId' element={<EditForm />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
}

const NotFound = () => {
  return <h1>Not Found</h1>
}

export default App;
