// 配信者ー自己紹介（意気込み）、投票

import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import { BackSx } from "../plan/PlanManagement";
import { useNavigate } from "react-router-dom";

interface Candidate {
  id: number;
  name: string;
  votes: number;
}

const candidateList: Candidate[] = [
  { id: 1, name: "候補者A", votes: 10 },
  { id: 2, name: "候補者B", votes: 5 },
  { id: 3, name: "候補者C", votes: 3 },
  { id: 4, name: "候補者D", votes: 7 },
  { id: 5, name: "候補者E", votes: 12 },
  { id: 6, name: "候補者F", votes: 0 }
];

const Listener: React.FC = () => {
  // const classes = useStyles();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>(candidateList);
  const [hyo, setHyo] = useState<string | null>(null);

  const getOdds = (votes: number, maxVotes: number, maxOdds: number) => {
    let odds: number;
    if (votes <= maxVotes / 2) {
      odds = (maxVotes - votes + 1) / maxVotes / 2;
    } else if (votes <= (maxVotes * 3) / 4) {
      odds = ((maxVotes - votes + 1) / maxVotes) * 2;
    } else {
      odds = ((maxVotes - votes + 1) / maxVotes) * 3;
    }
    return Math.round(odds * maxOdds * 100) / 100;
  };
  const maxVotes = useMemo(() => {
    return candidates.reduce((acc, candidate) => acc + candidate.votes, 0);
  }, [candidates]);

  const handleVoteClick = (liver: string) => () => {
    setHyo(liver);
    setCandidates((prev) =>
      prev.map((aaa) =>
        aaa.name === liver ? { ...aaa, votes: aaa.votes + 1 } : aaa
      )
    );
    navigate("/listenerresult");
  };

  const navi = (path: string) => () => {
    navigate(`${path}`);
  };

  return (
    <Box width="100%" p={3} sx={BackSx}>
      <Grid container spacing={2}>
        {candidates.map((candidate) => (
          <Grid item xs={12} sm={6} md={4} key={candidate.id}>
            <Card
              sx={{
                maxWidth: 400,
                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  borderColor: "lightblue",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderRadius: "4px"
                },
                "&:not(:hover)": {
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  borderColor: "#000",
                  borderRadius: "4px"
                }
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {candidate.name}
                </Typography>
                <Typography variant="body2" color="#000">
                  現在の得票数: {candidate.votes}
                </Typography>
                <Typography variant="body2" color="#000">
                  オッズ: {getOdds(candidate.votes, maxVotes, 10)}倍
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  disabled={hyo ? true : false}
                  sx={{
                    backgroundColor: "blue",
                    ":active": {
                      transform: "translateY(5px) translateX(5px)"
                    }
                  }}
                  onClick={handleVoteClick(candidate.name)}
                >
                  投票する
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(Listener);
