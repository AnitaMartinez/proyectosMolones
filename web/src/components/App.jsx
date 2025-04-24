import "../scss/App.scss";
import { useEffect } from "react";

const URL_PRODUCTION = "https://proyectosmolones.onrender.com";
const URL_LOCAL = "http/localhost:5001";
// condición ? camino1 : camino2
const URL = process.env.NODE_ENV === "development" ? URL_LOCAL : URL_PRODUCTION;

function App() {

    useEffect(() => {
        fetch(`${URL}/api/projects`)
        //...
    }, [])

    return (
        <>
            <header><h1>Pagina web</h1></header>
            <main>
                <h2>Este es el main</h2>
                <p>Ex sint id tempor exercitation proident cupidatat aliquip laborum in. Duis et culpa est consequat officia. Cillum incididunt commodo adipisicing cupidatat eu. Anim ullamco amet proident pariatur occaecat laboris et fugiat aliquip in sunt aliquip ex irure. Ipsum eu tempor laborum fugiat est elit cillum sit aliqua anim occaecat aliqua. Consequat veniam exercitation amet ut sunt irure enim.</p>
            </main>
        </>
    );
}

export default App;
