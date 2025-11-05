import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionEmpleados = ({
    mostrar,
    setMostrar,
    empleadoEditada,
    setempleadoEditada,
    guardarEdicion,
}) => {
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setempleadoEditada((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>

            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="primer_nombre">
                        <Form.Label>Nombre 1 del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_nombre"
                            value={empleadoEditada?.primer_nombre}
                            onChange={manejarCambio}
                            placeholder="Ej: Enrique"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="segundo_nombre">
                        <Form.Label>Nombre 2 del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="segundo_nombre"
                            value={empleadoEditada?.segundo_nombre}
                            onChange={manejarCambio}
                            placeholder="Ej: Manuel"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="primer_apellido">
                        <Form.Label>Apellido 1 del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_apellido"
                            value={empleadoEditada?.primer_apellido}
                            onChange={manejarCambio}
                            placeholder="Ej: Hernández"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="segundo_apellido">
                        <Form.Label>Apellido 2 del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="segundo_apellido"
                            value={empleadoEditada?.segundo_apellido}
                            onChange={manejarCambio}
                            placeholder="Ej: Martínez"
                            maxLength={20}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="celular">
                        <Form.Label>Telefono del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="celular"
                            value={empleadoEditada?.celular}
                            onChange={manejarCambio}
                            placeholder="Ej: 8538****"
                            maxLength={8}
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cargo">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="cargo"
                            value={empleadoEditada?.cargo}
                            onChange={manejarCambio}
                            placeholder="Descripción opcional (máx. 100 caracteres)"
                            maxLength={150}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fecha_contratacion">
                        <Form.Label>Fecha Contratacion</Form.Label>
                        <Form.Control
                            type="text"
                            name="cedula"
                            value={empleadoEditada?.fecha_contratacion}
                            onChange={manejarCambio}
                            placeholder="Ej: 121******1005V"
                            maxLength={16}
                            required
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrar(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={guardarEdicion}
                    disabled={!empleadoEditada?.primer_nombre.trim()}
                >
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEdicionEmpleados;
