function createData(
    id: string,
    designation: string,
    quantite: number,
    prix_unitaire : number
  ) {
    return { id, designation, quantite,  prix_unitaire };
  }

 export  const rows = [
    createData('1', 'DWI-SSD', 185,446.6 ),
    createData('2', 'Lego StarWar Edition', 1004, 447.6),
    createData('3', 'iPad', 1005, 446.6),
  ];