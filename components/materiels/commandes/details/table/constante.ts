function createData(
    numero : string,
    societe: string,
    num_proforma:string,
    regime_tva: string,
    tva: number
  ) {
    return { numero,societe,num_proforma, regime_tva,tva};
  }

 export  const rows = [
    createData('0001', 'Brand garage', 'Ordinateur Asus','assujeti',10),
    createData('0002', 'hidden collective', 'Ondileur','assujeti', 13),
    createData('0003', 'Pentaconique', 'Ecran','assujeti',20),
  ];


  