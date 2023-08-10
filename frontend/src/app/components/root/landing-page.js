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
      gap={2}
      flex={1}
      sx={{
        backgroundImage: "url(/images/red-envelopes.jpg) ",
        backgroundSize: "cover",
      }}
    >
      <Typography
        component="h1"
        fontSize={64}
        color="white"
        width="50%"
        mt="10%"
      >
        Managing Your Tasks Just Got a Lot Easier
      </Typography>
      <Typography component="p" color="white">
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
