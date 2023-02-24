import { useState } from "react";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

function MenuItems({ items, pais, live, index }) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const showMenu = () => {
    setVisible(true);
  };

  const hideMenu = () => {
    setVisible(false);
  };

  return (
    <li
      className={`list-none center ${
        index === 0 ? "pr-5" : "px-5"
      } items-center flex ${items.my_class}`}
      onMouseEnter={showMenu}
      onMouseLeave={hideMenu}
    >
      {items.submenu ? (
        <div className={items.my_class}>
          <div className="menu-item-has-child relative flex flex-wrap items-center">
            <Link
              href={items.href}
              key={items.name}
              className={`relative main-item ${
                router.pathname === items.href ? " active" : ""
              }${index === 0 ? " ml-0 xl:ml-0" : ""}${
                items.my_class.length ? " mr-0 xl:mr-0 " + items.my_class : ""
              }`}
            >
              {items.title}
            </Link>

            <div className="w-2.5 h-2.5 ml-2 relative menu-item__child-arrow">
              <Image
                src="/artigos/vectors/arrow.svg"
                alt="move"
                layout="fill"
              />
            </div>
          </div>

          <Dropdown
            submenus={items.submenu}
            pais={pais}
            style={{ display: visible ? "flex" : "none" }}
            live={live}
          />
        </div>
      ) : (
        <Link href={items.href} key={items.name}>
          {items.title}
        </Link>
      )}
    </li>
  );
}

export default MenuItems;
