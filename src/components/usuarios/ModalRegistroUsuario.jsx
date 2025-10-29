import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroUsuario = ({
    mostrarModal,
    setMostrarModal,
    nuevousuario,
    manejarCambioInput,
    agregarUsuario,
}) => {
    return (
        <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar NuevO Usuaruio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="usuario">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            name="usuario"
                            value={nuevousuario.usuario}
                            onChange={manejarCambioInput}
                            placeholder="Ej. juanperez123"
                            maxLength={20}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contraseña">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="contraseña"
                            value={nuevousuario.contraseña}
                            onChange={manejarCambioInput}
                            placeholder="Ingresa una contraseña segura"
                            maxLength={100}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={agregarUsuario}
                    disabled={!nuevousuario.usuario.trim()}
                >
                    Guardar Usuario
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroUsuario;

