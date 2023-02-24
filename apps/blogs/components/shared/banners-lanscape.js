import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import WindowsBreackpoint from "../../lib/helpers/breackpoint";

export default function LandscapeBanner({ id, slug, img_desktop, img_mobile, banner_width, img_size, img_size_mobile, place="bottom_banner_post"}) {

  //Screen size
  const screenSize = WindowsBreackpoint(500).isBreakpoint;
  //Calculate height proportion based on screen size
  const heightProportion = () => {
      if(screenSize) {
            return img_size_mobile[1] / img_size_mobile[0];
      } else {
            return img_size[1] / img_size[0];
            
      }
  };

  //Choose the right banner if screen size is bigger than 768px
    const banner = screenSize ? img_mobile : img_desktop;



  const image = (
    <Image
      src={banner}
      alt={`CTA Cadastre agora ${id}`}
      className={cn("shadow-sm", {
        "hover:shadow-md transition-shadow duration-200": id,
      })}
      width={banner_width}
      height={banner_width * heightProportion()}
    />
  )
  return (
      
    <div className='sm:mx-0 relative banner-portrait__wrap'>
       
      {slug ? (
        <Link href={slug+place}>
          <a aria-label={id}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
};




