import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Doctor from './Pages/Doctor';
import Patient from './Pages/Patient';
import Profile from './Pages/Profile';
import EditProfile from './Pages/Edit-profile';
import { PrivateRoute } from './Component/Navigation';
import Consultation from './Pages/Consultation';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Contex/User-contex';
import { API, setAuthToken } from './Config/Api';
import AddArticle from './Pages/Add-article';
import Navbars from './Component/Navbar';
import ListArticleDoctor from './Pages/List-article-doctor';

function App() {

  const [state, dispatch] = useContext(UserContext);
  // console.log(state);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const checkUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {

      const response = await API.get("/check-auth");
      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      if (response.data.code === 200) {
        setIsLoading(false)
      }
    } catch (error) {
      if (error.response.data.code === 401) {
        // setIsLoading(false)
        navigate("/")
      }
    }
  };

  useEffect(() => {
    // if (localStorage.token) {
    //     checkUser();
    // }
    checkUser()
  }, []);


  return (
    <>
      <Navbars />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/Doctor' element={<Doctor />} />
          <Route exact path='/Patient' element={<Patient />} />
          <Route exact path='/Profile' element={<Profile />} />
          <Route exact path='/EditProfile' element={<EditProfile />} />
          <Route exact path='/Consultation' element={<Consultation />} />
          <Route exact path='/AddArticle' element={<AddArticle />} />
          <Route exact path='/ListArticle' element={<ListArticleDoctor />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
