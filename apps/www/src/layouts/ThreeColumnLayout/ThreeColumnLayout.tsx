import About from 'src/components/About/About'
import Container from 'src/components/Container/Container'
import styles from './ThreeColumnLayout.module.css'

export interface IThreeColumnLayoutProps {
  left: any
  right: any
  blogCarousel?: any
}

const ThreeColumnLayout: React.FC<
  React.PropsWithChildren<IThreeColumnLayoutProps>
> = ({ left, right, children, blogCarousel }) => {
  return (
    <Container className={styles.base}>
      <div className="col-span-9 flex flex-col gap-5">
        {blogCarousel && (
          <div className="relative overflow-hidden">{blogCarousel}</div>
        )}

        <div className={styles.main}>
          <div className={styles.left}>{left}</div>

          <div className={styles.content}>
            {children}
            <About className="hidden lg:block" />
          </div>
        </div>
      </div>

      <div className="col-span-3 flex flex-col gap-5">
        {right}
        <About className="block lg:hidden" />
      </div>
    </Container>
  )
}

export default ThreeColumnLayout
