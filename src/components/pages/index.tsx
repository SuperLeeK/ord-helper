import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const HomePage = () => {
  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        환영합니다
      </Typography>
      <Box my={4}>
        <Typography variant="body1">
          이것은 Material-UI를 사용하여 만든 루트 페이지입니다.
        </Typography>
      </Box>
      <Button variant="contained" color="primary">
        시작하기
      </Button>
    </StyledContainer>
  );
};

export default HomePage;
