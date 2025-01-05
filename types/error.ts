export class APIError extends Error {
    constructor(
        public message: string,
        public statusCode: number,
        public code?: string,
    ) {
        super(message);
        this.name = 'APIError';
    }
}

export const DATABASE_ERROR_CODES = {
    P2002: 'UNIQUE_CONSTRAINT_VIOLATION',
    P2025: 'RECORD_NOT_FOUND',
    P2003: 'FOREIGN_KEY_CONSTRAINT_VIOLATION',
    P2000: 'INPUT_VALUE_TOO_LONG',
    P2005: 'INVALID_VALUE_TYPE',
    P2006: 'INVALID_VALUE',
    P2011: 'NULL_CONSTRAINT_VIOLATION',
    P2012: 'MISSING_REQUIRED_VALUE',
    P2015: 'RECORD_NOT_FOUND_RELATED',
    P2018: 'REQUIRED_VALUE_NOT_SET',
    P2021: 'TABLE_NOT_FOUND',
    P2022: 'COLUMN_NOT_FOUND',
    P2024: 'CONNECTION_TIMEOUT',
    P2028: 'TRANSACTION_API_ERROR',
} as const;

export function handleDatabaseError(error: any) {
    console.error('Database error:', error);

    if (error.code && Object.keys(DATABASE_ERROR_CODES).includes(error.code)) {
        const errorCode = error.code as keyof typeof DATABASE_ERROR_CODES;
        switch (errorCode) {
            case 'P2002':
                throw new APIError(
                    'A record with this value already exists.', 
                    409, 
                    DATABASE_ERROR_CODES[errorCode]
                );
            case 'P2025':
                throw new APIError(
                    'Record not found.', 
                    404, 
                    DATABASE_ERROR_CODES[errorCode]
                );
            case 'P2003':
                throw new APIError(
                    'Invalid reference to a related record.', 
                    400, 
                    DATABASE_ERROR_CODES[errorCode]
                );
            case 'P2000':
                throw new APIError(
                    'The provided value is too long.', 
                    400, 
                    DATABASE_ERROR_CODES[errorCode]
                );
            default:
                throw new APIError(
                    'Database operation failed.', 
                    500, 
                    DATABASE_ERROR_CODES[errorCode]
                );
        }
    }

    if (error.name === 'PrismaClientValidationError') {
        throw new APIError('Invalid data provided.', 400, 'VALIDATION_ERROR');
    }

    if (error.name === 'PrismaClientKnownRequestError') {
        throw new APIError('Server request failed.', 500, 'INTERNAL_SERVER_ERROR');
    }

    throw new APIError('Server operation failed.', 500, 'UNKNOWN_SERVER_ERROR');
}