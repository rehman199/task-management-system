"use client";
import Loader from "@/app/components/shared/loader";
import { SignInPath } from "@/app/constants/routes/frontend/auth-routes";
import useAuth from "@/app/hooks/use-auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function SignUp() {
  const { onChange, onSubmit, loading, values } = useAuth({
    initialValues: {
      user: { name: "", username: "", password: "" },
    },
    type: "register",
  });
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" sx={{ mt: 3 }} onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              size="small"
              value={values.user.name}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="username"
              size="small"
              type="email"
              value={values.user.username}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              placeholder="8 or more characters"
              size="small"
              inputProps={{
                pattern: ".{8,}",
                title: "Password must contain 8 or more characters",
              }}
              value={values.user.password}
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="warning"
          disabled={
            loading ||
            !values.user.name ||
            !values.user.username ||
            !values.user.password
          }
        >
          Sign Up
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href={SignInPath}>
              <Typography component="p">
                Already have an account? Sign in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Loader loading={loading} />
    </>
  );
}
