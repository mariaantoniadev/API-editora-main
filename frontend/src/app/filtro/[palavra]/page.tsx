import Pesquisa from "../../components/Pesquisa"
import ItemLivro from "../../components/ItemLivro"
import { livroProps } from "../../page"

async function getLivros(palavra: string) {
  const response = await fetch("http://localhost:3004/livros/pesquisa/" + palavra,
    { cache: 'no-store' })
  const dados = await response.json()
  return dados
}

async function Filtro({ params }: { params: { palavra: string } }) {

  const livros = await getLivros(params.palavra)

  const listaLivros = livros.map((livro: livroProps) => (
    <ItemLivro key={livro.id} livro={livro} />
  ))

  return (
    <div className="max-w-7xl mx-auto">
      <Pesquisa />
      <h1 className="mt-5 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">
        Pesquisa de Livros:
        <span className="ms-2 underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">
          [{params.palavra}]</span>
      </h1>

      {livros.length >= 1 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {listaLivros}
        </div>
        :
        <h2>Não há livros com a palavra pesquisada</h2>
      }

    </div>
  )
}

export default Filtro