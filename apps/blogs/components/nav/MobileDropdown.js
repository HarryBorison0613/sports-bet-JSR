import Link from 'next/link'
import Image from 'next/image'

const Dropdown = ({ submenus }) => {

    const handleClickItem = (e) =>  {
        document.querySelector(".hamburger-react").click();
    }

    return (
     <ul className="dropdown mb-5 mt-2.5 ml-2.5">
      {submenus.map((submenu, index) => (
       <li className="flex flex-wrap" key={submenu.name+index} onClick={handleClickItem}>
           <div className="w-30 h-30 relative">
                <Image
                    src={submenu.icon}
                    alt='move'
                    width={20}
                    height={20}
                />
           </div>
           <div className="ml-2">
                <Link href={submenu.href} >
                    <a className='text-md py-3'> {submenu.name} </a>
                </Link>
           </div>

            

        </li>
      ))}
     </ul>
    );
   };
   
export default Dropdown;