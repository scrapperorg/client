export enum Role {
    ITA = 'ITA', // IT Administrator
    LSE = 'LSE', // Legislation Screening Expert
    LSS = 'LSS', // Legislation Screening Supervisor
    GU = 'GU', // Generic User
}

export const ROLES_PRIORITY = {
    [Role.GU]: 0,
    [Role.LSS]: 1,
    [Role.LSE]: 2,
    [Role.ITA]: 3,
};
