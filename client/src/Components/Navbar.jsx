import navbar from "./component-style/navbar.module.css";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";

export default function Navbar() {
  return (
    <div className={navbar.container}>
      <h1 className={navbar.heading}>SwipTory</h1>
      <RegisterButton></RegisterButton>
      <LoginButton></LoginButton>
    </div>
  );
}
