import React from 'react';
import { Navbar as ReactNavbar } from 'react-bootstrap';

export default function Navbar() {
  return (
    <ReactNavbar>
      <ReactNavbar.Header>
        <ReactNavbar.Brand>
          <a href="#">Operam Interview</a>
        </ReactNavbar.Brand>
      </ReactNavbar.Header>
    </ReactNavbar>
  );
}
