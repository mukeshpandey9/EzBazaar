import React, { useState, useEffect } from "react";
import {
  HiOutlineSearch,
  HiShoppingCart,
  HiShoppingBag,
  HiOutlineRewind,
  HiOutlinePaperAirplane,
  HiInformationCircle,
} from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Avatar, Badge, Menu, Dropdown, message } from "antd";
import Logo from "./logo.png";
import {
  UserOutlined,
  SolutionOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import "./header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logoutUser } from "../../redux/actions/userAction";
const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { isAuthanticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 300) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.addEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0 && query.trim()) {
      navigate(`/products/${query}`);
      // setTimeout(() => {
      //   setShowSearch(false);
      // }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileView = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  // Avatar menu

  // Logout handler

  const logoutHandler = () => {
    dispatch(logoutUser());
    message.success("Logout success");
  };

  const widgetMenu = (
    <Menu>
      <Menu.Item>
        <Link to={isAuthanticated ? `/profile` : "/login"}>
          <SolutionOutlined className="icon" /> {"  "}
          profile
        </Link>
      </Menu.Item>

      <Menu.Item onClick={logoutHandler}>
        <PoweroffOutlined className="icon" /> {"  "}
        sign out
      </Menu.Item>
    </Menu>
  );

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (cart) {
      if (cart.length >= 0) {
        setCartCount(cart.length);
      }
    }
  }, [cart]);

  return (
    <header
      className={`header shadow-md px-5 md:px-36 ${
        mobileMenu && "mobileView"
      } ${show}`}
    >
      <ContentWrapper>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" className="h-full w-full" />
          </Link>
        </div>
        <ul className="menuItems">
          {isAuthanticated && user.role === "admin" && (
            <Link to="/admin/dashboard">
              <li className="menuItem">
                {" "}
                {"  "}
                Dashboard
              </li>
            </Link>
          )}
          <Link to="/products">
            <li className="menuItem">
              {" "}
              {"  "}
              All Products
            </li>
          </Link>
          {!mobileMenu && (
            <Link to="/cart" className="flex items-center">
              <li className="menuItem pr-1 ">
                <HiShoppingCart />
                <Badge
                  count={cartCount}
                  className="md:-mt-5 md:-ms-3  mt-0 text-violet-800"
                />
                <span className="pl-4 text-violet-700 hover:text-black">
                  Cart
                </span>
              </li>
            </Link>
          )}
          {!isAuthanticated ? (
            <>
              <Link to="/login">
                <li className="menuItem">Login</li>
              </Link>
              <Link to="/signup">
                <li className="menuItem">Signup</li>
              </Link>
            </>
          ) : (
            <Link to="/orders">
              <li className="menuItem">My orders</li>
            </Link>
          )}

          <Link to="/about">
            <li className="menuItem">About Us</li>
          </Link>
          <Link to="/contact">
            <li className="menuItem">
              {"    "}
              Contact
            </li>
          </Link>
          {!mobileMenu && (
            <li className="menuItem">
              <HiOutlineSearch onClick={openSearch} />
            </li>
          )}
        </ul>

        <div className="mobileMenuItems">
          {mobileMenu ? (
            <>
              <VscChromeClose onClick={() => setMobileMenu(false)} />
            </>
          ) : (
            <>
              <HiOutlineSearch onClick={openSearch} />
              <Link to="/cart">
                <li className="menuItem p-0 ">
                  <HiShoppingCart />
                  <Badge
                    count={cartCount}
                    className="-mt-[5rem] ms-6 w-3/12 text-violet-800"
                  />
                </li>
              </Link>
              <SlMenu onClick={openMobileView} />
            </>
          )}
        </div>

        {/* Profile avatar */}
        {isAuthanticated ? (
          <div>
            <Dropdown overlay={widgetMenu}>
              <Avatar size={50} className="w-full" src={user?.avatar?.url} />
            </Dropdown>
          </div>
        ) : (
          <Avatar icon={<UserOutlined />} onClick={() => navigate("/login")} />
        )}
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar px-4 md:px-16">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search Products"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
