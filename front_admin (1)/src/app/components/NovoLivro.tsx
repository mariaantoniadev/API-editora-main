'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { livroProps } from "../principal/cadlivros/page"
import { Dispatch, SetStateAction, useEffect } from "react"
import { toast } from "sonner"

type Inputs = {
  titulo: string
  genero: string
  autor: string
  preco: number
  foto: string
  sinopse: string
}

interface novoLivroProps {
  livros: livroProps[],
  setLivros: Dispatch<SetStateAction<livroProps[]>>
}

function NovoLivro({ livros, setLivros }: novoLivroProps) {
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  async function incluirLivro(data: Inputs) {

    const novoLivro: livroProps = {
      id: 0,                        // para não dar erro dos atributos (typescript)
      titulo: data.titulo,
      genero: data.genero,
      autor: data.autor,
      sinopse: data.sinopse,
      foto: data.foto,
      preco: Number(data.preco),
      admin_id: Number(Cookies.get("admin_logado_id")),
      num: 0,
      total: 0,
      destaque: true
    }

    const response = await fetch("http://localhost:3004/livros",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novoLivro)
      },
    )

    const livros2 = [novoLivro, ...livros]
    setLivros(livros2)

    if (response.status == 201) {
      toast.success("Ok! Livro cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Livro...")
    }
  }

  useEffect(() => {
    setFocus("titulo")
  }, [])

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Livros
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirLivro)}>
        <div className="mb-5">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Título do Livro</label>
          <input type="text" id="titulo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("titulo")}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="genero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gênero</label>
          <input type="text" id="genero"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("genero")}
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="mb-5">
            <label htmlFor="autor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Autor </label>
            <input type="string" id="autor"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("autor")}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Preço R$</label>
            <input type="number" id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("preco")}
            />
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            URL da Foto</label>
          <input type="text" id="foto"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("foto")}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sinopse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sinopse do Livro</label>
          <textarea id="sinopse" rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("sinopse")}></textarea>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </>
  )
}

export default NovoLivro