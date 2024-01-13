import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase.config";
import { googleAuth } from "../redux/actions/userAction";
import { useEffect } from "react";
import { message } from "antd";
import { clearErrors } from "../redux/reducers/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthanticated, success, error } = useSelector(
    (state) => state.user
  );

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      dispatch(
        googleAuth({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        })
      );
    } catch (error) {
      message.error(error.message);
      console.log("Could not sign in with Google", error);
    }
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (isAuthanticated) {
      message.success("Logged In Successfully");
      navigate("/profile");
    }
  }, [dispatch, error, isAuthanticated, navigate]);

  if (loading) {
    message.loading("Loading", 4000);
  }

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="px-4 py-2 border flex gap-4 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span className="text-md">Continue with Google</span>
    </button>
  );
};

export default OAuth;
