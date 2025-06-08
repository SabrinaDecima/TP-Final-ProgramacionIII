import React, { useEffect, useState } from 'react'
import { ListGroup, Container, Row, Col, Table, Spinner } from 'react-bootstrap'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { errorToast } from '../../utils/notification.jsx'

const AdminHistorial = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [userClasses, setUserClasses] = useState([])
    const [userCuotas, setUserCuotas] = useState(null)
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [loadingDetails, setLoadingDetails] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            setLoadingUsers(true)
            try {
                const res = await fetch('http://localhost:3000/users')
                if (!res.ok) throw new Error('Error al cargar usuarios')
                const data = await res.json()
                const usersArray = Array.isArray(data) ? data : data.users || []

                // Solo usuarios con roleId === 3 (socios/members)
                const socios = usersArray.filter(user => user.roleId === 3)
                setUsers(socios)
            } catch (err) {
                errorToast(err.message || 'Error al cargar usuarios')
            } finally {
                setLoadingUsers(false)
            }
        }
        fetchUsers()
    }, [])


    const handleSelectUser = async (user) => {
        setSelectedUser(user)
        setUserClasses([])
        setUserCuotas(null)
        setLoadingDetails(true)

        try {
            const [classesRes, cuotasRes] = await Promise.all([
                fetch(`http://localhost:3000/users/${user.id}/classes`),
                fetch(`http://localhost:3000/users/${user.id}/cuotas/impagas`),
            ])

            if (!classesRes.ok) throw new Error('Error al obtener clases')
            if (!cuotasRes.ok) throw new Error('Error al obtener cuotas')

            const classesData = await classesRes.json()
            const cuotasData = await cuotasRes.json()

            // ✅ CORREGIDO ACÁ
            setUserClasses(Array.isArray(classesData.classes) ? classesData.classes : [])
            setUserCuotas(cuotasData || null)
        } catch (err) {
            errorToast(err.message || 'Error al obtener detalles')
            setUserClasses([])
            setUserCuotas(null)
        } finally {
            setLoadingDetails(false)
        }
    }


    return (
        <Container className="mt-4">
            <ToastContainer transition={Bounce} />
            <h2>Ver historial</h2>
            <Row>
                <Col md={4}>
                    <h4>Usuarios</h4>
                    {loadingUsers ? (
                        <Spinner animation="border" />
                    ) : (
                        <ListGroup>
                            {users.map(user => (
                                <ListGroup.Item
                                    action
                                    key={user.id}
                                    active={selectedUser?.id === user.id}
                                    onClick={() => handleSelectUser(user)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {user.name} {user.lastname} ({user.email})
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={8}>
                    {selectedUser ? (
                        <>
                            <h4>Historial de {selectedUser.name} {selectedUser.lastname}</h4>

                            <div className="mb-4">
                                <h5>Clases inscritas:</h5>
                                {userClasses.length === 0 ? (
                                    <p>No tiene clases inscritas.</p>
                                ) : (
                                    <ListGroup>
                                        {userClasses.map(c => (
                                            <ListGroup.Item key={c.id}>
                                                {c.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </div>

                            <div>
                                <h5>Estado de cuotas (pagos):</h5>
                                {loadingDetails && !userCuotas ? (
                                    <Spinner animation="border" />
                                ) : !userCuotas || !userCuotas.resumen ? (
                                    <p>No se encontraron datos de cuotas.</p>
                                ) : (
                                    <>
                                        <p><strong>Resumen:</strong></p>
                                        <ListGroup>
                                            <ListGroup.Item>Total pagadas: {userCuotas.resumen.total_pagadas}</ListGroup.Item>
                                            <ListGroup.Item>Total impagas: {userCuotas.resumen.total_impagas}</ListGroup.Item>
                                            <ListGroup.Item>No generadas: {userCuotas.resumen.cuotas_no_generadas}</ListGroup.Item>
                                        </ListGroup>

                                        <p className="mt-3"><strong>Detalle mensual:</strong></p>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Mes</th>
                                                    <th>Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(userCuotas.detalle_meses) && userCuotas.detalle_meses.map(({ mes, estado }) => (
                                                    <tr key={mes}>
                                                        <td>{mes}</td>
                                                        <td>{estado}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>Selecciona un usuario para ver su historial.</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default AdminHistorial
