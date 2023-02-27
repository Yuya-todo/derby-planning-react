// 配信者ー自己紹介（意気込み）、投票

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@mui/material";
import { BackSx } from "../plan/PlanManagement";

interface Candidate {
  id: string;
  name: string;
  votes: number;
}

const candidateList: Candidate[] = [
  {
    id: "1",
    name: "Liver A",
    votes: 0
  },
  {
    id: "2",
    name: "Liver B",
    votes: 0
  },
  {
    id: "3",
    name: "Liver C",
    votes: 0
  }
];

const Liver: React.FC = () => {
  // const classes = useStyles();
  const [candidates, setCandidates] = useState<Candidate[]>(candidateList);

  return (
    <Box sx={BackSx} width={"100%"}>
      {candidates.map((candidate) => (
        <Card
          sx={{
            margin: 2,
            width: "400px",
            border: "#000 1px solid"
          }}
          key={candidate.id}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {candidate.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              現在の得票数: {candidate.votes}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              {/* onClick={() => handleVoteClick(candidate)} */}
              投票する
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default React.memo(Liver);
