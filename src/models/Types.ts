export type VeterinarianType = {
    crmv: string;
    cep: string;
    id: string;
    region: string;
    user: {
        name: string;
        id: string;
    };
};

export type VetUserType = {
    id: string;
    userId: string;
    crmv: string;
    region: string;
    cep: string;
    addressId: null;
}

export type UserAppointType = {
    id: string;
    name: string;
    email: string;
}

export type AppointmentType = {
    id: string
    clientName: string
    email: string
    phone: string
    userId: string
    veterinarianProfileId: string
    service: string
    petId: string
    appointment_date: Date
  }
  
  export type NewsType = {
    id: string
    imgUrl: string
    webSite: string
    title: string
    description: string
    content: string
  }