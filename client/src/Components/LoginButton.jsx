import { Fragment } from "react";
import button from "./component-style/button.module.css";

export default function LoginButton() {
  return (
    <Fragment>
      <button className={button.login}>Sign In</button>
    </Fragment>
  );
}
