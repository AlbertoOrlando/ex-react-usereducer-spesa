import { useState, useReducer } from "react"

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const alreadyAdded = state.find(p => p.name === action.payload.name)
      if (alreadyAdded) {
        return state.map(p =>
          p.name === action.payload.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      } else {
        return [...state, { ...action.payload, quantity: 1 }]
      }
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return state
      }
      return state.map(p =>
        p.name === action.payload.name
          ? { ...p, quantity: action.payload.quantity }
          : p
      )
    }
    case 'REMOVE_ITEM':
      return state.filter(p => p.name !== action.payload)
    default:
      return state;
  }
}

function App() {

  // esercizio versione fatta da me

  // const [prodotti] = useState(products)
  // const [addedProducts, setAddedProducts] = useState([])

  // const addToCart = (prodotto) => {
  //   setAddedProducts(prev => {
  //     const found = prev.find(p => p.name === prodotto.name)
  //     if (found) {
  //       return prev.map(p =>
  //         p.name === prodotto.name
  //           ? { ...p, quantity: p.quantity + 1 }
  //           : p
  //       )
  //     } else {
  //       return [...prev, { ...prodotto, quantity: 1 }]
  //     }
  //   })
  // }

  // const removeFromCart = (indexToRemove) => {
  //   setAddedProducts(prev =>
  //     prev.map((p, i) =>
  //       i === indexToRemove
  //         ? { ...p, quantity: p.quantity - 1 }
  //         : p
  //     ).filter(p => p.quantity > 0)
  //   )
  // }

  // const total = addedProducts.reduce(
  //   (sum, prodotto) => sum + prodotto.price * prodotto.quantity, 0
  // )

  // return (
  {/* esercizio versione fatta da me */ }

  {/* <h1>Lista Prodotti</h1>
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
      <h3>Totale: € {total.toFixed(2)}</h3>
      <button onClick={() => setAddedProducts([])}>Pulisci carrello</button> */}
  //     </>
  //   )
  // }

  // export default App



  // versione correzione esercizio

  //   const [addedProducts, setAddedProducts] = useState([])

  //   const updateProductQuantity = (name, quantity) => {
  //     if (quantity < 1 || isNaN(quantity)) {
  //       return
  //     }
  //     setAddedProducts(prev => prev.map((p) => p.name === name ? { ...p, quantity } : p))
  //   }

  //   const addToCart = (product) => {
  //     const alredyAdded = addedProducts.find(p => p.name === product.name)
  //     if (alredyAdded) {
  //       updateProductQuantity(alredyAdded.name, alredyAdded.quantity + 1)
  //       return;
  //     }
  //     setAddedProducts(prev => [...prev, { ...product, quantity: 1 }])
  //   }

  //   const removeFromCart = (product) => {
  //     setAddedProducts(curr => curr.filter(p => p.name !== product.name))
  //   }

  //   const totalToPay = addedProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)


  //   return (
  //     <>
  //       {/* versione correzione esercizio */}
  //       <h1>Lista prodotti</h1>
  //       <ul>
  //         {products.map((p, i) => (
  //           <li key={i}>{p.name} ({p.price.toFixed(2)}€)
  //             <button onClick={() => addToCart(p)}>Aggiungi al carrello</button>
  //           </li>
  //         ))}
  //       </ul>
  //       {addedProducts.length > 0 && (<>
  //         <h2>Carrello</h2>
  //         <ul>
  //           {addedProducts.map((p, i) => (
  //             <li key={i}>
  //               <p><input type="number" value={p.quantity} onChange={e => { updateProductQuantity(p.name, parseInt(e.target.value)) }} />
  //                 <span>{p.name} ({p.price.toFixed(2)}€) x </span></p>

  //               <button onClick={() => removeFromCart(p)}>Rimuovi dal carrello</button>
  //             </li>
  //           ))}
  //         </ul>
  //         <h2>Il totale da pagare è :{totalToPay.toFixed(2)}€</h2>
  //       </>)}

  //     </>
  //   )
  // }

  // export default App




  const [addedProducts, dispatchCart] = useReducer(cartReducer, [])



  const totalToPay = addedProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)


  return (

    <>
      <h1>Lista prodotti</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>{p.name} ({p.price.toFixed(2)}€)
            <button onClick={() => dispatchCart({ type: "ADD_ITEM", payload: p })}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>
      {addedProducts.length > 0 && (<>
        <h2>Carrello</h2>
        <ul>
          {addedProducts.map((p, i) => (
            <li key={i}>
              <p><input type="number" value={p.quantity} onChange={e => dispatchCart({ type: "UPDATE_QUANTITY", payload: { name: p.name, quantity: parseInt(e.target.value) } })} />
                <span>{p.name} ({p.price.toFixed(2)}€) x </span></p>

              <button onClick={() => dispatchCart({ type: "REMOVE_ITEM", payload: p.name })}>Rimuovi dal carrello</button>
            </li>
          ))}
        </ul>
        <h2>Il totale da pagare è :{totalToPay.toFixed(2)}€</h2>
      </>)}

    </>
  )
}

export default App


