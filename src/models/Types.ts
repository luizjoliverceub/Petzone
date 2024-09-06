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
};