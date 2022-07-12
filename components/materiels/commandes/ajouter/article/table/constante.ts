function createData(
    id: string,
    designation: string,
    quantite: number,
    prix_unitaire: number,
    autre_info: string
  ) {
    return { id, designation, quantite, prix_unitaire, autre_info};
  }

  export  const rows = [
    createData('1', 'DJI MAvic Pro', 185, 485, 'Autre information'),
    createData('2', 'DJI MAvic Pro2', 185, 485, 'Autre information'),
    createData('3', 'DJI MAvic Pro3', 185, 485, 'Autre information'),
  ];