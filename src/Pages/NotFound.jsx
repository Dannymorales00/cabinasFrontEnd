import React from 'react';

const PageNotFound = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <h1 className="display-4">404 - Página no encontrada</h1>
        <p className="lead">La página que estás buscando no existe.</p>
      </div>
    </div>
  );
};

export default PageNotFound;
