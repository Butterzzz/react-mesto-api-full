import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfooTooltipOpen, setIsInfooTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      }).catch((err) => { console.log(err) });
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfooTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.sendUserInfo(userData).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
      .catch((err) => { console.log(err) })
      .finally(() => { setIsLoading(false); })
  }

  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api.sendUserAvatar(userData).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
      .catch((err) => { console.log(err) })
      .finally(() => { setIsLoading(false); })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => console.log(err));
    } else {
      api.removeLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    })
      .catch((err) => { console.log(err) });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.postCard(newCard).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => { console.log(err) })
      .finally(() => { setIsLoading(false); })
  }

  function onRegister(password, email) {
    setIsLoading(true);
    auth.register(password, email)
      .then(data => {
        if (data.data._id) {
          setIsSuccess(true);
          setIsInfooTooltipOpen(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfooTooltipOpen(true);
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  function onLogin(password, email) {
    setIsLoading(true);
    auth.authorize(password, email)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setEmail(email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      auth.getContent(token)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          }
        })
        .catch(err => console.log(err));
    }
  }, [history])

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header
          email={email}
          signOut={signOut}
        />

        <Switch>

          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
          />

          <Route path="/sign-up">
            <Register
              onRegister={onRegister}
              isLoading={isLoading}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              onLogin={onLogin}
              isLoading={isLoading}
            />
          </Route>

          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          name={'photo-view'}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfooTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;