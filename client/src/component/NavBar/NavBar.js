import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function NavBar() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand >Panda</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#features">How to Play</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>   
        </Navbar>
      </>
    )
}