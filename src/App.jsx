import { useState } from "react"

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {
  const [prodotti] = useState(products)
  const [addedProducts, setAddedProducts] = useState([])

  const addToCart = (prodotto) => {
    setAddedProducts(prev => {
      const found = prev.find(p => p.name === prodotto.name)
      if (found) {
        return prev.map(p =>
          p.name === prodotto.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      } else {
        return [...prev, { ...prodotto, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (indexToRemove) => {
    setAddedProducts(prev =>
      prev.map((p, i) =>
        i === indexToRemove
          ? { ...p, quantity: p.quantity - 1 }
          : p
      ).filter(p => p.quantity > 0)
    )
  }

  return (
    <>
      <h1>Lista Prodotti</h1>
      <ul className="lista-prodotti">
        {prodotti.map((prodotto, i) => (
          <li key={i}>
            {prodotto.name} - € {prodotto.price}
            <button onClick={() => addToCart(prodotto)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>
      <h2>Carrello</h2>
      <ul className="carrello">
        {addedProducts.map((prodotto, i) => (
          <li key={i}>
            {prodotto.name} - € {prodotto.price} x {prodotto.quantity}
            <button onClick={() => removeFromCart(i)}>Rimuovi dal carrello</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
