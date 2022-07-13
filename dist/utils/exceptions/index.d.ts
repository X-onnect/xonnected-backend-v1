import { IncompleteRequestException } from "./incompleteRequest.exception";
import { UsernameExistsException } from "./usernameExists.exception";
import { EmailExistsException } from "./emailExistsException";
import { RecordNotFoundException } from "./recordNotFoundException";
import { ErrorConnectingToXRPLClientException } from "./errorConnectingToClientException";
export declare const Exceptions: {
    IncompleteRequestException: typeof IncompleteRequestException;
    UsernameExistsException: typeof UsernameExistsException;
    EmailExistsException: typeof EmailExistsException;
    RecordNotFoundException: typeof RecordNotFoundException;
    ErrorConnectingToXRPLClientException: typeof ErrorConnectingToXRPLClientException;
};
