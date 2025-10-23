import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";

const Producto = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerProductos = async () => {
        try {
            const respuesta = await fetch("http://localhost:3001/api/productos");

            if (!respuesta.ok) {
                throw new Error("Error al obtener las Productos");
            }
            const datos = await respuesta.json();

            setProductos(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Registro de Productos</h4>
                <TablaProductos
                    productos={productos}
                    cargando={cargando} />
            </Container>
        </>
    );
}

export default Producto;
