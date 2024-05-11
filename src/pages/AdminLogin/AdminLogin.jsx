import Header from "../../components/ui/Header";
import Login from "./Login";
export default function AdminLogin() {
  return (
    <div  className=" bg-[#0529BB]" >
      <div className="m-20 pt-12 pb-12 p-5 ">
      <Header
          heading="Admin Login"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </div>
    </div>
  );
}
