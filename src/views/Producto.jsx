import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";

const Producto = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre_producto: "",
        descripcion_producto: "",
        id_categoria: "",
        precio_unitario: "",
        stock: "",
        imagen: "",
    });


    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [productoEditado, setProductoEditado] = useState(null);
 
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
    const [productoAEliminado, setProductoEliminado] = useState(null);

    
    const obtenerProductos = async () => {
        try {
            const respuesta = await fetch("http://localhost:3001/api/productos");
            if (!respuesta.ok) throw new Error("Error al obtener productos");
            const datos = await respuesta.json();
            setProductos(datos);
            setProductosFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.error(error.message);
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    // BUSQUEDA
    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);
        const filtrados = productos.filter(
            (p) =>
                p.nombre_producto.toLowerCase().includes(texto) ||
                p.descripcion_producto.toLowerCase().includes(texto)
        );
        setProductosFiltrados(filtrados);
    };


    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoProducto((prev) => ({ ...prev, [name]: value }));
    };

    const agregarProducto = async () => {
        if (!nuevoProducto.nombre_producto.trim()) return;
        try {
            const respuesta = await fetch("http://localhost:3001/api/registrarProducto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto),
            });
            if (!respuesta.ok) throw new Error("Error al guardar");

            setNuevoProducto({
                nombre_producto: "",
                descripcion_producto: "",
                id_categoria: "",
                precio_unitario: "",
                stock: "",
                imagen: "",
            });
            setMostrarModal(false);
            await obtenerProductos();
        } catch (error) {
            console.error(error);
            alert("No se pudo guardar el producto. Revisa la consola.");
        }
    };

    const abrirModalEdicion = (producto) => {
        setProductoEditado({ ...producto });
        setMostrarModalEdicion(true);
    };

    const guardarEdicion = async () => {
        if (!productoEditado.nombre_producto.trim()) return;
        try {
            const respuesta = await fetch(`http://localhost:3001/api/actualizarProductos/${productoEditado.id_producto}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoEditado),
            });
            if (!respuesta.ok) throw new Error("Error al actualizar");
            setMostrarModalEdicion(false);
            await obtenerProductos();
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("No se pudo actualizar el producto.");
        }
    };

    // MODAL ELIMINACIÓN
    const abrirModalEliminacion = (producto) => {
        setProductoEliminado(producto);
        setMostrarModalEliminacion(true);
    };

    const confirmarEliminacion = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3001/api/eliminarProducto/${productoAEliminado.id_producto}`, {
                method: "DELETE",
            });
            if (!respuesta.ok) throw new Error("Error al eliminar");
            setMostrarModalEliminacion(false);
            setProductoEliminado(null);
            await obtenerProductos();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("No se pudo eliminar el producto.");
        }
    };

    return (
        <Container className="mt-4">
            <h4>Registro de Productos</h4>

            <Row className="mb-3">
                <Col lg={5} md={6} sm={8} xs={7}>
                    <CuadroBusquedas textoBusqueda={textoBusqueda} manejarCambioBusqueda={manejarCambioBusqueda} />
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
                abrirModalEdicion={abrirModalEdicion}
                abrirModalEliminacion={abrirModalEliminacion}
            />

            <ModalRegistroProducto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                nuevoProducto={nuevoProducto}
                setNuevoProducto={setNuevoProducto}
                manejarCambioInput={manejarCambioInput}
                agregarProducto={agregarProducto}
            />

            <ModalEdicionProducto
                mostrar={mostrarModalEdicion}
                setMostrar={setMostrarModalEdicion}
                productoEditado={productoEditado}
                setProductoEditado={setProductoEditado}
                guardarEdicion={guardarEdicion}
            />

            <ModalEliminacionProducto
                mostrar={mostrarModalEliminacion}
                setMostrar={setMostrarModalEliminacion}
                productoEliminado={productoAEliminado}
                confirmarEliminacion={confirmarEliminacion}
            />
        </Container>
    );
};

export default Producto;
