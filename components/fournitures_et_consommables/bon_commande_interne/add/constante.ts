function createData(
    id: string,
    numero : string,
    designation: string,
    date_acquisition:string,
    valeur_acquisition: number
  ) {
    return { id, numero,designation, date_acquisition, valeur_acquisition};
  }

 export  const rows = [
    createData('1', '0001', 'Ordinateur Asus', '2022-10-01',1000000),
    createData('2', '0002', 'Ondileur', '2022-10-02', 50000),
    createData('3', '0003', 'Ecran', '2022-10-03',200000),
  ];


  