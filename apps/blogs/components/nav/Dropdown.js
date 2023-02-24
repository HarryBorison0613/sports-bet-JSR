import Link from "next/link";
import Image from "next/image";

const Dropdown = ({ submenus,style,pais, live }) => {


  return (
    <div className="dropdown__wrapper mx-auto z-50">
      <ul
        className="dropdown container list-none flex min-h-[350px] flex-row  pl-[50px] pr-[50px] justify-between pt-[50px] pb-[50px] border-none"
        style={style}
      >
        <div className="dropdown-categories container">
          {submenus.map((submenu, index) => (
            <Link href={submenu.href} key={submenu.name}>
              <a className="flex flex-row items-center gap-x-1.5 relative top-menu__link mb-2 w-full lg:w-auto border-none">
                <Image
                  src={submenu.icon}
                  alt={submenu.icon}
                  width={25}
                  height={25}
                />
                {submenu.name}
              </a>
            </Link>
          ))}
        </div>

        <div className="dropdown-countries container">
          {pais.map((pais, index) => (
            <Link href={pais.href} key={pais.name}>
              <a className="flex items-center gap-x-1.5 relative top-menu__link mb-2 w-full lg:w-auto border-none">
                <Image src={pais.icon} alt={pais.icon} width={25} height={25} />
                {pais.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="dropdown-countries container">
          {live.map((live, index) => (
            <Link href={live.href} key={live.name}>
              <a className="flex items-center gap-x-1.5 relative top-menu__link mb-2 w-full lg:w-auto border-none">
                <Image src={live.icon} alt={live.icon} width={60} height={52} />
                {live.name}
              </a>
            </Link>
          ))}
        </div>
        
      </ul>
    </div>
  );
};

export default Dropdown;