import React from "react";

export default () => {
  return (
    <div className="unauthenticated">
      <p>
        This Dapp requires the{" "}
        <a className="link" href="https://metamask.io/">
          MetaMask
        </a>{" "}
        Chrome extension. You can{" "}
        <a
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          className="link"
        >
          download it here
        </a>.
      </p>
    </div>
  );
};
