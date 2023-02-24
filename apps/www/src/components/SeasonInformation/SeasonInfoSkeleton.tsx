import Card from 'src/components/Card/Card'

export const SeasonInfoSkeleton = () => (
  <Card title="Informações da Liga" className="animate-pulse">
    <Card.Content className="grid grid-cols-2 gap-4">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="grid gap-2 place-content-center">
          <div className="w-[64px] aspect-square rounded-md bg-slate-200 mx-auto" />
          <div className="h-[12px] w-full bg-slate-200 rounded-md mx-auto" />
          <div className="h-[12px] w-10/12 bg-slate-200 rounded-md mx-auto" />
        </div>
      ))}
    </Card.Content>

    <Card.Content>
      <div className="h-[12px] mb-2 w-3/12 bg-slate-200 rounded-md " />
      {[...Array(9)].map((_, index) => (
        <div key={index} className="py-3 border-b last-of-type:border-b-0">
          <div className="h-[12px] bg-slate-200 rounded-md" />
        </div>
      ))}
    </Card.Content>
  </Card>
)
