"use client";
import Link from "next/link";
import { useContext } from "react";
import { RiUserShared2Line } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { ClienteContext } from "../context/ClienteContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { navigate } from "./actions";

function Titulo() {
  const { idClienteLogado, nomeClienteLogado, mudaLogin } =
    useContext(ClienteContext);
  const router = useRouter();

  function logout() {
    Swal.fire({
      title: "Confirma saída do sistema?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        mudaLogin({ id: null, nome: "" });
      }
    });
  }

  const scrollToSection = () => {
    const section = document.getElementById("livros");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{ backgroundColor: "#1E3A8A", borderColor: "#1E3A8A" }}
      className="border-blue-300 py-1.5 bg-blue-200"
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <img src="./logoescrito.png" className="w-28" alt="Editora Logo" />
        </Link>
        <div className="flex items-center space-x-4">
          <form className="flex-1" action={navigate}></form>
        </div>
        <div className="flex items-center space-x-2">
          {idClienteLogado ? (
            <div className="flex items-center space-x-2 text-white">
              <span>{nomeClienteLogado}</span>
              <span onClick={logout} style={{ cursor: "pointer" }}>
                <RxExit className="inline" title="Sair" />
              </span>
              <Link target="_blank" href="http://localhost:3002/">
                <button
                  type="submit"
                  className="text-orange-700 absolute end-2.5 bottom-2.5 border border-orange-700 hover:bg-orange-100 hover:text-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Enviar livro
                </button>
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="block py-2 px-4 focus:outline-none text-black bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm"
              aria-current="page"
              style={{ backgroundColor: "#FDB96A" }}
            >
              <RiUserShared2Line className="inline" /> Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Titulo;
