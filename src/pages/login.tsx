import { Alert, Box, Button, Divider, Paper, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { FC, useContext, useEffect, useState } from "react";
import { Form } from "../components/Form/form";
import { FormInput } from "../components/Form/FormInputs/formTextInput";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { UserContext } from "../context/userContext";
import jwtDecode from "jwt-decode";
import { OpticketJwtPayload } from "../types/jwtPayloadType";
import "../assets/styles/backgroundImage.css";
import { optisTheme } from "../assets/styles/theme";

export type LoginFormFields = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  //router
  let navigate = useNavigate();

  //Server error -> plaatst alert van 10 seconden met de server message
  const [errorMessage, setErrorMessage] = useState("");

  const serverError = (message: string) => {
    setErrorMessage(message);
    const timeId = setTimeout(() => {
      setErrorMessage("");
    }, 10000);
    return () => {
      clearTimeout(timeId);
    };
  };

  const onSubmit = (data: LoginFormFields) => {
    AuthService.login(data)
      .then((response) => {
        const token = jwtDecode<OpticketJwtPayload>(response.jwt_token);
        setUserInfo({
          isAuthenticated: true,
          isHandyman: token.handyman,
          name: token.name,
        });
      })
      .catch((e) => {
        try {
          // server side validation
          if (e.response.data.message) {
            serverError(e.response.data.message);
          }
        } catch (error) {
          //network error
          if (e.message === "Network Error") {
            serverError(e.message + ": kan niet verbinden met API");
          }
        }
      });
  };

  useEffect(() => {
    if (userInfo.isAuthenticated && !userInfo.isHandyman) {
      navigate("/my-tickets");
    } else if (userInfo.isAuthenticated && userInfo.isHandyman) {
      navigate("/open-tickets");
    }
    document.title = "Opticket | Login";
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={{ xs: "stretch", md: "center" }}
      height="calc(100vh - 64px)"
      className="backgroundImage"
    >
      <Paper
        elevation={3}
        sx={{
          bgcolor: "#FCFAFC",
          p: 2,
          borderRadius: 1,
          width: {
            xs: 1.0,
            md: 700,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccountBoxIcon fontSize="medium"></AccountBoxIcon>
            <Typography variant={"h5"} sx={{ pl: 1, fontWeight: "bold" }}>
              Aanmelden
            </Typography>
          </div>
          <Typography variant="subtitle2">
            Heb je nog geen account?&nbsp;
            <Link 
            to={"/register"} 
            style={{color: optisTheme.palette.primary.main}}
            >
            Registreren
            </Link>
          </Typography>
        </Box>
        <Divider
          sx={{
            mb: 2,
            mt: 2,
          }}
        />
        <Form onSubmit={onSubmit}>
          <FormInput<LoginFormFields>
            id="email"
            type="email"
            autoComplete="email"
            label="E-mail"
            name="email"
            rules={{
              required: "E-mail moet ingevuld zijn",
              pattern: {
                value: /.*(@cronos.be)$/i,
                message: "moet een cronos emailadres zijn",
              },
            }}
          />
          <FormInput<LoginFormFields>
            id="password"
            autoComplete="password"
            label="Wachtwoord"
            name="password"
            rules={{
              required: "Wachtwoord moet ingevuld zijn",
            }}
            endAdornment={true}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              height: 50,
            }}
          >
            <div>
              {errorMessage ? (
                <Alert variant="outlined" severity="error" sx={{ height: 1.0 }}>
                  {errorMessage}
                </Alert>
              ) : null}
            </div>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={false}
            >
              Meld Aan
            </Button>
          </Box>
        </Form>
      </Paper>
    </Box>
  );
};
