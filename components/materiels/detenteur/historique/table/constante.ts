function createData(
    id: string,
    detenteur: string,
    programme: string,
    date_debut_detention: string,
    date_fin_detention: string
  ) {
    return { id, detenteur, programme, date_debut_detention, date_fin_detention};
  }

  export  const rows = [
    createData('1', 'Diane Russel', 'Communauté', '01/01/2022', '01/01/2022'),
    createData('2', 'Arlene McCoy', 'Communauté', '01/01/2022', '01/01/2022'),
    createData('3', 'Rober Fox', 'Communauté', '01/01/2022', '01/01/2022'),
  ];