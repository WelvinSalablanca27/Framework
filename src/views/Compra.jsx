import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';
import TablaCompras from "../components/compras/TablaCompras";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroCompra from '../components/compras/ModalRegistroCompra';

const Compra = () => {
    const [compras, setCompras] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [compraFiltrados, setCompraFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevaCompra, setNuevaCompra] = useState({
        id_empleado: '',
        fecha_compra: '',
        total_compra: ''
    });

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevaCompra(prev => ({ ...prev, [name]: value }));
    };

    const agregarCompra = async () => {
        if (!nuevaCompra.id_empleado.trim()) return;

        try {
            const respuesta = await fetch('http://localhost:3001/api/registrarCompra', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaCompra)
            });

            if (!respuesta.ok) throw new Error('Error al guardar');

            // Limpiar y cerrar
            setNuevaCompra({
                id_empleado: '',
                fecha_compra: '',
                total_compra: ''
            });
            setMostrarModal(false);
            await obtenerCompras(); // Refresca la lista
        } catch (error) {
            console.error("Error al agregar Producto:", error);
            alert("No se pudo guardar la Producto. Revisa la consola.");
        }
    };


    const obtenerCompras = async () => {
        try {
            const respuesta = await fetch("http://localhost:3001/api/compras");

            if (!respuesta.ok) {
                throw new Error("Error al obtener las Compras");
            }
            const datos = await respuesta.json();

            setCompras(datos);
            setCompraFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }


    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = compras.filter(
            (compras) =>
                compras.id_empleado.toLowerCase().includes(texto) ||
                compras.fecha_compra.toString().includes(texto)

        );
        setCompraFiltrados(filtrados);
    };

    useEffect(() => {
        obtenerCompras();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Registro de Compras</h4>

                <Row>
                    <Col lg={5} md={6} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>

                    <Col className="text-end">
                        <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
                            + Nuevo Compra
                        </Button>
                    </Col>
                </Row>

                <TablaCompras
                    compras={compraFiltrados}
                    cargando={cargando} />


                <ModalRegistroCompra
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevaCompra={nuevaCompra}
                    manejarCambioInput={manejarCambioInput}
                    agregarCompra={agregarCompra}
                />
            </Container>
        </>
    );
}

export default Compra;
