// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react";
// @ts-ignore
import * as ReactDOM from "react-dom";
import {
  getDocumentOrThrow,
} from "@walletconnect/browser-utils";

import { KLIP_STYLE_SHEET } from "./assets/style";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Modal from "./components/Modal";
import {
  ANIMATION_DURATION,
  KLIP_WRAPPER_ID,
  KLIP_MODAL_ID,
  KLIP_STYLE_ID,
} from "./constants";
import { IQRCodeModalOptions } from "@walletconnect/types";
import { TextMap } from "./types";

const en: TextMap = {
  choose_preferred_wallet: "Choose your preferred wallet",
  connect_mobile_wallet: "Connect to Mobile Wallet",
  scan_qrcode_with_wallet: "Scan QR code with a Klip wallet",
  connect: "Connect",
  qrcode: "QR Code",
  mobile: "Mobile",
  desktop: "Desktop",
  copy_to_clipboard: "Copy to clipboard",
  copied_to_clipboard: "Copied to clipboard!",
  connect_with: "Connect with",
  loading: "Loading...",
  something_went_wrong: "Something went wrong",
  no_supported_wallets: "There are no supported wallets yet",
  no_wallets_found: "No wallets found",
};

function injectStyleSheet() {
  const doc = getDocumentOrThrow();
  const prev = doc.getElementById(KLIP_STYLE_ID);
  if (prev) {
    doc.head.removeChild(prev);
  }
  const style = doc.createElement("style");
  style.setAttribute("id", KLIP_STYLE_ID);
  style.innerText = KLIP_STYLE_SHEET;
  doc.head.appendChild(style);
}

function renderWrapper(): HTMLDivElement {
  const doc = getDocumentOrThrow();
  const wrapper = doc.createElement("div");
  wrapper.setAttribute("id", KLIP_WRAPPER_ID);
  doc.body.appendChild(wrapper);
  return wrapper;
}

function triggerCloseAnimation(): void {
  const doc = getDocumentOrThrow();
  const modal = doc.getElementById(KLIP_MODAL_ID);
  if (modal) {
    modal.className = modal.className.replace("fadeIn", "fadeOut");
    setTimeout(() => {
      const wrapper = doc.getElementById(KLIP_WRAPPER_ID);
      console.log(wrapper);
      if (wrapper) {
        console.log(wrapper.children);
        doc.body.removeChild(wrapper);
      }
    }, ANIMATION_DURATION);
  }
}

function getWrappedCallback(cb: any): any {
  return () => {
    triggerCloseAnimation();
    if (cb) {
      cb();
    }
  };
}

export function open(
  uri: string,
  cb: any,
  qrcodeModalOptions?: IQRCodeModalOptions
) {
  injectStyleSheet();
  const wrapper = renderWrapper();
  ReactDOM.render(
    <Modal
      text={en}
      uri={uri}
      onClose={getWrappedCallback(cb)}
      qrcodeModalOptions={qrcodeModalOptions}
    />,
    wrapper
  );
}

export function close() {
  triggerCloseAnimation();
}
