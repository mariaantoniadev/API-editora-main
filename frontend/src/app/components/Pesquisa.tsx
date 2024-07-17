'use client'
import { useRouter } from 'next/navigation'
import { navigate } from './actions'

function Pesquisa() {
  const router = useRouter()

  const scrollToSection = () => {
    const section = document.getElementById('livros');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex mt-3 max-w-5xl mx-auto">
      {/* Barra de Pesquisa */}
      <form className="flex-1" action={navigate}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquisa</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" name="pesq" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Informe título ou gênero do livro" required />
          <button type="submit" className="text-blue-700 absolute end-2.5 bottom-2.5 border border-blue-700 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:border-blue-600 dark:text-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pesquisar</button>
        </div>
      </form>

      {/* Botão de Lançamentos */}
      <button 
        onClick={scrollToSection}
        type="button" 
        className="ml-4 mt-1.5 focus:outline-none text-black bg-[#FDB96A] hover:bg-yellow-600 hover:text-white focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:border-yellow-600 dark:text-black dark:hover:bg-yellow-700 dark:hover:text-white dark:focus:ring-yellow-900">
        Lançamentos
      </button>
    </div>
  )
}

export default Pesquisa
