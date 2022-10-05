import * as React from "react";
import {
  IMobileRegistryEntry,
  IQRCodeModalOptions,
  IAppRegistry,
} from "@walletconnect/types";
import {
  isMobile,
  formatIOSMobile,
  saveMobileLinkInfo,
  getMobileLinkRegistry,
  getWalletRegistryUrl,
  formatMobileRegistry,
} from "@walletconnect/browser-utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Header from "./Header";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QRCodeDisplay from "./QRCodeDisplay";

import { TextMap } from "../types";
import { KLIP_MODAL_ID } from "../constants";

interface ModalProps {
  text: TextMap;
  uri: string;
  onClose: any;
  qrcodeModalOptions?: IQRCodeModalOptions;
}

function Modal(props: ModalProps) {
    const mobile = isMobile();

    const [loading, setLoading] = React.useState(false);
    const [fetched, setFetched] = React.useState(false);
    const [displayQRCode, setDisplayQRCode] = React.useState(!mobile);
    const [hasSingleLink, setHasSingleLink] = React.useState(false);
    const [singleLinkHref, setSingleLinkHref] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [links, setLinks] = React.useState<IMobileRegistryEntry[]>([]);

    const displayProps = {
        mobile,
        text: props.text,
        uri: props.uri,
        qrcodeModalOptions: props.qrcodeModalOptions,
    };

    const  getLinksIfNeeded = () => {
        React.useEffect(() => {
            const initLinks = async () => {
                if (fetched || loading || links.length > 0) {
                    return;
                }
                setLoading(true);
                try {
                    const url =
                        props.qrcodeModalOptions && props.qrcodeModalOptions.registryUrl
                            ? props.qrcodeModalOptions.registryUrl
                            : getWalletRegistryUrl();
                    const registryResponse = await fetch(url)
                    const registry = (await registryResponse.json()).listings as IAppRegistry;
                    const platform = mobile ? "mobile" : "desktop";
                    const _links = getMobileLinkRegistry(formatMobileRegistry(registry, platform), []);
                    setLoading(false);
                    setFetched(true);
                    setErrorMessage(!_links.length ? props.text.no_supported_wallets : "");
                    setLinks(_links);
                    const hasSingleLink = _links.length === 1;
                    if (hasSingleLink) {
                        setSingleLinkHref(formatIOSMobile(props.uri, _links[0]));
                        setDisplayQRCode(true);
                    }
                    setHasSingleLink(hasSingleLink);
                } catch (e) {
                    setLoading(false);
                    setFetched(true);
                    setErrorMessage(props.text.something_went_wrong);
                    console.error(e); // eslint-disable-line no-console
                }
            };
            initLinks();
        });

    };

    getLinksIfNeeded();
    const rightSelected = mobile ? displayQRCode : !displayQRCode;
    return (
        <div id={KLIP_MODAL_ID} className="klip-qrcode__base animated fadeIn">
            <div className="klip-modal__base">
                <Header onClose={props.onClose} />
                {hasSingleLink && displayQRCode ? (
                    <div className="klip-modal__single_wallet">
                        <a
                        onClick={() => saveMobileLinkInfo({ name: links[0].name, href: singleLinkHref })}
                        href={singleLinkHref}
                        rel="noopener noreferrer"
                        target="_blank"
                        >
                        {props.text.connect_with + " " + (hasSingleLink ? links[0].name : "") + " ›"}
                        </a>
                    </div>
                ) : null}
                {displayQRCode || (!loading && !links.length) ?
                    <QRCodeDisplay {...displayProps} />
                : (
                <div>
                    {errorMessage}
                </div>
                )}
            </div>
        </div>
    )
}

export default Modal;
