export interface InternsItem {
    id?: string;
    name?: string;
    surname?: string;
    cin?: string;
    startDate?: string;
    endDate?: string;
    durationOfTheInternship?: string;
    address?: string;
    positionId?: string;
    internshipTypeId?: string;
}
  
export interface InternshipInitialState {
    interns: InternsItem[];
    intern: InternsItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
  