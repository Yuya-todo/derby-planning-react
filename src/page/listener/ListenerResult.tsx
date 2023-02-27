// 配信者ー自己紹介（意気込み）、投票

import React, { useState, useEffect, useMemo } from "react";
import { Box, keyframes, Typography } from "@mui/material";
import { BackSx } from "../plan/PlanManagement";
import T1 from "../../image/Tシャツ1.png";
import T2 from "../../image/Tシャツ2.png";
import T3 from "../../image/Tシャツ3.png";
import T4 from "../../image/Tシャツ4.png";
import T5 from "../../image/Tシャツ5.png";
import siruUma from "../../image/シルエット馬.png";
import keibazyo from "../../image/競馬場夜.jpg";
import crown from "../../image/クラウン.png";

import { width } from "@mui/system";

type RacePreviewGraphProps = {
  id: number;
  name: string;
  icon: string;
  odds: number;
  points: number;
};
// レース参加者のデータ
const racers: RacePreviewGraphProps[] = [
  {
    id: 1,
    name: "Racer A",
    icon: T1,
    odds: 1.5,
    points: 10
  },
  {
    id: 2,
    name: "Racer B",
    icon: T2,
    odds: 2.0,
    points: 8
  },
  {
    id: 3,
    name: "Racer C",
    icon: T3,
    odds: 3.0,
    points: 5
  },
  {
    id: 4,
    name: "Racer D",
    icon: T4,
    odds: 5.0,
    points: 4
  },
  {
    id: 5,
    name: "Racer E",
    icon: T5,
    odds: 10.0,
    points: 12
  }
];

// グラフのデータ
const graphData = [
  { racerId: 1, rank: 1 },
  { racerId: 2, rank: 2 },
  { racerId: 3, rank: 3 },
  { racerId: 4, rank: 4 },
  { racerId: 5, rank: 5 }
];
function removeDuplicates(arr: number[]): number[] {
  return Array.from(new Set(arr));
}

const ListenerResult = () => {
  const [resultDate, setResultDate] = useState<RacePreviewGraphProps[]>([]);
  const [anime, setAnime] = useState<string[]>([]);

  const ranking = useMemo(() => {
    const resultPoint = resultDate.map((result) => result.points * result.odds);
    const rankData = removeDuplicates(resultPoint).sort((a, b) => b - a);
    const length = rankData.length;
    const rank = rankData
      .map((res, i) =>
        i < 3
          ? {
              rank: `${i + 1}位`,
              resultPoint: res,
              anime: i + 1 === 1 ? 75 : i + 1 === 2 ? 50 : 25
            }
          : i === length - 1
          ? {
              rank: "最下位",
              resultPoint: res,
              anime: 10
            }
          : { rank: "", resultPoint: res, anime: 200 }
      )
      .filter((a) => a.rank !== "");
    return rank;
  }, [resultDate]);

  useEffect(() => {
    setResultDate(racers);
    setAnime([]);
  }, []);

  const handleAnimationEnd = (rank: string) => () => {
    setAnime([...anime, rank]);
  };
  return (
    <Box
      width={"100%"}
      sx={{
        backgroundImage: `url(${keibazyo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        opacity: 0.8,
        height: "100vh"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: 2
        }}
      >
        {ranking.map((d, i) => (
          <Box
            key={d.rank}
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 2,
              mb: 1
            }}
          >
            <div
              className="container"
              style={{
                opacity: d.rank === "1位" && anime.includes(d.rank) ? 1 : 0,
                transition: "opacity 3s"
              }}
            >
              <div className="text">まーとんこつ</div>
              <img
                src={crown}
                alt={d.rank}
                style={{
                  width: "200px",
                  height: "150px",
                  position: "absolute"
                }}
              />
            </div>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 500,
                position: "relative",
                opacity: 0,
                animation: `fadeIn 0.5s ease-in-out forwards`,
                animationDelay: `${d.anime * 0.2}s`,
                "@keyframes fadeIn": {
                  from: {
                    opacity: 0,
                    transform: "translateX(100px)"
                  },
                  to: {
                    opacity: 1,
                    transform: "translateX(0)"
                  }
                }
              }}
              onAnimationEnd={handleAnimationEnd(d.rank)}
            >
              <img
                src={siruUma}
                alt={d.rank}
                width={
                  d.rank === "1位"
                    ? 500
                    : d.rank === "2位"
                    ? 400
                    : d.rank === "3位"
                    ? 300
                    : 200
                } // 1位とそれ以外でアイコンサイズを調整
                height={
                  d.rank === "1位"
                    ? 250
                    : d.rank === "2位"
                    ? 200
                    : d.rank === "3位"
                    ? 150
                    : 100
                }
              />
              <Box
                sx={{
                  //   bgcolor: d.rank === "1位" ? "primary.main" : "grey.300",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  position: "absolute",
                  top: "45%",
                  left: "45%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 999,
                  fontSize:
                    d.rank === "1位"
                      ? 50
                      : d.rank === "2位"
                      ? 30
                      : d.rank === "3位"
                      ? 20
                      : 15
                }}
              >
                {d.rank}
              </Box>
            </Box>
            <Typography
              color={"#fff"}
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
                "-webkit-text-stroke":
                  "1px black" /* Safari, ChromeなどのWebkit系ブラウザ */,
                "text-stroke": "1px black",
                opacity: 0,
                animation: anime.includes(d.rank)
                  ? `fadeIn 0.5s ease-in-out forwards`
                  : "none",
                "@keyframes fadeIn": {
                  from: {
                    opacity: 0,
                    transform: "translateX(100px)"
                  },
                  to: {
                    opacity: 1,
                    transform: "translateX(0)"
                  }
                }
              }}
            >
              こんにちは
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(ListenerResult);
