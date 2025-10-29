import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';
import TablaProductos from "../components/productos/TablaProductos";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroProducto from '../components/productos/ModalRegistroProducto';

const Producto = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
    });

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoProducto(prev => ({ ...prev, [name]: value }));
    };

    const agregarProducto = async () => {
        if (!nuevoProducto.nombre_producto.trim()) return;

        try {
            const respuesta = await fetch('http://localhost:3001/api/registrarProducto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto)
            });

            if (!respuesta.ok) throw new Error('Error al guardar');

            // Limpiar y cerrar
            setNuevoProducto({
                nombre_producto: '',
                descripcion_producto: '',
                id_categoria: '',
                precio_unitario: '',
                stock: '',
                imagen: ''
            });
            setMostrarModal(false);
            await obtenerProductos(); // Refresca la lista
        } catch (error) {
            console.error("Error al agregar Producto:", error);
            alert("No se pudo guardar la Producto. Revisa la consola.");
        }
    };

    const obtenerProductos = async () => {
        try {
            const respuesta = await fetch("http://localhost:3001/api/productos");

            if (!respuesta.ok) {
                throw new Error("Error al obtener las Productos");
            }
            const datos = await respuesta.json();

            setProductos(datos);
            setProductosFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = productos.filter(
            (Productos) =>
                Productos.nombre_producto.toLowerCase().includes(texto) ||
                Productos.descripcion_producto.toString().includes(texto)

        );
        setProductosFiltrados(filtrados);
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <>

            <Container className="mt-4">
                <h4>Registro de Productos</h4>

                <Row>
                    <Col lg={5} md={6} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>

                    <Col className="text-end">
                        <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
                            + Nuevo Producto
                        </Button>
                    </Col>

                </Row>
                <TablaProductos
                    productos={productosFiltrados}
                    cargando={cargando} 
                    />

                <ModalRegistroProducto
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevoProducto={nuevoProducto}
                    manejarCambioInput={manejarCambioInput}
                    agregarProducto={agregarProducto}
                />
            </Container>
        </>
    );
}

export default Producto;
