function createData(
    id: string,
    designation: string,
    quanite: number,
    prix_unitaire: number
  ) {
    return { id, designation, quanite, prix_unitaire};
  }

 export  const rows = [
    createData('1', 'DWI-SSD', 2, 50000),
    createData('2', 'DWI-SSD2', 1, 50000),
    createData('3', 'DWI-SSD2', 2, 50000),
  ];