export const SUPPORTED_GATEWAY = {
  IPG: 'ipg',
} as const;

export const APP_MSG = {
  UNSUPPORTED_GATEWAY: `We only support the following gateways currently: ${Object.values(SUPPORTED_GATEWAY).toString()}`,
  INVALID_PAYLOAD:
    'Insufficient or malformed payload: check your header and body',
  STRATEGY_NOT_FOUND: "couldn't determine strategy",
};

export const FALL_BACK_PORT = 3000;

export const apiEntryPoint = 'gateway';

export const SECRET_PATHS = {
  IPG: 'gatewaySecretkeys.ipg',
};

export const IPG_EVENTS = {
  TRANSACTION: {
    CREATED: 'TRANSACTION.CREATED',
    UPDATED: 'TRANSACTION.UPDATED',
    COMPLETED: 'TRANSACTION.COMPLETED',
  },
} as const;

export const INTERNAL_EVENTS = {
  TRANSACTION: {
    CREATED: 'transaction.created',
    UPDATED: 'transaction.updated',
    COMPLETED: 'transaction.completed',
    SUCCESSFUL: 'transaction.successful',
    FAILED: 'transaction.failed',
    CANCELLED: 'transaction.cancelled',
  },
} as const;

export const STATUSES = {
  successful: {
    slug: 'successful',
    possibleStatus: ['00'],
  },
};

export const CURRENCY_CODES = {
  '566': 'NGN',
};
