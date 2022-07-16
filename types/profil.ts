export interface IProfil {
    about: {
        firstName?: string,
        lastName?: string,
        dateOfBirth?: Date,
    },
    address: {
        address?: string,
        additional?: string,
        zipCode?: string,
        city?: string
    },
    email?: string;
    phone?: string,
    sexe?: string
}