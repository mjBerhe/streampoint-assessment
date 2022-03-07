import type { NextPage } from "next";
import { useState } from "react";
require("../styles/styles.less");

import Nav from "../components/Nav";
import Card from "../components/Card";

type CardProps = {
  index: number;
  titleInput: string;
  bodyInput: string;
  titleSize: number;
  bodySize: number;
  borderSize: number;
  titleColor: string;
  bodyColor: string;
  panelColor: string;
  duplicateCard?: (card: any) => void;
  deleteCard?: (index: number) => void;
};

const Home: NextPage = () => {
  const [cardCount, setCardCount] = useState<number>(0);
  const [cards, setCards] = useState<CardProps[]>([
    {
      index: cardCount,
      titleInput: "",
      bodyInput: "",
      titleSize: 36,
      bodySize: 16,
      borderSize: 16,
      titleColor: "#0e2748",
      bodyColor: "#4f4f4f",
      panelColor: "#ffffff",
    },
  ]);

  const duplicateCard = (card: CardProps) => {
    const newIndex = cardCount + 1;
    const newCard = {
      ...card,
      index: newIndex,
    };
    setCards((prev) => [...prev, newCard]);
    setCardCount((prev) => prev + 1);
  };

  const deleteCard = (index: number) => {
    const tempCards = [...cards];
    const cardIndex = tempCards.findIndex((card) => card.index === index);
    tempCards.splice(cardIndex, 1);
    setCards(tempCards);
  };

  return (
    <div className="page-layout">
      <Nav />

      <div className="main-layout">
        {cards.map((card) => (
          <Card
            key={card.index}
            {...card}
            duplicateCard={duplicateCard}
            deleteCard={deleteCard}
            canDelete={cards.length > 1 ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
