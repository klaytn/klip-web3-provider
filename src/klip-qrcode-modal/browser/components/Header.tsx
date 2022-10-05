// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react";

import { KLIP_HEADER_TEXT, KLIP_CLOSE_BUTTON_ID } from "../constants";

interface HeaderProps {
  onClose: any;
}

function Header(props: HeaderProps) {
  return (
    <div className="klip-modal__header">
      <p>{KLIP_HEADER_TEXT}</p>
      <div className="klip-modal__close__wrapper" onClick={props.onClose}>
        <div id={KLIP_CLOSE_BUTTON_ID} className="klip-modal__close__icon">
          <div className="klip-modal__close__line1"></div>
          <div className="klip-modal__close__line2"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;