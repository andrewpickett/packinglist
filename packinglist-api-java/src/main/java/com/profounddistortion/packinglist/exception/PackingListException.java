package com.profounddistortion.packinglist.exception;

public class PackingListException extends RuntimeException {

    public PackingListException() {
    }

    public PackingListException(String message) {
        super(message);
    }

    public PackingListException(String message, Throwable cause) {
        super(message, cause);
    }

    public PackingListException(Throwable cause) {
        super(cause);
    }
}
