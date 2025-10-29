import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';
import TablaUsuarios from "../components/usuarios/TablaUsuarios";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroUsuario from '../components/usuarios/ModalRegistroUsuario';

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [usuarioFiltradas, setUsuarioFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");


    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevousuario, setNuevoUsuario] = useState({
        usuario: '',
        contraseña: ''
    });


    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario(prev => ({ ...prev, [name]: value }));
    };

    const agregarUsuario = async () => {
        if (!nuevousuario.usuario.trim()) return;

        try {
            const respuesta = await fetch('http://localhost:3001/api/registrarUsuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevousuario)
            });

            if (!respuesta.ok) throw new Error('Error al guardar');

            // Limpiar y cerrar
            setNuevoUsuario({ usuario: '', contraseña: '' });
            setMostrarModal(false);
            await obtenerUsuarios(); // Refresca la lista
        } catch (error) {
            console.error("Error al agregar categoría:", error);
            alert("No se pudo guardar la categoría. Revisa la consola.");
        }
    };

    const obtenerUsuarios = async () => {
        try {
            const respuesta = await fetch("http://localhost:3001/api/usuarios");

            if (!respuesta.ok) {
                throw new Error("Error al obtener las usuarios");
            }
            const datos = await respuesta.json();

            setUsuarios(datos);
            setUsuarioFiltradas(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtradas = usuarios.filter(
            (usuarios) =>
                usuarios.usuario.toLowerCase().includes(texto) ||
                usuarios.contraseña.toLowerCase().includes(texto)
        );
        setUsuarioFiltradas(filtradas);
    };


    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Registro de Usuarios</h4>

                <Row>
                    <Col lg={5} md={8} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>
                </Row>

                <Col className="text-end">
                    <Button
                        variant="primary"
                        onClick={() => setMostrarModal(true)}
                    >
                        + Nuevo Usuario
                    </Button>
                </Col>

                <TablaUsuarios
                    usuarios={usuarioFiltradas}
                    cargando={cargando} />

                    <ModalRegistroUsuario
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevousuario={nuevousuario}
                    manejarCambioInput={manejarCambioInput}
                    agregarUsuario={agregarUsuario}
                />
            </Container>
        </>
    );
}

export default Usuario;
