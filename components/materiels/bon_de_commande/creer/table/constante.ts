function createData(
    id: string,
    grant: string,
    poste: number,
    designation: string,
    prix_unitaire: number,
    quanite: number,
    montantTotal : number
  ) {
    return { id, grant, poste, designation, prix_unitaire, quanite, montantTotal };
  }

 export  const rows = [
    createData('1', 'DWI-SSD', 1002, 'Article_1', 50000, 1, 50000),
    createData('2', 'DWI-SSD2', 1004, 'Article_1', 50000, 1, 50000),
    createData('3', 'DWI-SSD2', 1005, 'Article_1', 50000, 1, 50000),
  ];