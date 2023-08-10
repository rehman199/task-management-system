"use client";
import WithNoAuth from "@/app/HOCs/with-no-auth";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Container } from "@mui/material";

function AuthLayout({ children }) {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
          <LockOutlined />
        </Avatar>
        {children}
      </Box>
    </Container>
  );
}

export default WithNoAuth(AuthLayout);
