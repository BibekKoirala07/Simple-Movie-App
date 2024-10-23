import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutOrSignout } from "../../store/index";
import { toast } from "react-toastify";
import { toastFailure, toastSuccess } from "../../utils/toastify";
import { loginOrRegister } from "../../store/slices/userSlice";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url =
    import.meta.env.VITE_NODE_ENV == "production"
      ? import.meta.env.VITE_PROD_BACKEND_URL
      : import.meta.env.VITE_DEV_BACKEND_URL;

  const user = useSelector((state) => state.user.user);

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(file, username, phone, email);
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("mobile", phone);
    formData.append("username", username);

    try {
      const response = await fetch(`${url}/user/update-account/${user._id}`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      });
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        setError("");
        toast.success("Updated", toastSuccess);
        localStorage.setItem("token-movie", JSON.stringify(data.data));
        dispatch(loginOrRegister(data.data));
      } else {
        console.log("error");
        throw Error(data.error);
        toast.error("Updation Failed", toastFailure);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`${url}/user/delete-account/${user._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log("response", response);
      console.log("data", data);
      if (response.ok) {
        toast.success("Your account Deleted");
        dispatch(logoutOrSignout());
        localStorage.removeItem("token-movie");
        navigate("/");
      } else {
        throw Error(data.error);
      }
    } catch (error) {
      toast.error(error.message || "Delete Account Failed");
    }
  };

  // const img =
  //   file && typeof file === "object"
  //     ? URL.createObjectURL(file)
  //     : typeof file === "string"
  //     ? file.startsWith("http")
  //       ? file
  //       : "data:image/png;base64," + file
  //     : "";

  const img =
    file == null
      ? user?.imageData.toString().startsWith("http")
        ? user.imageData
        : `data:image/png;base64,${user.imageData}`
      : URL.createObjectURL(file);

  const datum = `data:image/png;base64,${user.imageData}`;

  return (
    <div className="update-profile dotted-border">
      <h2>Profile</h2>
      <div className="update-profile-file">
        <h3>Profile Picture</h3>
        <div>
          <input type="file" name="" id="" onChange={handleFileChange} />
          <img
            src={
              img
              // ? file
              // : file && URL.createObjectURL(file) // Use URL.createObjectURL for File objects
            }
            alt=""
          />
        </div>
      </div>
      <div>
        <h3>Username</h3>
        <input
          type="text"
          placeholder="Enter the full name..."
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <h3>Email</h3>
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter your Email here..."
          readOnly
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <h3>Phone</h3>
        <input
          type="tel"
          name=""
          id=""
          placeholder="Enter your Phone here..."
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
      {error && (
        <h4
          style={{
            color: "red",
            fontSize: "1rem",
            textAlign: "center",
            fontWeight: "400 ",
            marginTop: "1.5em",
            marginBottom: "0",
          }}
        >
          {error}
        </h4>
      )}
      <div className="delete-update">
        <button className="delete-update-first" onClick={handleDeleteUser}>
          Delete Account
        </button>
        <button
          className="delete-update-second"
          type="submit"
          onClick={handleSubmit}
        >
          Update Account
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
