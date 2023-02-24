import BaseLayout from 'src/layouts/BaseLayout/BaseLayout'

const MdxLayout: React.FC<any> = ({ children, seo }) => {
  return (
    <BaseLayout>
      <article className="prose prose-pink max-w-4xl mx-auto py-12 px-6">
        <h1>{seo?.title}</h1>
        {children}
      </article>
    </BaseLayout>
  )
}

export default MdxLayout
