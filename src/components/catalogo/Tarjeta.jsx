import React from "react";
import { Col, Card, Badge, Stack } from "react-bootstrap";
import Zoom from "react-awesome-reveal";

const Tarjeta = ({
  indice,
  nombre_producto,
  descripcion_producto,
  precio_unitario,
  stock,
  id_categoria,
  imagen,
}) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mt-3">
      <Zoom triggerOnce duration={800} delay={50} damping={0.1}>
        <Card border="" className="shadow-sm">
          <div className="d-flex justify-content-center align-items-center p-2">
            <Card.Img
              variant="top"
              src={
                imagen?.startsWith("data:image")
                  ? imagen
                  : `data:image/png;base64,${imagen}`
              }
              alt={nombre_producto}
              style={{
                width: "100%",
                maxWidth: "180px", // 🖥️ tamaño normal
                height: "auto",
              }}
              className="img-fluid d-none d-md-block" // visible en tablet/pc
            />
            <Card.Img
              variant="top"
              src={
                imagen?.startsWith("data:image")
                  ? imagen
                  : `data:image/png;base64,${imagen}`
              }
              alt={nombre_producto}
              style={{
                width: "100%",
                maxWidth: "120px", // 📱 más pequeño en móvil
                height: "auto",
              }}
              className="img-fluid d-block d-md-none" // visible solo en móvil
            />
          </div>

          <Card.Body>
            <Card.Title className="text-center">
              <strong>{nombre_producto}</strong>
            </Card.Title>
            <Card.Text className="text-center">
              {descripcion_producto || "Sin descripción"}
            </Card.Text>
            <Stack direction="horizontal" gap={2} className="justify-content-center flex-wrap">
              <Badge pill bg="primary">
                <i className="bi-currency-dollar"></i>{" "}
                {Number(precio_unitario).toFixed(2)}
              </Badge>
              <Badge pill bg="secondary">
                <i className="bi-box"></i> Stock: {stock}
              </Badge>
              <Badge pill bg="info">
                <i className="bi-tag"></i> Cat: {id_categoria}
              </Badge>
            </Stack>
          </Card.Body>
        </Card>
      </Zoom>
    </Col>
  );
};

export default Tarjeta;