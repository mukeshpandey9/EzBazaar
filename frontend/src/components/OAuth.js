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

  //   if (isAuthanticated) {
  //     message.success("Logged In Successfully");
  //     navigate("/profile");
  //   }

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
