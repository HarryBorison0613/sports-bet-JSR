import { EmptyIcon } from 'src/icons/empty'

const MatchListEmpty: React.FC = () => {
  return (
    <div className="min-h-[300px] grid place-items-center justify-center col-span-12 lg:col-span-8">
      <div className="text-slate-500/50 grid place-items-center text-center">
        <EmptyIcon className="text-8xl mb-4" />
        <div className="text-xl font-bold">Sem jogos</div>
        <p>Por favor, volte mais tarde</p>
      </div>
    </div>
  )
}

export default MatchListEmpty
