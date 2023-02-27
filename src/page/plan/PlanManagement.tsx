import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Switch,
  Typography
} from "@mui/material";
import keibaBackImage from "../../image/競馬背景.jpg";
import { ulid } from "ulid";

export const BackSx = {
  // backgroundColor: "rgba(0,157,255,0.2)"
  backgroundImage: `url(${keibaBackImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  opacity: 0.8,
  height: "100vh"
};

const filteredEvents = [
  {
    id: "1",
    title: "第1回目 イベント1",
    description: "イベント1の説明文",
    gameName: "ゲーム1",
    date: "2023-02-01",
    organizer: "運営1",
    participants: ["参加者1", "参加者2", "参加者3"],
    images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
  },
  {
    id: "2",
    title: "第1回目 イベント2",
    description: "イベント2の説明文",
    gameName: "ゲーム2",
    date: "2023-03-05",
    organizer: "運営2",
    participants: ["参加者4", "参加者5"],
    images: ["https://example.com/image3.jpg", "https://example.com/image4.jpg"]
  },
  {
    id: "3",
    title: "第1回目 イベント3",
    description: "イベント3の説明文",
    gameName: "ゲーム3",
    date: "2023-03-10",
    organizer: "運営3",
    participants: ["参加者6", "参加者7", "参加者8"],
    images: ["https://example.com/image5.jpg", "https://example.com/image6.jpg"]
  },
  {
    id: "4",
    title: "第1回目 イベント4",
    description: "イベント4の説明文",
    gameName: "ゲーム4",
    date: "2023-03-15",
    organizer: "運営4",
    participants: ["参加者9", "参加者10", "参加者11"],
    images: ["https://example.com/image7.jpg", "https://example.com/image8.jpg"]
  },
  {
    id: "5",
    title: "第1回目 イベント5",
    description: "イベント5の説明文",
    gameName: "ゲーム5",
    date: "2023-03-20",
    organizer: "運営5",
    participants: ["参加者12", "参加者13"],
    images: [
      "https://example.com/image9.jpg",
      "https://example.com/image10.jpg"
    ]
  },
  {
    id: "6",
    title: "第1回目 イベント6",
    description: "イベント6の説明文",
    gameName: "ゲーム6",
    date: "2023-03-25",
    organizer: "運営6",
    participants: ["参加者14", "参加者15", "参加者16"],
    images: [
      "https://example.com/image11.jpg",
      "https://example.com/image12.jpg"
    ]
  }
];

const unfilteredEvents = [
  {
    id: "5",
    title: "イベント5",
    description: "イベント5の説明文",
    gameName: "ゲーム5",
    date: "2023-03-20",
    organizer: "運営5",
    participants: ["参加者12", "参加者13"],
    images: [
      "https://example.com/image9.jpg",
      "https://example.com/image10.jpg"
    ]
  },
  {
    id: "6",
    title: "イベント6",
    description: "イベント6の説明文",
    gameName: "ゲーム6",
    date: "2023-03-25",
    organizer: "運営6",
    participants: ["参加者14", "参加者15", "参加者16"],
    images: [
      "https://example.com/image11.jpg",
      "https://example.com/image12.jpg"
    ]
  }
];

type event = {
  id: string;
  title: any;
  description: string;
  gameName: string;
  date: string;
  organizer: string;
  participants: string[];
  images: string[];
};
function EventList() {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [events, setEvents] = useState<event[]>(filteredEvents);

  function createTitleRegex(title: string): RegExp {
    const regexPattern = `${title}`;
    return new RegExp(regexPattern);
  }

  const handleCloneEvent = (event: event) => () => {
    // タイトルから "第" と "回目" を含む文字列を抜き出す
    const title: string = event.title;
    const titleRegex = createTitleRegex(title.split(" ")[1]);
    const matcheTitle = events.filter((a) => titleRegex.test(a.title));

    const pattern = /^第(\d+)回目/;
    const list: number[] = matcheTitle.map((aaa) => {
      const bbb = pattern.exec(aaa.title);
      console.log("aaaaaa", bbb ? Number(bbb[1]) : 0);
      return bbb ? Number(bbb[1]) : 0;
    });
    console.log(title.split(" "));

    let newTitle = "";

    console.log("list", list);
    const maxNumber = Math.max(...list);

    newTitle = `第${maxNumber + 1}回目 ${title.split(" ")[1]}`;
    console.log(newTitle);

    // 新しいイベントを作成する
    const newEvent = {
      ...event,
      id: ulid(),
      title: newTitle
    };
    console.log(events);
    // 新しいイベントを追加する
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <Stack
        px={2}
        direction={"row"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Switch
            checked={showUpcoming}
            onChange={(event) => setShowUpcoming(event.target.checked)}
            color="primary"
            inputProps={{ "aria-label": "toggle upcoming events" }}
          />
          <Typography variant="subtitle1">
            {showUpcoming ? "開催前のイベントを表示" : "すべてのイベントを表示"}
          </Typography>
        </Box>
        <Button component={Link} to="/newplanning" variant="contained">
          新規イベント作成
        </Button>
      </Stack>

      <Box height={"80vh"} overflow={"scroll"}>
        {events
          .filter((a) =>
            showUpcoming ? new Date().getTime() < new Date(a.date).getTime() : a
          )
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((event) => (
            <Stack spacing={2} p={1}>
              <Card key={event.id}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {event.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {event.date}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleCloneEvent(event)}>
                    もう一回！！
                  </Button>
                </CardActions>
              </Card>
            </Stack>
          ))}
      </Box>
    </div>
  );
}

const PlanManagement = () => {
  return (
    <Box width="100%" p={1} sx={BackSx}>
      <Typography
        sx={{ fontSize: "30px", fontWeight: "bold", paddingX: 3, my: 2 }}
      >
        イベント管理ページ
      </Typography>

      {EventList()}
    </Box>
  );
};

export default PlanManagement;
