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
      <footer className="bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img src="./logoescrito.png" className="h-16" alt="Editora Logo" />
          </div>

          <div>
            <h2 className="font-semibold mb-2" style={{ color: "#FDB96A" }}>
             
            </h2>
            
          </div>

          <div>
            <h2 className="font-semibold mb-2" style={{ color: "#FDB96A" }}>
              
            </h2>
          </div>

          <div>
            <h2 className="font-semibold mb-2" style={{ color: "#FDB96A" }}>
            Seja já um leitor parceiro ou autor parceiro!
            </h2>
          </div>
        </div>
      </footer>
    </>
  );
}
