import '../index.css';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { useEffect, useState } from "react";
import workingApi from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

function App() {

  //переменные состояния
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //переменная, отслеживающая состояние открытости любого из попапов
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmDeletePopupOpen || isImagePopupOpen;

  //обработчики открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  //обработчик закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  //обработчик нажатия на картинку
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //обработчик ошибок в запросе
  function proceedError(err) {
    alert(`Ошибка. Запрос не выполнен: ${err}`);
  }

  //обработчик изменения профиля
  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    workingApi.setNewUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(proceedError)
      .finally(() => setIsLoading(false));
  }

  //обработчик изменения аватара
  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    workingApi.updateUserAvatar(avatarLink)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(proceedError)
      .finally(() => setIsLoading(false));
  }

  //обработчик лайка
  function handleCardLike(card) {
    //проверяем, есть ли уже лайк
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    //отправим запрос на постановку/удаление лайка
    workingApi.proceedLike(card._id, isLiked)
      .then((newCard) => {
        //обновим массив карточек
        setCards((state) => state.map((cardItem) => cardItem._id === card._id ? newCard : cardItem));
      })
      .catch(proceedError);
  }

  //обработчик удаления карточки
  function handleCardDelete(card) {
    workingApi.deleteCard(card._id)
      .then((filteredCards) => {
        //обновим массив карточек
        setCards((state) => state.filter((cardItem) => cardItem._id !== card._id));
        closeAllPopups();
      })
      .catch(proceedError);
  }

  //обработчик добавления карточки
  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    workingApi.addNewCard(cardData)
      .then((newCard) => {
        //обновим массив карточек
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(proceedError)
      .finally(() => setIsLoading(false));
  }

  //эффект при монтировании компонента
  useEffect(() => {
    //загружаем информацию о пользователе
    workingApi.downloadUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(proceedError);
    //загружаем массив карточек
    workingApi.downloadCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(proceedError);
  }, []);

  //навешивание обработчика на нажатие клавиши Escape
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      //навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      //удаляем при закрытии
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])//отслеживаем откртыия и закрытия попапов

  return (
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onConfirmDelete={handleConfirmDeleteClick}
          cards={cards}
          onCardLike={handleCardLike}
        />
        <Footer />

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
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
          card={selectedCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

      </CurrentUserContext.Provider>

    </div >
  );
}

export default App;