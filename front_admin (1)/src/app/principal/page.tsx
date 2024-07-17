"use client";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface livroTipo {
  num: number;
  estrelas: number;
}

interface geralTipo {
  clientes: number;
  livros: number;
  avaliacoes: number;
  avaliacoes_dia: number;
  precoMedio: number;
}

export default function Home() {
  const [livros, setLivros] = useState<livroTipo[]>([]);
  const [geral, setGeral] = useState<geralTipo>({
    clientes: 0,
    livros: 0,
    avaliacoes: 0,
    avaliacoes_dia: 0,
    precoMedio: 0,
  });

  useEffect(() => {
    async function getDadosGrafico() {
      const response = await fetch(
        "http://localhost:3004/avaliacoes/dados/estrelas"
      );
      const dados = await response.json();
      setLivros(dados);
    }
    getDadosGrafico();

    async function getDadosGerais() {
      const response = await fetch("http://localhost:3004/dadosGerais");

      const dados = await response.json();
      setGeral(dados);
    }
    getDadosGerais();
  }, []);

  const data = [
    ["Num", "Estrelas", { role: "style" }],
    ["1", 0, "#ff0000"], // RGB value
    ["2", 0, "yellow"], // English color name
    ["3", 0, "green"],
    ["4", 0, "color: #0000ff"], // CSS-style declaration
    ["5", 0, "color: #00ffff"],
  ];

  let somaAvaliacoes = 0;
  livros.forEach((livro) => {
    somaAvaliacoes += livro.num;
  });

  livros.forEach((livro) => {
    data[livro.estrelas][1] = (livro.num / somaAvaliacoes) * 100;
  });

  return (
    <div className="container">
      
    </div>
  );
}
