import { useState, useEffect } from "react";

export const WindowScroll = () => {
  const [sticky, setSticky] = useState(false);

  //update scroll direction
  useEffect(() => {
    // Store pageYOffset in a ref so we can compare later on
    const lastScroll = window.pageYOffset;
    // New val for scroll direction
    const updateSC = () => {
      //New val for scroll direction
      const scrollY = window.pageYOffset;
      //Checking if scroll direction is up or down
      const direction = scrollY > lastScroll ? "down" : "up";
      //If sticky is true and scroll is bigger than 5 or scrolling up setting the direction
      if (
        (direction !== sticky && scrollY - lastScroll > 5) ||
        scrollY - lastScroll < -5
      ) {
        setSticky(direction);
      }
      //Setting last scroll to the current scroll this updates my last scroll above
      lastScroll = scrollY > 0 ? scrollY : 0;
    };

    // Add event listener
    window.addEventListener("scroll", updateSC);
    // Remove event listener to prevent memory leaks -> cleanup
    return () => {
      window.removeEventListener("scroll", updateSC);
    };

    //only sticky gets updated
  }, [sticky]);
  return sticky;
};