import React, { useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  styled,
  TextField
} from "@mui/material";
import keibaBackImage from "../../image/競馬背景.jpg";

// 企画者ー企画のゲーム種類、出場配信者名（チーム名）＋画像、いつ開催か、対戦表＋結果画面

const StyledBox = styled(Box)({
  "& .MuiTextField-root": {
    backgroundColor: "#fff"
  }
});

interface EditFormData {
  name: string;
  content: string;
  gameName: string;
  date: string;
  author: string;
  participants: string[];
  participantImages: string[];
}
const steps = [
  "企画名",
  "企画内容",
  "企画のゲーム名",
  "日付",
  "作成者名",
  "参加者名"
];

const NewPlanning: React.FC = () => {
  const [data, setData] = useState<EditFormData>({
    name: "",
    content: "",
    gameName: "",
    date: "",
    author: "",
    participants: [],
    participantImages: []
  });
  const [saveDate, setSaveData] = useState<EditFormData | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveData(data);
  };

  const [activeStep, setActiveStep] = useState(0);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof EditFormData
  ) => {
    setData({
      ...data,
      [fieldName]: e.target.value
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box mt={2}>
            <TextField
              label="企画名"
              fullWidth
              value={data.name}
              onChange={(e) => handleInputChange(e, "name")}
              inputProps={{ style: { color: "#333" } }}
            />
          </Box>
        );
      case 1:
        return (
          <Box mt={2}>
            <TextField
              label="企画内容"
              fullWidth
              multiline
              value={data.content}
              onChange={(e) => handleInputChange(e, "content")}
            />
          </Box>
        );
      case 2:
        return (
          <Box mt={2}>
            <TextField
              label="企画のゲーム名"
              fullWidth
              value={data.gameName}
              onChange={(e) => handleInputChange(e, "gameName")}
            />
          </Box>
        );
      case 3:
        return (
          <Box mt={2}>
            <TextField
              label="日付"
              fullWidth
              value={data.date}
              onChange={(e) => handleInputChange(e, "date")}
            />
          </Box>
        );
      case 4:
        return (
          <Box mt={2}>
            <TextField
              label="作成者名"
              fullWidth
              value={data.author}
              onChange={(e) => handleInputChange(e, "author")}
            />
          </Box>
        );
      case 5:
        return (
          <StyledBox mt={2}>
            {data.participants.map((participant, index) => (
              <Box key={index} mt={2}>
                <TextField
                  label={`参加者名${index + 1}`}
                  fullWidth
                  value={participant}
                  onChange={(e) =>
                    handleParticipantChange(e.target.value, index)
                  }
                />
              </Box>
            ))}
            <Box mt={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddParticipant}
              >
                参加者を追加する
              </Button>
            </Box>
          </StyledBox>
        );
      default:
        return null;
    }
  };

  const handleAddParticipant = () => {
    setData({
      ...data,
      participants: [...data.participants, ""]
    });
  };

  const handleParticipantChange = (value: string, index: number) => {
    setData({
      ...data,
      participants: [
        ...data.participants.slice(0, index),
        value,
        ...data.participants.slice(index + 1)
      ]
    });
  };

  const handleParticipantImageChange = (value: string, index: number) => {
    setData({
      ...data,
      participantImages: [
        ...data.participantImages.slice(0, index),
        value,
        ...data.participantImages.slice(index + 1)
      ]
    });
  };

  const handleSave = () => {
    // 保存処理を行う
    console.log("保存しました", data);
    window.location.href = "/admin";
  };

  return (
    <Box
      width="100%"
      sx={{
        py: 1,
        // backgroundColor: "rgba(0,157,255,0.2)"
        backgroundImage: `url(${keibaBackImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        opacity: 0.8,
        height: "100vh"
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel sx={{ paddingY: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form
        onSubmit={handleSubmit}
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        {renderStep(activeStep)}
        <Box mt={2}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            戻る
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              保存する
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              次へ
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default React.memo(NewPlanning);
