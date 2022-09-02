import { IncompleteRequestException } from "./incompleteRequest.exception"
import { UsernameExistsException } from "./usernameExists.exception"
import { EmailExistsException } from "./emailExistsException"
import { RecordNotFoundException } from "./recordNotFoundException"
import { ErrorConnectingToXRPLClientException } from "./errorConnectingToClientException"

export const Exceptions = {
    IncompleteRequestException,
    UsernameExistsException,
    EmailExistsException,
    RecordNotFoundException,
    ErrorConnectingToXRPLClientException,
}

