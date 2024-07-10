import ItemLivro from "./components/ItemLivro";
import Pesquisa from "./components/Pesquisa";
import "./globals.css";

async function getLivros() {
  try {
    const response = await fetch("http://localhost:3004/livros", {
      cache: "no-store",
    });

    // Verifique se a resposta é OK
    if (!response.ok) {
      throw new Error("Erro ao buscar dados");
    }

    const dados = await response.json();

    // Verifique se a resposta é um array
    if (!Array.isArray(dados)) {
      throw new Error("Os dados recebidos não são uma lista");
    }

    return dados;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
}

export interface livroProps {
  id: number;
  titulo: string;
  genero: string;
  autor: string;
  preco: number;
  foto: string;
  num: number;
  total: number;
  sinopse: string;
}

export default async function Home() {
  const livros = await getLivros();

  const listaLivros = livros.map((livro: livroProps) => (
    <ItemLivro key={livro.id} livro={livro} />
  ));

  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto">
          <Pesquisa />
          <div className="pt-10 grid grid-cols-2">
            <div className="mt-20 ps-11">
              <h1 className="mt-11 mb-4 pt-11 ps-20 text-2xl font-bold leading-none tracking-tight text-black lg:text-3xl">
                Encontre o que procura na Indie!
              </h1>
            </div>
            <div className="ps-40">
              <img src="/gatoloco.png" className="h-96" alt="Gato" />
            </div>
          </div>
          <h1 className="mt-5 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl">
            Editora Indie:{" "}
            <span
              className="underline underline-offset-3 decoration-8 "
              style={{ textDecorationColor: "#FDB96A" }}
            >
              O lugar que você procura!
            </span>
          </h1>
          <h1
            id="livros"
            className="mt-5 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl"
          >
            Confira nossos livros:
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {listaLivros}
          </div>
        </div>
      </div>
      <div>
        <div className="pt-10 w-full grid grid-cols-4 bg-black text-white font-semibold">
          <div>
            <div className="flex flex-wrap text-">
              <img src="./logo.png" className="h-16" alt="Editora Logo" />
              <img
                src="./logoescrito.png"
                className="h-16"
                alt="Editora Logo"
              />
            </div>
          </div>

          <div>
            <h2 className="text-yellow-200">Quick Links</h2>
            <h2>Sobre nós</h2>
            <h2>Contatos</h2>
            <h2>Login</h2>
            <h2>Cadastro</h2>
          </div>

          <div>
            <h2 className="text-yellow-200">Pessoal</h2>
            <h2>Minha Conta</h2>
            <h2>Coleção</h2>
            <h2>Termos</h2>
            <h2>Politica de Privacidade</h2>
            <h2>FAQ</h2>
          </div>

          <div>
            <h1 className="text-yellow-200">Não fique de fora!</h1>
            <h1>Seja ja um leitor parceiro ou autor parceiro</h1>
            <div className="grid grid-cols-2">
              <div>
                <input
                  type="email"
                  className="mt-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Seu email"
                />
              </div>
              <div>
                <button className="mt-12 ml-7 text-purple-900 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-white ">
                  Inscreva-se
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
