import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaEmpleados from '../components/empleados/TablaEmpleados';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import ModalRegistroEmpleado from '../components/empleados/ModalRegistroEmpleado';
import ModalEdicionEmpleado from '../components/empleados/ModalEdicionEmpleado';
import ModalEliminacionEmpleado from '../components/empleados/ModalEliminaEmpleado';

// Dependencias PDF
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [empleadoEditado, setEmpleadoEditado] = useState(null);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const hoy = new Date().toISOString().split('T')[0];

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    cargo: '',
    fecha_contratacion: hoy
  });

  const empleadosPaginados = empleadosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  // 🔎 Buscar
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = empleados.filter(emp =>
      `${emp.primer_nombre} ${emp.segundo_nombre} ${emp.primer_apellido} ${emp.segundo_apellido}`
        .toLowerCase()
        .includes(texto) ||
      emp.cargo.toLowerCase().includes(texto) ||
      emp.celular.includes(texto)
    );

    setEmpleadosFiltrados(filtrados);
  };

  // 📌 Obtener empleados
  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/api/empleados');
      const datos = await respuesta.json();
      setEmpleados(datos);
      setEmpleadosFiltrados(datos);
      setCargando(false);
    } catch {
      setCargando(false);
    }
  };

  // 📝 Inputs
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({ ...prev, [name]: value }));
  };

  // ➕ Registrar empleado
  const agregarEmpleado = async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/api/registrarEmpleado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEmpleado)
      });

      if (!respuesta.ok) throw new Error('Error al guardar');

      setNuevoEmpleado({
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        celular: '',
        cargo: '',
        fecha_contratacion: hoy
      });

      setMostrarModal(false);
      obtenerEmpleados();
    } catch (error) {
      console.error(error);
    }
  };

  // ✏ Editar empleado
  const abrirModalEdicion = (empleado) => {
    setEmpleadoEditado({
      ...empleado,
      fecha_contratacion: empleado.fecha_contratacion?.split("T")[0] || hoy
    });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3001/api/actualizarEmpleados/${empleadoEditado.id_empleado}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(empleadoEditado),
        }
      );

      if (!respuesta.ok) throw new Error("Error al actualizar");

      setMostrarModalEdicion(false);
      obtenerEmpleados();
    } catch (e) {
      console.error(e);
    }
  };

  // 🗑 Eliminar empleado
  const abrirModalEliminacion = (empleado) => {
    setEmpleadoAEliminar(empleado);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      await fetch(`http://localhost:3001/api/eliminarEmpleado/${empleadoAEliminar.id_empleado}`, {
        method: "DELETE",
      });

      setMostrarModalEliminar(false);
      setEmpleadoAEliminar(null);
      obtenerEmpleados();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  // 📄 **GENERAR PDF DE EMPLEADOS**
  const generarPDFEmpleados = () => {
    const doc = new jsPDF();

    doc.setFillColor(40, 167, 69);
    doc.rect(14, 10, 182, 15, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.text("Listado de Empleados", 105, 20, { align: "center" });

    const columnas = [
      ["ID", "Nombres", "Apellidos", "Celular", "Cargo", "Fecha Contratación"]
    ];

    const filas = empleados.map(emp => [
      emp.id_empleado,
      `${emp.primer_nombre} ${emp.segundo_nombre || ""}`,
      `${emp.primer_apellido} ${emp.segundo_apellido || ""}`,
      emp.celular,
      emp.cargo,
      emp.fecha_contratacion?.split("T")[0]
    ]);

    doc.autoTable({
      head: columnas,
      body: filas,
      startY: 35,
      headStyles: {
        fillColor: [40, 167, 69],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    const fecha = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    doc.save(`Empleados_${fecha}.pdf`);
  };

  return (
    <Container className="mt-4">
      <h4 className="d-flex justify-content-between align-items-center">
        Empleados
        <Button
          variant="success"
          className="fw-bold d-flex align-items-center"
          onClick={generarPDFEmpleados}
        >
          <FaFilePdf className="me-2" /> PDF
        </Button>
      </h4>

      <Row className="mb-3">
        <Col lg={5}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>

        <Col className="text-end">
          <Button
            className='color-boton-registro'
            onClick={() => setMostrarModal(true)}
          >
            + Nuevo Empleado
          </Button>
        </Col>
      </Row>

      <TablaEmpleados
        empleados={empleadosPaginados}
        cargando={cargando}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={empleados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroEmpleado
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoEmpleado={nuevoEmpleado}
        manejarCambioInput={manejarCambioInput}
        agregarEmpleado={agregarEmpleado}
      />

      <ModalEdicionEmpleado
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        empleadoEditado={empleadoEditado}
        setEmpleadoEditado={setEmpleadoEditado}
        guardarEdicion={guardarEdicion}
      />

      <ModalEliminacionEmpleado
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        empleado={empleadoAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Empleados;
