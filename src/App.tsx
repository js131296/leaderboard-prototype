import React from "react";
import styled from "styled-components";
import { StreamersList } from "./components/streamers-list/StreamersList";

const ShadowedContainer = styled.div`
  width: 60%;
  border-radius: 12px;
  -webkit-box-shadow: 0px 2.9px 2.9px rgba(0, 0, 0, 0.174),
    0px 8.1px 7.9px rgba(0, 0, 0, 0.25), 0px 19.6px 19px rgba(0, 0, 0, 0.326),
    0px 65px 63px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2.9px 2.9px rgba(0, 0, 0, 0.174),
    0px 8.1px 7.9px rgba(0, 0, 0, 0.25), 0px 19.6px 19px rgba(0, 0, 0, 0.326),
    0px 65px 63px rgba(0, 0, 0, 0.5);

  @media (max-width: 767px) {
    width: 90%;
  }
`;

const App = () => {
  return (
    <ShadowedContainer>
      <StreamersList />
    </ShadowedContainer>
  );
};

export default App;
