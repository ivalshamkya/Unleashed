import { Avatar, Dropdown, Navbar as Nav } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/auth/slices";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, imgProfile, username, email } = useSelector((state) => {
    return {
      id: state.auth?.id,
      imgProfile: state.auth?.imgProfile,
      username: state.auth.username,
      email: state.auth.email,
    };
  });  

  const id_ = localStorage.getItem("id");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Nav className="shadow-sm" rounded>
      <Nav.Brand href="/">
        <span className="self-center text-2xl font-semibold font-albra whitespace-nowrap dark:text-white">
          Unleashed.
        </span>
      </Nav.Brand>
      <Nav.Collapse>
        <Nav.Link href="/">
          <p>Home</p>
        </Nav.Link>
      </Nav.Collapse>
      <div className="flex md:order-2">
        {email ? (
          <Dropdown
            inline
            label={
              imgProfile ? (
                <Avatar
                  alt="User settings"
                  
                  img={
                    import.meta.env.VITE_APP_API_PROFILE_IMAGE_URL + imgProfile
                  }
                  rounded
                />
              ) : (
                <Avatar rounded></Avatar>
              )
              // img={
              //   imgProfile
              //     ? "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              //     : "/img/profile-dummy.png"
              // }
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{username}</span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <a href="/profile">Profile</a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a href="/myblog">My Blog</a>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex items-center">
            <a href="/auth/login">
              <button
                type="button"
                className="text-slate-950 hover:bg-blue-50 focus:ring-4 focus:ring-blue-100 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Log In
              </button>
            </a>
            <a href="/auth/signup">
              <button
                type="button"
                className="text-white bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:ring-blue-100 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Sign Up
              </button>
            </a>
          </div>
        )}
        <Nav.Toggle />
      </div>
    </Nav>
  );
}
