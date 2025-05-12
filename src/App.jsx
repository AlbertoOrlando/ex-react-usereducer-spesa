import { useState } from "react"

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {
  const [prodotti, setProdotti] = useState(products)

  return (
    <>
      <h1>Lista Prodotti</h1>
      <ul className="lista-prodotti">
        {prodotti.map((prodotto, i) => (
          <li key={i}>{prodotto.name} - € {prodotto.price}</li>
        ))}
      </ul>
    </>
  )
}

export default App
