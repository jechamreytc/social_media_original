import React from 'react'
import { Button, Modal, Table, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';

function PostModal(show, onHide) {
    return (
        <>
            <div>
                <Modal
                    show={show}
                    onHide={onHide}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Available Venue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table bordered hover striped responsive className="text-white mt-2" size="lg" variant="white">
                            <thead>
                                <tr>
                                    <th>
                                        Selected
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Occupancy
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddButtonClick}>Add</Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default PostModal