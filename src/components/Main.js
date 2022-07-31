import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
    const { avatar, name, about } = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img className="profile__img" src={avatar} alt="Изображение пользователя"/>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{name}</h1>
                        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
                    </div>
                    <h2 className="profile__user-text">{about}</h2>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить изображение" onClick={onAddPlace}></button>
            </section>
            <section className="photo">
                <ul className="photo__items">
                    {cards.map((card) => { return <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} /> })}
                </ul>
            </section>
        </main>
    )
};
export default Main;
