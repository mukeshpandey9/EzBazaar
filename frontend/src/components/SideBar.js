import { Sidebar } from "flowbite-react";
import { useState } from "react";
import {
  HiArrowLeft,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiOutlineDocumentReport,
  HiLogout,
  HiOutlineShieldExclamation,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const handleItemClick = (itemName) => {
    setActiveItem(itemName); // Set active item
    // Close sidebar on mobile when an item is clicked
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className="z-50 fixed top-0 bottom-0   w-fit h-full overflow-hidden">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <Sidebar
        className={`fixed top-0 bottom-0 w-screen md:w-[16rem] -left-[100%] ${
          isOpen && "left-0"
        } md:left-0 h-screen transition-left duration-300 font-medium ease-in-out`}
      >
        <Sidebar.Items>
          <HiArrowLeft
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden"
          />
          <div>LOGO</div>
          <Sidebar.ItemGroup className="font-bold px-5 md:px-0">
            <Link to="/admin/dashboard">
              <Sidebar.Item
                className={
                  activeItem === "Dashboard"
                    ? "bg-neutral-200"
                    : "text-violet-700 text-lg font-medium"
                }
                onClick={() => handleItemClick("Dashboard")}
                icon={HiChartPie}
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            <Sidebar.Collapse
              className={
                activeItem === "Comm"
                  ? "bg-neutral-200"
                  : "text-violet-700 text-lg font-medium"
              }
              // onClick={() => handleItemClick("Comm")}
              icon={HiShoppingBag}
              label="E-commerce"
            >
              <Link to="/admin/products">
                <Sidebar.Item
                  className={
                    activeItem === "Products"
                      ? "bg-neutral-200"
                      : "text-violet-700 text-lg font-medium"
                  }
                  onClick={() => handleItemClick("Products")}
                  icon={HiShoppingBag}
                >
                  Products
                </Sidebar.Item>
              </Link>
              <Link to="/admin/product/new">
                <Sidebar.Item
                  className={
                    activeItem === "create"
                      ? "bg-neutral-200"
                      : "text-violet-700 text-lg font-medium"
                  }
                  onClick={() => handleItemClick("create")}
                  icon={HiShoppingBag}
                >
                  Create Products
                </Sidebar.Item>
              </Link>
              <Link>
                <Sidebar.Item href="#">Shipping</Sidebar.Item>
              </Link>
            </Sidebar.Collapse>
            <Link to="/products">
              <Sidebar.Item
                className={
                  activeItem === "Inbox"
                    ? "bg-neutral-200"
                    : "text-violet-700 text-lg font-medium"
                }
                onClick={() => handleItemClick("Inbox")}
                icon={HiInbox}
              >
                Inbox
              </Sidebar.Item>
            </Link>
            <Link>
              <Sidebar.Item
                className={
                  activeItem === "Users"
                    ? "bg-neutral-200"
                    : "text-violet-700 text-lg font-medium"
                }
                onClick={() => handleItemClick("Users")}
                icon={HiUser}
              >
                Users
              </Sidebar.Item>
            </Link>
            <Link to="/admin/orders/all">
              <Sidebar.Item
                className={
                  activeItem === "Orders"
                    ? "bg-neutral-200"
                    : "text-violet-700 text-lg font-medium"
                }
                onClick={() => handleItemClick("Orders")}
                icon={HiOutlineDocumentReport}
              >
                Orders
              </Sidebar.Item>
            </Link>

            <Link to="/logout">
              <Sidebar.Item
                className={"text-violet-700 text-lg font-medium"}
                icon={HiLogout}
              >
                Logout
              </Sidebar.Item>
            </Link>
            <Link to="/">
              <Sidebar.Item
                className={"text-violet-700 text-lg font-medium"}
                icon={HiOutlineShieldExclamation}
              >
                Exit Admin
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
