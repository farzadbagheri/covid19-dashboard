import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Colors from "./Colors";
import ModalTitle, { TitleProps } from "./ModalTitle";

const BackgroundAside = styled.aside`
  align-items: center;
  background-color: rgba(214, 215, 215, 0.8);
  display: flex;
  height: 100%;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

interface ModalContainerProps {
  height?: string;
  width?: string;
}

const ModalContainer = styled.div<ModalContainerProps>`
  align-self: center;
  background-color: ${Colors.slate};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height || "auto"};
  width: ${(props) => props.width || "65vw"};
  padding: 35px;
  max-height: 90%;
  overflow-y: auto;
`;

interface Props {
  numSteps?: number;
  title?: TitleProps["title"];
  open?: boolean;
  closeModal?: TitleProps["closeModal"];
  height?: string;
  width?: string;
}

const isOutsideModal = (
  event: React.MouseEvent<HTMLElement>,
  element: HTMLDivElement | null,
) =>
  event.target instanceof HTMLElement &&
  element &&
  !element.contains(event.target);

const ModalDialog: React.FC<Props> = (props) => {
  const { title, open, closeModal, height, width, children } = props;
  const ref = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    // Stopping propogation so that the event does not fall through to elements
    // "beneath" the modal.  This is useful in the case where we have a modal
    // within a modal (i.e. a delete confirmation).
    event.stopPropagation();

    if (isOutsideModal(event, ref.current) && closeModal) {
      closeModal(event);
    }
  };

  return ReactDOM.createPortal(
    <BackgroundAside onClick={handleOnClick}>
      <ModalContainer ref={ref} height={height} width={width}>
        <ModalTitle title={title} closeModal={closeModal} />
        {children}
      </ModalContainer>
    </BackgroundAside>,
    document.getElementById("___gatsby") as HTMLElement,
  );
};

export default ModalDialog;
