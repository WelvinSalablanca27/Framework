import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import TablaEmpleados from '../components/empleados/TablaEmpleados';
import ModalRegistroEmpleados from '../components/empleados/ModalRegistroEmpleados';
import ModalEdicionEmpleados from '../components/empleados/ModalEdicionEmpleados';
import ModalEliminacionEmpleado from '../components/empleados/ModalEliminaEmpleados';


const Empleado = () => {
    const [empleados, setEmpleados] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        celular: "",
        cargo: "",
        fecha_contratacion: ""
    });

    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

    const [empleadoEditada, setEmpleadoEditada] = useState(null);
    const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);

    const abrirModalEdicion = (clientes) => {
        setEmpleadoEditada({ ...clientes });
        setMostrarModalEdicion(true);
    };

    const guardarEdicion = async () => {
        if (!empleadoEditada.primer_nombre.trim()) return;
        try {
            const respuesta = await fetch(`http://localhost:3001/api/actualizarEmpleados/${empleadoEditada.id_empleado}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(empleadoEditada)
            });
            if (!respuesta.ok) throw new Error('Error al actualizar');
            setMostrarModalEdicion(false);
            await obtenerEmpleados();
        } catch (error) {
            console.error("Error al editar Empleados:", error);
            alert("No se pudo actualizar la Empleados.");
        }
    };

    const abrirModalEliminacion = (clientes) => {
        setEmpleadoAEliminar(clientes);
        setMostrarModalEliminar(true);
    };

    const confirmarEliminacion = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3001/api/eliminarEmpleado/${empleadoAEliminar.id_empleado}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) throw new Error('Error al eliminar');
            setMostrarModalEliminar(false);
            setEmpleadoAEliminar(null);
            await obtenerEmpleados();
        } catch (error) {
            console.error("Error al eliminar Empleados:", error);
            alert("No se pudo eliminar la Empleados.");
        }
    };
    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
    };

    const agregarEmpleado = async () => {
        if (!nuevoEmpleado.primer_nombre.trim()) return;

        try {
            const respuesta = await fetch("http://localhost:3001/api/registrarEmpleado", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoEmpleado),
            }
            );

            if (!respuesta.ok) throw new Error("Error al guardar");

            // Limpiar y cerrar
            setNuevoEmpleado({
                primer_nombre: "",
                segundo_nombre: "",
                primer_apellido: "",
                segundo_apellido: "",
                celular: "",
                cargo: "",
                fecha_contratacion: ""
            });
            setMostrarModal(false);
            await obtenerEmpleados(); // Refresca la lista
        } catch (error) {
            console.error("Error al agregar el empleados:", error);
            alert("No se pudo guardar el empleados. Revisa la consola.");
        }
    };

    const obtenerEmpleados = async () => {
        try {
            const respuesta = await fetch("http://localhost:3001/api/empleados");

            if (!respuesta.ok) {
                throw new Error("Error al obtener los empleados");
            }
            const datos = await respuesta.json();

            setEmpleados(datos);
            setEmpleadosFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = empleados.filter(
            (empleados) =>
                empleados.primer_nombre.toLowerCase().includes(texto) ||
                empleados.id_empleado.toString().includes(texto)

        );
        setClientesFiltrados(filtrados);
    };


    useEffect(() => {
        obtenerEmpleados();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Clientes</h4>
                <Row>
                    <Col lg={5} md={6} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>

                    <Col className="text-end">
                        <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
                            + Nuevo Empleados
                        </Button>
                    </Col>

                </Row>
                <TablaEmpleados
                    empleado={empleadosFiltrados}
                    cargando={cargando}
                    abrirModalEdicion={abrirModalEdicion}
                    abrirModalEliminacion={abrirModalEliminacion}
                />

                <ModalRegistroEmpleados
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevoEmpleado={nuevoEmpleado}
                    manejarCambioInput={manejarCambioInput}
                    agregarEmpleado={agregarEmpleado}
                />

                <ModalEdicionEmpleados
                    mostrar={mostrarModalEdicion}
                    setMostrar={setMostrarModalEdicion}
                    empleadoEditada={empleadoEditada}
                    setEmpleadoEditada={setEmpleadoEditada}
                    guardarEdicion={guardarEdicion}
                />

                <ModalEliminacionEmpleado
                    mostrar={mostrarModalEliminar}
                    setMostrar={setMostrarModalEliminar}
                    Empleado={empleadoAEliminar}
                    confirmarEliminacion={confirmarEliminacion}
                />

            </Container>
        </>
    );
}


export default Empleado;