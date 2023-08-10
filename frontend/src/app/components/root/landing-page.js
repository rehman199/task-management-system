import { SignUpPath } from "@/app/constants/routes/frontend/auth-routes";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function LandingPage() {
  return (
    <Box
      component="div"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      gap={2}
      flex={1}
      sx={{
        backgroundImage: "url(/images/red-envelopes.jpg) ",
        backgroundSize: "cover",
        padding: { xs: "1rem", sm: "3rem" },
        textAlign: "center",
      }}
    >
      <Typography
        component="h1"
        fontSize={{ xs: "3rem", sm: "4rem", md: "5rem" }}
        color="white"
        width="80%"
      >
        Managing Your Tasks Just Got a Lot Easier
      </Typography>
      <Typography component="p" color="white" width="80%">
        Try our reliable task management system today and feel the difference it
        makes for your team
      </Typography>
      <Link href={SignUpPath}>
        <Button variant="contained" size="large" color="warning">
          Get Started
        </Button>
      </Link>
    </Box>
  );
}
