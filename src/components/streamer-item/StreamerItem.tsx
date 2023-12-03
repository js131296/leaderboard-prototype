import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Streamer } from "../../types";

type StreamerItemProps = {
  streamer: Streamer;
  streamerRank: number;
  top: number;
};

type ListItemProps = {
  rank: number;
  top: number;
};

type ProfileBadgeProps = {
  rank: number;
};

const rankBadgeConfig: { [index: string]: string } = {
  1: "#F9CF15",
  2: "#D4D3D3",
  3: "#F09436",
};

const ListItem = styled.div<ListItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25em 2em;
  border-bottom: 1px solid #dbe0ea;
  background-color: ${(props) => (props.rank % 2 ? "#f9fafe" : "#f0f3fc")};
  position: absolute;
  top: ${(props) => props.top}px;
  width: 100%;
  height: 65px;
  -webkit-transition: all 0.5s ease-in-out, color 0.25s ease-in-out;
  -o-transition: all 0.5s ease-in-out, color 0.25s ease-in-out;
  transition: all 0.5s ease-in-out, color 0.25s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #4a69dd;
    border-color: #4a69dd;

    .score-number,
    .score-postfix,
    .username {
      color: white;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePictureContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 8px;
  -webkit-filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4));
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4));
`;

const ProfileBadge = styled.span<ProfileBadgeProps>`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1.75em;
  height: 1.75em;
  transition: color, background-color 0.3s ease;
  text-align: center;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.7em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.rank <= 3 ? "rgba(0, 0, 0, 0.7)" : "#ffffff")};
  background: ${(props) => rankBadgeConfig[props.rank] || "#4A68CB"};
  border: 2px solid ${(props) => (props.rank % 2 ? "#f0f3fc" : " #f9fafe")};
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 48px;
  width: 48px;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 1.25em;
  color: #3b3c3f;
  transition: color 0.3s ease;
`;

const UserScoreItem = styled.div`
  display: flex;
  align-items: flex-end;
`;

const UserScore = styled.span`
  font-weight: bold;
  color: #3b3a3f;
  font-size: 1.25em;
  margin-right: 4px;
  transition: color 0.3s ease;
`;

const ScorePostfix = styled.span`
  font-size: 1em;
  color: #94979c;

  @media (max-width: 767px) {
    display: none;
  }
`;

const loadAvatar = (index: string) => `/assets/avatars/avatar${index}.png`;

export const StreamerItem: React.FC<StreamerItemProps> = ({
  streamer,
  streamerRank,
  top,
}) => {
  const [score, setScore] = useState(streamer.score);

  useEffect(() => {
    if (!streamer.prevScore) return;

    let newScore = streamer.prevScore;
    let timeout: NodeJS.Timeout;
    const steps = 50;
    const delay = 2;
    
    const updateScore = (currentScore: number, targetScore: number) => {
      if (currentScore >= targetScore) return;

      const increment = Math.min(steps, targetScore - currentScore);
      const updatedScore = currentScore + increment;
      setScore(updatedScore);

      setTimeout(() => {
        updateScore(updatedScore, targetScore);
      }, delay);
    };

    updateScore(newScore, streamer.score);

    return () => {
      clearTimeout(timeout);
    };
  }, [streamer.score, streamer.prevScore, streamer.userID]);

  const avatarPath = loadAvatar(streamer.picture);
  return (
    <ListItem rank={streamerRank} top={top} key={streamer.userID}>
      <UserInfo>
        <ProfilePictureContainer>
          <ProfileBadge rank={streamerRank}>{streamerRank}</ProfileBadge>
          <ProfilePicture src={avatarPath} />
        </ProfilePictureContainer>
        <Username className="username">{streamer.displayName}</Username>
      </UserInfo>
      <UserScoreItem>
        <UserScore className="score-number">{score}</UserScore>
        <ScorePostfix className="score-postfix">points</ScorePostfix>
      </UserScoreItem>
    </ListItem>
  );
};
