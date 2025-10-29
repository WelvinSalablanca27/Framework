import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejarCambioInput,
  agregarProducto,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombre_producto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={nuevoProducto.nombre_producto}
              onChange={manejarCambioInput}
              placeholder="Ej: Cajas"
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion_producto">
            <Form.Label>Descripción del Producto</Form.Label>
            <Form.Control
              type="text"
              name="descripcion_producto"
              value={nuevoProducto.descripcion_producto}
              onChange={manejarCambioInput}
              placeholder="Ej: 4x4 chapa 14"
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="id_categoria">
            <Form.Label>ID Categoría</Form.Label>
            <Form.Control
              type="number"
              name="id_categoria"
              value={nuevoProducto.id_categoria}
              onChange={manejarCambioInput}
              placeholder="Ej: 1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="precio_unitario">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              type="number"
              name="precio_unitario"
              value={nuevoProducto.precio_unitario}
              onChange={manejarCambioInput}
              placeholder="Ej: 500"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock Disponible</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={nuevoProducto.stock}
              onChange={manejarCambioInput}
              placeholder="Ej: 90"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>Imagen del Producto</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="imagen"
              value={nuevoProducto.imagen}
              onChange={manejarCambioInput}
              placeholder="Ej: URL o descripción de imagen"
              maxLength={150}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarProducto}>
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;
