'use client'
import { livroProps } from "../principal/cadlivros/page"
import { Dispatch, SetStateAction, useEffect } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Swal from 'sweetalert2'
import Cookies from "js-cookie"

interface listaLivroProps {
  livro: livroProps,
  livros: livroProps[],
  setLivros: Dispatch<SetStateAction<livroProps[]>>
}

function ItemLivro({ livro, livros, setLivros }: listaLivroProps) {

  async function excluirLivro() {

    const result = await Swal.fire({
      title: livro.titulo,
      text: `Confirma a Exclusão de ${livro.titulo}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    })

    if (result.isConfirmed) {

      const response = await fetch(`http://localhost:3004/livros/${livro.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const livros2 = livros.filter(x => x.id != livro.id)
        setLivros(livros2)

        Swal.fire({
          title: "Livro Excluído com Sucesso",
          text: livro.titulo,
          icon: "success"
        })
      } else {
        Swal.fire({
          title: "Erro... Livro Não Excluído",
          text: "Pode haver comentários para este livro",
          icon: "error"
        })
      }
    }
  }

  async function alterarDestaque() {

    const response = fetch(`http://localhost:3004/livros/destacar/${livro.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    const livros2 = livros.map(x => {
      if (x.id == livro.id) {
        return { ...x, destaque: !x.destaque }
      }
      return x
    })
    setLivros(livros2)
  }

  return (
    <tr key={livro.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={livro.foto} alt="Capa do Livro"
          className="foto-livro" />
      </th>
      <td className={`px-6 py-4 ${livro.destaque ? "font-extrabold" : ""}`}>
        {livro.titulo}
      </td>
      <td className={`px-6 py-4 ${livro.destaque ? "font-extrabold" : ""}`}>
        {livro.genero}
      </td>
      <td className={`px-6 py-4 ${livro.destaque ? "font-extrabold" : ""}`}>
        {Number(livro.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className={`px-6 py-4 ${livro.destaque ? "font-extrabold" : ""}`}>
        {livro.total} / {livro.num} =&nbsp;
        {livro.num == 0 ?
          0 :
          (livro.total / livro.num).toFixed(1)
        } estrelas
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirLivro} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemLivro