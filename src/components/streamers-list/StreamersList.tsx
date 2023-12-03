import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Streamer } from "../../types";
import { StreamerItem } from "../streamer-item/StreamerItem";

const initialData: Streamer[] = [
  { userID: "u-1", displayName: "Jone", picture: "6", score: 157000 },
  { userID: "u-2", displayName: "Victoria", picture: "1", score: 46200 },
  { userID: "u-3", displayName: "Joy", picture: "7", score: 38800 },
  { userID: "u-4", displayName: "Quinn", picture: "10", score: 33400 },
  { userID: "u-5", displayName: "Sheenalo", picture: "8", score: 31600 },
  { userID: "u-6", displayName: "Charlene", picture: "3", score: 30800 },
  { userID: "u-7", displayName: "LeonaBaby", picture: "4", score: 22300 },
  { userID: "u-8", displayName: "Sunny", picture: "5", score: 17800 },
  { userID: "u-9", displayName: "ImWord", picture: "9", score: 17300 },
  { userID: "u-10", displayName: "Dophine", picture: "2", score: 15400 },
];

const Container = styled.div`
  border-radius: 12px;
  background-color: white;
  overflow: hidden;
`;

const StreamersListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto;
  width: 100%;
  height: 650px;
`;

export const StreamersList: React.FC = () => {
  const [streamersData, setStreamersData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setStreamersData((prevState) => {
        const updatedData = [...prevState];
        updatedData?.forEach((streamer) => {
          streamer.prevScore = streamer.score;
          streamer.score += Math.floor(Math.random() * 2500);
        });
        return updatedData.sort((a, b) => b.score - a.score);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <StreamersListContainer>
        {initialData?.map((streamer, index) => {
          const newIndex =
            streamersData?.findIndex(
              (item) => item.userID === streamer.userID
            ) || index;
          const updatedStreamer = streamersData[newIndex];
          return (
            <StreamerItem
              key={updatedStreamer?.userID}
              streamer={updatedStreamer}
              streamerRank={newIndex + 1}
              top={newIndex * 65}
            />
          );
        })}
      </StreamersListContainer>
    </Container>
  );
};
