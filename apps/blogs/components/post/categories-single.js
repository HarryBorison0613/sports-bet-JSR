
import { categoriesFotball, categoriesMMA } from "@/lib/const";
import Link from "next/link";
import Image from "next/image";
import styles from "./component.module.scss";
import react, { useState, useEffect } from "react";

export default function Categories_single({ tags }) {
  // Array slice 8
  const filterArr = tags.slice(0, 8);

  // Checking if there is my name I am looking for
  const footballFilter = filterArr.filter((f) => {
    if (f.name == "Futebol") {
      return true;
    } else {
      return false;
    }
  });
  const ufcFilter = filterArr.filter((f) => {
    if (f.name == "UFC" || f.name == "MMA") {
      return true;
    } else {
      return false;
    }
  });

  //State
  const [football, setFootball] = useState([]);
  const [ufc, setUFC] = useState([]);

  // Defining the logic and if there is something in the array add it to state
  useEffect(() => {
    if (footballFilter.length > 0) {
      setFootball(categoriesFotball);
    } else if (ufcFilter.length > 0) {
      setUFC(categoriesMMA);
    }
    // Clear up
    return () => {
      setFootball([]);
      setUFC([]);
    };
  }, []);

  return (
    <div className={styles.post_categories}>
      {football.map((c) => (
        <div
          className="post-categories-wrapper flex mt-[10px] mb-[10px] "
          key={c.id}
        >
          <Image
            src={c.icon}
            alt="icon"
            aria-label="icon"
            width={20}
            height={20}
            styles={{ fontSize: "40px" }}
          />
          <Link href={`${c.href}`} key={c.name}>
            <a className="text-sm font-medium italic hover:text-quartenary gap-x-1.5 mr-2 ml-[20px]">
              {`${c.name}`}
            </a>
          </Link>
        </div>
      ))}
      <div className="w-[100%] h-[2px] text-black border-b-2 place-items-center mb-[5px]"></div>

      {ufc.map((c) => (
        <div
          className="post-categories-wrapper flex  mt-[10px] mb-[10px]"
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
            <a className="text-sm font-medium italic hover:text-quartenary gap-x-1.5 mr-2">
              {`#${c.name}`}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}