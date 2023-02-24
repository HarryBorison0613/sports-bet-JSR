import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import { useState,  useRef, useLayoutEffect } from "react"

export default function Layout({ settings, children }) {
  const targetRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(targetRef.current.offsetHeight);
  }, []);

  var marginTop = height+'px';
 
  return (
    <>
      <Header settings={settings} targetRef={targetRef} headerHeight={marginTop}/>
      <main className={`min-h-screen`} style={{marginTop:marginTop}}>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
