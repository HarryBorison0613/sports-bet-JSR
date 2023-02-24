import { categoriesFotball, categoryIconRepeat } from "@/lib/const";
import Link from "next/link";
import Image from "next/image";
import styles from "./component.module.scss";
import Categories_single from "./categories-single";

export default function PostCategories({ tags }) {
  return (
    <div className={styles.post_categories}>
      <Categories_single tags={tags} />
      <div className="post-categories-repeated-icons">
        {categoryIconRepeat.map((c) => (
          <div
            className="post-categories-wrapper flex mt-[10px] mb-[10px]"
            key={c.id}
          >
            <Image
              src={c.icon}
              alt="icon"
              aria-label="icon"
              width={20}
              height={20}
            />
            <Link href={`${c.href}`} key={c.name}>
              <a className="text-sm font-medium italic hover:text-quartenary gap-x-1.5 mr-2 ml-[20px]">
                {`${c.name}`}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}