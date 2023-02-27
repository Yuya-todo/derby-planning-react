import React, { useEffect, useState } from "react";
import { Box, Link, Stack, Toolbar, Typography } from "@mui/material";

import keibaBackImage from "../image/競馬背景.jpg";

import { useNavigate } from "react-router-dom";

export const backgroundUmaSx = {
  display: "flex",
  justifyContent: "center",
  py: 1,
  // backgroundColor: "rgba(0,157,255,0.2)"
  backgroundImage: `url(${keibaBackImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: 0.8,
  height: "100vh",
  alignItems: "start"
};
export const linkSx = {
  fontSize: "30px",
  color: "#000",
  ":hover": {
    cursor: "pointer"
  }
};
const nanameTitle = {
  ontFamily: "Impact, sans-serif",
  fontSize: "40px",
  fontWeight: "bold",
  color: "#000",
  textShadow: "2px 2px 0px #fff",
  letterSpacing: "2px",
  lineHeight: 1.2,
  transform: "skew(-20deg)",
  transformOrigin: "0 0",
  textAlign: "center"
};
const animeName = {
  height: "1em",
  fontSize: "40px",
  fontWeight: "bold",
  color: "#000",
  pt: 1,
  transform: "translateX(0)",
  animation: "slide-in 3s ease, leg-up 2s ease 3s",
  animationIterationCount: 1,
  "@keyframes slide-in": {
    from: {
      transform: "translateX(-100%)"
    },
    to: {
      transform: "translateX(0)"
    }
  },
  "@keyframes leg-up": {
    "0%": {
      transformOrigin: "left",
      transform: "rotate(0deg)"
    },
    "30%": {
      transformOrigin: "left",
      transform: "rotate(-45deg)"
    },
    "50%": {
      transformOrigin: "left",
      transform: "rotate(-30deg)"
    },
    "60%": {
      transformOrigin: "left",
      transform: "rotate(-45deg)"
    },
    "100%": {
      transformOrigin: "left",
      transform: "rotate(0deg)"
    }
  }
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [nameCookies, setNameCookies] = useState<string | null>(null);

  function getCookie(name: string) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");

      if (cookieName === name) {
        return cookieValue;
      }
    }

    return null;
  }
  useEffect(() => {
    const result = getCookie("myCookie");
    setNameCookies(result);
  }, []);

  const navi = (path: string) => () => {
    const nameID = "aaa";
    const expires = new Date(Date.now() + 12 * 60 * 60 * 1000).toUTCString();

    // cookieに保存
    document.cookie = `myCookie=${nameID}; expires=${expires}; path=/`;
    navigate(`${path}/${nameID}`);
  };

  return (
    <Box width="100%">
      <Toolbar sx={backgroundUmaSx}>
        <Stack spacing={2} py={3}>
          <Typography sx={nanameTitle}>イベントダービー</Typography>
          <Typography sx={nanameTitle}>
            全馬力出し切って、最強の一頭を選べ！
          </Typography>
          {nameCookies ? (
            <Typography sx={animeName}>
              {nameCookies}
              さんの入場です！！
            </Typography>
          ) : (
            <Typography
              sx={{
                height: "1em",
                fontSize: "40px",
                fontWeight: "bold",
                color: "#000",
                flexGrow: 0,
                flexShrink: 0
              }}
            ></Typography>
          )}
          <Stack
            direction={"row"}
            spacing={2}
            p={2}
            display={"flex"}
            width={"60vw"}
            justifyContent={"space-around"}
          >
            <Link
              onClick={navi("/planmanagement")}
              underline="hover"
              sx={linkSx}
            >
              企画者管理ページ
            </Link>
            <Link onClick={navi("/liver")} underline="hover" sx={linkSx}>
              配信者投票ページ
            </Link>
            <Link onClick={navi("/listener")} underline="hover" sx={linkSx}>
              視聴者投票ページ
            </Link>
          </Stack>
        </Stack>
      </Toolbar>
    </Box>
  );
};

export default React.memo(Home);
