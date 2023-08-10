"use client";
import Loader from "@/app/components/shared/loader";
import { SignUpPath } from "@/app/constants/routes/frontend/auth-routes";
import useAuth from "@/app/hooks/use-auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function SignIn() {
  const { onChange, onSubmit, loading, values } = useAuth({
    initialValues: {
      user: { username: "", password: "" },
    },
    type: "login",
  });
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={onSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          title="username"
          label="Email Address"
          name="username"
          autoComplete="username"
          type="email"
          autoFocus
          size="small"
          value={values.user.username}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          size="small"
          value={values.user.password}
          onChange={onChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="warning"
          disabled={loading || !values.user.username || !values.user.password}
        >
          Sign In
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href={SignUpPath}>
              <Typography component="p">
                {"Don't have an account? Sign Up"}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Loader loading={loading} />
    </>
  );
}
