import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { Avatar, Button, Card, Form, Input, Typography, message } from "antd";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../redux/actions/userAction";
import { UPDATE_USER_RESET } from "../redux/constants/userConstants";
const { Title } = Typography;

const Profile = () => {
  // const { loading, user, token } = useSelector((state) => state.user);
  const { loading1, isUpdated, error } = useSelector((state) => state.profile);
  const { loading, user, token } = useSelector((state) => state.user);
  const [mobile, setMobile] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(user?.avatar);
  const navigate = useNavigate();
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    address: "123 Main St, City, Country",
    profilePic: "https://via.placeholder.com/150",
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const dispatch = useDispatch();

  // Form Save

  const handleSaveClick = () => {
    dispatch(loadUser());
    dispatch(updateProfile(name, avatar));
    setEditMode(false);
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      message.success("Profile Update Successful");
      dispatch(loadUser());
    }

    dispatch({
      type: UPDATE_USER_RESET,
    });
  }, [dispatch, user, isUpdated]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  // Image uplaod
  const fileUploadHandle = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgUrl(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Header />
      {loading || loading1 ? (
        <Spinner />
      ) : (
        <main className="profile">
          <section className="block" style={{ height: "40vh" }}>
            <div
              className="absolute top-0 w-full h-3/6 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=100')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>

          <div className="px-6">
            {/* Profile card*/}
            <div className="user-profile-container -mt-80">
              <Card className="user-profile-card">
                <div className="avatar-section border border-gray-300 rounded-full w-auto">
                  <Avatar size={150} src={user?.avatar?.url} />
                </div>
                <Form layout="vertical" onFinish={handleSaveClick}>
                  <Form.Item label={editMode && "Name"}>
                    {editMode ? (
                      <Input
                        placeholder="Name"
                        type="text"
                        defaultValue={user?.name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <div className="info-section">
                        <Title level={2} className="user-name ">
                          {user?.name}
                        </Title>
                      </div>
                    )}
                  </Form.Item>
                  {!editMode && (
                    <Form.Item label="Email">
                      <p className="user-info">{user?.email}</p>
                    </Form.Item>
                  )}
                  <Form.Item label="Mobile No.">
                    {editMode ? (
                      <Input
                        placeholder="Mobile No."
                        defaultValue={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    ) : (
                      <span className="user-info">{mobile}</span>
                    )}
                  </Form.Item>

                  <Form.Item label="Address">
                    {editMode ? (
                      <Input.TextArea
                        rows={3}
                        placeholder="Address"
                        defaultValue={userData.address}
                      />
                    ) : (
                      <span className="user-info">{userData.address}</span>
                    )}
                  </Form.Item>
                  {editMode && (
                    <Form.Item>
                      {/* Image Upload */}

                      <div className="flex items-center space-x-6">
                        <div className="shrink-0">
                          <img
                            id="preview_img"
                            className="h-16 w-16 object-cover rounded-full"
                            src={imgUrl}
                            alt="Current profile photo"
                          />
                        </div>
                        <label className="block">
                          <span className="sr-only">Choose profile photo</span>
                          <input
                            type="file"
                            name="avatar"
                            accept="image/"
                            onChange={fileUploadHandle}
                            className="block w-full text-sm text-slate-500
  file:mr-4 file:py-2 file:px-4
  file:rounded-full file:border-0
  file:text-sm file:font-semibold
  file:bg-violet-50 file:text-violet-700
  hover:file:bg-violet-100
"
                          />
                        </label>
                      </div>
                    </Form.Item>
                  )}

                  {!editMode && (
                    <Form.Item>
                      <Button
                        type="submit"
                        className="edit-button"
                        onClick={() => navigate("/orders")}
                      >
                        My orders
                      </Button>
                      <Button
                        type="submit"
                        className="edit-button"
                        onClick={() => navigate("/orders")}
                      >
                        Change Password
                      </Button>
                    </Form.Item>
                  )}

                  {editMode ? (
                    <Form.Item>
                      {/* <Button
                        type="submit"
                        className="save-button"
                        onClick={handleSaveClick}
                      >
                        Save
                      </Button> */}
                      <button
                        type="submit"
                        className="save-button"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        Save
                      </button>
                    </Form.Item>
                  ) : (
                    <Form.Item>
                      <Button
                        type="submit"
                        className="edit-button"
                        onClick={handleEditClick}
                      >
                        Edit Profile
                      </Button>
                    </Form.Item>
                  )}
                </Form>
              </Card>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Profile;
