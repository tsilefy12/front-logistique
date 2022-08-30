export interface DetenteurItem {
    name?: string;
    surname?: string;
    photoURL?: string;
    gender?: string;
    matricule?: string;
    birthdate?: string;
    birthplace?: string;
    address?: string;
    cin?: string;
    registrationDateCIN?: string;
    locationOfDeliveryCIN?: string;
    CNAPS?: string;
    numOSIE?: string;
    hiringDate?: string;
    phone?: string;
    email?: string;
    additionalContact?: string;
    bank?: string;
    bankCodeNumber?: string;
    bankAccountNumber?: string;
    bankCodeAgency?: string;
    RIBKey?: string;
    bankLoan?: false;
    loanStartDate?: string;
    loanEndDate?: string;
    numberOfChildren?: number;
    workplaceId?: string;
    programId?: string;
    categoryId?: string;
    classId?: string;
    echelonId?: string;
    osieId?: string;
    managerId?: string;
    positionId?: string;
    userId?: string;
  }

  export interface DetenteurInitialState {
    detenteurs: DetenteurItem[];
    detenteur: DetenteurItem;
    isEditing: boolean;
    loading: boolean;
    error: any;
    [key: string]: any;
  } 