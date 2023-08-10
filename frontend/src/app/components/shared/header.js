"use client";
import {
  SignInPath,
  SignUpPath,
} from "@/app/constants/routes/frontend/auth-routes";
import useAuth from "@/app/hooks/use-auth";
import { Button, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useSelector } from "react-redux";
import Loader from "./loader";

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const { logoutUser, loading } = useAuth({ initialValues: {}, type: "" });

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to left, #190A05, #870000)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
              py: { xs: 2, sm: 3 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mr: { xs: 0, sm: 2 },
                mb: { xs: 2, sm: 0 },
                display: { xs: "block", sm: "flex" },
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              <Link href="/">Task Management System</Link>
            </Typography>

            <Box component="div" display="flex" gap={1}>
              {isLoggedIn ? (
                <Tooltip title="Log Out" onClick={logoutUser}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="R" src="/" sx={{ bgcolor: "warning.main" }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Link href={SignInPath}>
                    <Button
                      color="warning"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={SignUpPath}>
                    <Button
                      color="warning"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Loader loading={loading} />
    </>
  );
}

export default Header;
