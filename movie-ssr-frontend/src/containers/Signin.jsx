import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import axios from "../axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/login", {
        user: { email, password },
      });
      localStorage.setItem("TOKEN", response.headers.authorization);
      axios.defaults.headers.common["Authorization"] =
        response.headers.authorization;
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Login to your account
        </Header>
        <Form size="large" onSubmit={() => handleSubmit()}>
          <Segment stacked>
            <Form.Input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              name="password"
              fluid
              onChange={(e) => setPassword(e.target.value)}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button
              fluid
              size="large"
              type="submit"
              disabled={isButtonDisabled}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to={"/signup"}>Sign up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
export default Signup;
