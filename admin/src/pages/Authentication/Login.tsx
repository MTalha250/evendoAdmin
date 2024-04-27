import React from "react";
import withRouter from "Common/withRouter";
import { useNavigate } from "react-router-dom";
import AuthIcon from "pages/AuthenticationInner/AuthIcon";
import { Link } from "react-router-dom";
import logo from "assets/images/logo.png";
import { login } from "helpers/auth";
import { useAuthStore } from "store/useAuthStore";
import { getUserFromLocalStorage } from "helpers/auth";
import AnimationButton from "components/UIElement/UiButtons/AnimationButton";
import {toast, Toaster} from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  document.title = "Login";

  const { setUser, setLoading, loading } = useAuthStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signing, setSigning] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

  const signIn = async () => {
    try {
      setSigning(true);
      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }
      const data = await login(email, password);
      setUser(data.user);
      if (remember) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error:any) {
      if (typeof error.response === "undefined") {
        return toast.error("Network Error");
      }
      if (typeof error.response.data === "string") {
        return toast.error(error.response.data);
      }
      toast.error("Something went wrong, please try again");
    } finally {
      setSigning(false);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    handleLoginFromLocalStorage();
  }, []);

  const handleLoginFromLocalStorage = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const data = await getUserFromLocalStorage(token);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      localStorage.setItem("token", "");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const bodyElement = document.body;

    bodyElement.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "min-h-screen",
      "py-16",
      "lg:py-10",
      "bg-slate-50",
      "dark:bg-zink-800",
      "dark:text-zink-100",
      "font-public"
    );

    return () => {
      bodyElement.classList.remove(
        "flex",
        "items-center",
        "justify-center",
        "min-h-screen",
        "py-16",
        "lg:py-10",
        "bg-slate-50",
        "dark:bg-zink-800",
        "dark:text-zink-100",
        "font-public"
      );
    };
  }, []);

  return (
    <React.Fragment>
       <Toaster />
      <div className="relative">
        <AuthIcon />
        <div className="mb-0 w-screen lg:mx-auto lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
          <div className="!px-10 !py-12 card-body">
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="hidden h-10 mx-auto dark:block"
              />
              <img
                src={logo}
                alt=""
                className="block h-16 mx-auto dark:hidden"
              />
            </Link>

            <div className="mt-8 text-center">
              <h4 className="mb-1 text-custom-500 dark:text-custom-500">
                Welcome Back !
              </h4>
              <p className="text-slate-500 dark:text-zink-200">
                Sign in to continue to Admin.
              </p>
            </div>

            <form
              className="mt-10"
              id="signInForm"
              onSubmit={async (event: any) => {
                event.preventDefault();
                await signIn();
              }}
            >
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="inline-block mb-2 text-base font-medium"
                >
                  UserName/ Email ID
                </label>
                <input
                  type="text"
                  disabled={signing || loading}
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter username or email"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  id="password"
                  disabled={signing || loading}
                  name="password"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input
                    id="checkboxDefault1"
                    className="size-4 border rounded-sm appearance-none bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
                    type="checkbox"
                    value={remember.toString()}
                    onChange={() => {
                      setRemember(!remember);
                    }}
                  />
                  <label
                    htmlFor="checkboxDefault1"
                    className="inline-block text-base font-medium align-middle cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <div
                  id="remember-error"
                  className="hidden mt-1 text-sm text-red-500"
                >
                  Please check the "Remember me" before submitting the form.
                </div>
              </div>
              <div className="mt-10">
                <AnimationButton
                  className="w-full items-center justify-center"
                  loading={signing || loading}
                  disabled={signing || loading}
                  loadingText={loading ? "Logging you in..." : "Signing in"}
                  label="Login"
                  onClick={signIn}
                />
              </div>
            </form>
           
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
