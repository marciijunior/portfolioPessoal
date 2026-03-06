import { useState, useRef, useCallback } from "react";

const BOTOES_DATA = [
  {
    id: "btn1-1",
    label: "Websites Personalizados",
    className: "btn-primeiro-main-linha1",
    imageSrc: "/img-card1.png",
  },
  {
    id: "btn1-2",
    label: "Aumento de busca e visibilidade",
    className: "btn-primeiro-main-linha1",
    imageSrc: "/img-card2.png",
  },
  {
    id: "btn1-3",
    label: "UX e UI",
    className: "btn-primeiro-main-linha1",
    imageSrc: "/img-card3.png",
  },
  {
    id: "btn2-1",
    label: "Integração de Sistemas e APIs",
    className: "btn-primeiro-main-linha2",
    imageSrc: "/img-card4.png",
  },
  {
    id: "btn2-2",
    label: "Manutenção e Suporte de Websites",
    className: "btn-primeiro-main-linha2",
    imageSrc: "/img-card5.png",
  },
  {
    id: "btn2-3",
    label: "Animações e Experiências Interativas",
    className: "btn-primeiro-main-linha2",
    imageSrc: "/img-card6.png",
  },
];

export const useButtonExpansion = () => {
  const [expandedButtonId, setExpandedButtonId] = useState(null);
  const [expandedOrigin, setExpandedOrigin] = useState("center center");
  const buttonRefs = useRef({});

  const handleButtonClick = useCallback(
    (id) => {
      if (expandedButtonId === id) {
        setExpandedButtonId(null);
      } else {
        const clickedButton = buttonRefs.current[id];
        if (clickedButton) {
          const parentRect = clickedButton
            .closest(".texto-primeiro-main")
            ?.getBoundingClientRect();

          if (parentRect) {
            setExpandedButtonId(id);
            const buttonRect = clickedButton.getBoundingClientRect();
            const originX =
              ((buttonRect.left + buttonRect.width / 2 - parentRect.left) /
                parentRect.width) *
              100;
            const originY =
              ((buttonRect.top + buttonRect.height / 2 - parentRect.top) /
                parentRect.height) *
              100;
            setExpandedOrigin(`${originX}% ${originY}%`);
          }
        }
      }
    },
    [expandedButtonId]
  );

  return {
    expandedButtonId,
    expandedOrigin,
    buttonRefs,
    botoesData: BOTOES_DATA,
    handleButtonClick,
    setExpandedButtonId,
  };
};
